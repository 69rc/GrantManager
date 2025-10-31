import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { type User } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, Eye, Ban, UserX, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserTableProps {
  users: User[];
  applications: any[]; // Using any since we're not importing the full schema here
}

export function UserTable({ users, applications }: UserTableProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [userAction, setUserAction] = useState<"view" | "suspend" | "delete" | null>(null);

  // User management mutations
  const updateUserMutation = useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      return apiRequest("PATCH", `/api/users/${id}/role`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({
        title: "User updated",
        description: "User role has been updated successfully.",
      });
    },
    onError: (error: any) => {
      // Handle the error appropriately
      let errorMessage = "Could not update user role.";
      if (error.message) {
        errorMessage = error.message;
      }
      toast({
        title: "Update failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const suspendUserMutation = useMutation({
    mutationFn: async ({ id, suspended }: { id: string; suspended: boolean }) => {
      return apiRequest("PATCH", `/api/users/${id}/suspension`, { suspended });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({
        title: "User suspended",
        description: "User account has been suspended successfully.",
      });
    },
    onError: (error: any) => {
      // Handle the error appropriately 
      let errorMessage = "Could not suspend user.";
      if (error.message) {
        errorMessage = error.message;
      }
      toast({
        title: "Suspension failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
      toast({
        title: "User deleted",
        description: "User account has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      // Handle the error appropriately
      let errorMessage = "Could not delete user.";
      if (error.message) {
        errorMessage = error.message;
      }
      toast({
        title: "Deletion failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleUserAction = (user: User, action: "view" | "suspend" | "delete") => {
    setSelectedUser(user);
    setUserAction(action);
    setUserDialogOpen(true);
  };

  const confirmUserAction = () => {
    if (!selectedUser) return;

    if (userAction === "suspend") {
      suspendUserMutation.mutate({
        id: selectedUser.id,
        suspended: !selectedUser.suspended
      });
      setUserDialogOpen(false);
    } else if (userAction === "delete") {
      deleteUserMutation.mutate(selectedUser.id);
      setUserDialogOpen(false);
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableCaption>A list of all registered users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Applications</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <span>{user.fullName}</span>
                    {user.phoneNumber && (
                      <span className="text-xs text-muted-foreground">
                        ({user.phoneNumber})
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === "admin" ? "default" : "secondary"} className="capitalize">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  {applications?.filter(app => app.userId === user.id).length || 0}
                </TableCell>
                <TableCell>
                  <Badge variant={user.suspended ? "destructive" : "default"}>
                    {user.suspended ? "Suspended" : "Active"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(user.createdAt), "MMM dd, yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleUserAction(user, "view")}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUserAction(user, "suspend")}>
                        <Ban className="mr-2 h-4 w-4" />
                        {user.suspended ? "Unsuspend" : "Suspend"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-950/30"
                        onClick={() => handleUserAction(user, "delete")}
                      >
                        <UserX className="mr-2 h-4 w-4" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* User Management Dialog */}
      <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            {userAction === "view" && (
              <>
                <DialogTitle>User Details</DialogTitle>
                <DialogDescription>
                  Information about the selected user
                </DialogDescription>
              </>
            )}
            {userAction === "suspend" && (
              <>
                <DialogTitle>{selectedUser?.suspended ? "Unsuspend User" : "Suspend User"}</DialogTitle>
                <DialogDescription>
                  {selectedUser?.suspended 
                    ? "Are you sure you want to unsuspend this user's account?" 
                    : "Are you sure you want to suspend this user's account? They will not be able to access the platform."}
                </DialogDescription>
              </>
            )}
            {userAction === "delete" && (
              <>
                <DialogTitle>Delete User</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this user's account? This action cannot be undone and all their data will be permanently removed.
                </DialogDescription>
              </>
            )}
          </DialogHeader>
          
          {userAction === "view" && selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Full Name</Label>
                  <p className="font-medium">{selectedUser.fullName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Role</Label>
                  <Badge variant={selectedUser.role === "admin" ? "default" : "secondary"} className="capitalize">
                    {selectedUser.role}
                  </Badge>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <Badge variant={selectedUser.suspended ? "destructive" : "default"}>
                    {selectedUser.suspended ? "Suspended" : "Active"}
                  </Badge>
                </div>
                {selectedUser.phoneNumber && (
                  <div className="col-span-2">
                    <Label className="text-muted-foreground">Phone</Label>
                    <p className="font-medium">{selectedUser.phoneNumber}</p>
                  </div>
                )}
              </div>
              <div>
                <Label className="text-muted-foreground">Joined Date</Label>
                <p className="font-medium">{format(new Date(selectedUser.createdAt), "MMM dd, yyyy 'at' HH:mm")}</p>
              </div>
              {selectedUser.updatedAt !== selectedUser.createdAt && (
                <div>
                  <Label className="text-muted-foreground">Last Updated</Label>
                  <p className="font-medium">{format(new Date(selectedUser.updatedAt), "MMM dd, yyyy 'at' HH:mm")}</p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            {userAction === "view" ? (
              <Button onClick={() => setUserDialogOpen(false)}>Close</Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => setUserDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant={userAction === "delete" ? "destructive" : "default"}
                  onClick={confirmUserAction}
                  disabled={
                    (userAction === "suspend" && suspendUserMutation.isPending) || 
                    (userAction === "delete" && deleteUserMutation.isPending)
                  }
                >
                  {(userAction === "suspend" && suspendUserMutation.isPending) || 
                   (userAction === "delete" && deleteUserMutation.isPending) ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {userAction === "suspend" ? (selectedUser?.suspended ? "Unsuspending..." : "Suspending...") : "Deleting..."}
                    </>
                  ) : (
                    userAction === "suspend" ? (selectedUser?.suspended ? "Unsuspend" : "Suspend") : "Delete"
                  )}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}