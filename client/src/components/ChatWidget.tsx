import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { MessageCircle, X, Send, Loader2, Users } from "lucide-react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

interface Message {
  id: string;
  userId: string;
  senderRole: "user" | "admin";
  message: string;
  createdAt: Date;
}

interface UserItem {
  id: string;
  email: string;
  fullName: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const { user } = useAuth();

  // For admins, fetch list of all users
  const { data: users = [] } = useQuery<UserItem[]>({
    queryKey: ["/api/users"],
    enabled: user?.role === "admin",
  });

  useEffect(() => {
    if (!user) return;

    // Connect to WebSocket
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setIsConnected(true);
      // Send auth message with JWT token
      const token = localStorage.getItem("token");
      ws.send(JSON.stringify({ type: "auth", token, userId: user.id }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "message") {
        const message: Message = {
          ...data,
          createdAt: new Date(data.createdAt),
        };
        setMessages((prev) => [...prev, message]);
        
        // Increment unread if widget is closed and message is from other party
        if (!isOpen && 
            ((user.role === "user" && data.senderRole === "admin") || 
             (user.role === "admin" && data.senderRole === "user" && data.userId === selectedUserId))) {
          setUnreadCount((prev) => prev + 1);
        }
      } else if (data.type === "history") {
        // When receiving history, update messages with all messages for the selected user (for admin)
        // or all messages for the current user (for regular user)
        setMessages(data.messages.map((m: any) => ({
          ...m,
          createdAt: new Date(m.createdAt),
        })));
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, [user, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !wsRef.current || !user) return;

    // For admins, require a selected user
    if (user.role === "admin" && !selectedUserId) {
      alert("Please select a user to chat with first");
      return;
    }

    const message = {
      type: "send",
      userId: user.id,
      senderRole: user.role,
      message: newMessage.trim(),
      targetUserId: user.role === "admin" ? selectedUserId : undefined,
    };

    wsRef.current.send(JSON.stringify(message));
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!user) return null;

  return (
    <>
      {/* Chat Trigger Button */}
      {!isOpen && (
        <Button
          size="icon"
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg z-50"
          onClick={() => setIsOpen(true)}
          data-testid="button-chat-open"
        >
          <MessageCircle className="h-6 w-6" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-80 md:w-96 h-[500px] flex flex-col shadow-xl z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold">Support Chat</h3>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${isConnected ? "bg-green-500" : "bg-gray-400"}`} />
                  <span className="text-xs text-muted-foreground">
                    {isConnected ? "Online" : "Connecting..."}
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              data-testid="button-chat-close"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Admin: User Selection */}
          {user?.role === "admin" && (
            <div className="p-3 border-b bg-muted/30">
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Chatting with:
              </label>
              <select
                className="w-full text-sm rounded-md border border-input bg-background px-3 py-1.5"
                value={selectedUserId || ""}
                onChange={(e) => {
                  const userId = e.target.value || null;
                  setSelectedUserId(userId);
                  
                  // If we're an admin and switching users, we should request the chat history for that user
                  if (user?.role === "admin" && userId && wsRef.current && isConnected) {
                    wsRef.current.send(JSON.stringify({ 
                      type: "getHistory", 
                      userId: user.id,
                      targetUserId: userId
                    }));
                  }
                }}
                data-testid="select-chat-user"
              >
                <option value="">Select a user...</option>
                {users.filter(u => u.id !== user.id).map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.fullName} ({u.email})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {user?.role === "admin" && !selectedUserId ? (
              <div className="text-center text-muted-foreground text-sm mt-8">
                <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Select a user to view their chat messages</p>
              </div>
            ) : messages.filter(m => 
                user?.role === "admin" && selectedUserId 
                  ? m.userId === selectedUserId || m.targetUserId === selectedUserId 
                  : user?.role === "user" ? m.senderRole === "admin" || m.userId === user.id : true
              ).length === 0 ? (
              <div className="text-center text-muted-foreground text-sm mt-8">
                <p>No messages yet.</p>
                <p className="mt-2">Start a conversation{user?.role === "user" ? " with our support team" : ""}!</p>
              </div>
            ) : (
              messages.filter(m => 
                user?.role === "admin" && selectedUserId 
                  ? m.userId === selectedUserId || m.targetUserId === selectedUserId 
                  : user?.role === "user" ? m.senderRole === "admin" || m.userId === user.id : true
              ).map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderRole === user.role ? "justify-end" : "justify-start"}`}
                  data-testid={`message-${msg.id}`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg p-3 ${
                      msg.senderRole === user.role
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {format(msg.createdAt, "HH:mm")}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={!isConnected}
                data-testid="input-chat-message"
              />
              <Button
                size="icon"
                onClick={sendMessage}
                disabled={!newMessage.trim() || !isConnected || (user?.role === "admin" && !selectedUserId)}
                data-testid="button-chat-send"
              >
                {!isConnected ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
