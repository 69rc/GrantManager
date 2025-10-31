import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Bot, Users, ExternalLink } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";

interface TelegramMessage {
  id: string;
  sender: "user" | "bot";
  message: string;
  timestamp: Date;
}

export function TelegramChat() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<TelegramMessage[]>([
    {
      id: "1",
      sender: "bot",
      message: "Hello! I'm the GrantHub assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(true);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMsg: TelegramMessage = {
      id: Date.now().toString(),
      sender: "user",
      message: newMessage.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setNewMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I've received your message. Our team will review it shortly.",
        "Thanks for reaching out! For grant-related queries, please check our FAQ section.",
        "I understand. Let me connect you with our support team for further assistance.",
        "Thanks for your inquiry. For application status updates, please check your dashboard.",
        "I've forwarded your message to our support team. They'll get back to you soon."
      ];

      const botMsg: TelegramMessage = {
        id: Date.now().toString(),
        sender: "bot",
        message: botResponses[Math.floor(Math.random() * botResponses.length)],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Telegram Chat Trigger Button */}
      {!isOpen && (
        <Button
          size="icon"
          className="fixed bottom-4 right-20 h-12 w-12 rounded-full shadow-lg z-50 bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      )}

      {/* Telegram Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-4 right-20 w-80 md:w-96 h-[500px] flex flex-col shadow-xl z-50 border-blue-200 dark:border-blue-800">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-blue-50 dark:bg-blue-950/30">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-blue-600">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <span>Telegram</span>
                  <ExternalLink className="h-3 w-3" onClick={() => window.open('https://t.me/GrantHubBot', '_blank')} />
                </h3>
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
              className="text-blue-600 dark:text-blue-400"
            >
              <Users className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground text-sm mt-8">
                <p>No messages yet.</p>
                <p className="mt-2">Start a conversation with our Telegram bot!</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 flex items-start gap-2 ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-muted"
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {msg.sender === "bot" ? (
                        <Bot className="h-4 w-4" />
                      ) : (
                        <MessageCircle className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {format(msg.timestamp, "HH:mm")}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message to Telegram bot..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={!isConnected}
                className="bg-blue-50 dark:bg-blue-950/20"
              />
              <Button
                size="icon"
                onClick={sendMessage}
                disabled={!newMessage.trim() || !isConnected}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 text-xs text-muted-foreground text-center">
              <p>Connect with us on Telegram for faster support</p>
              <p className="mt-1">Bot: <span className="font-medium">@GrantHubBot</span></p>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}