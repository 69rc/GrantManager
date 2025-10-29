import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { type GrantApplication, type User } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Users, FileText, TrendingUp, DollarSign, Filter, Eye } from "lucide-react";
import { format } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

export default function Admin() {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [grantTypeFilter, setGrantTypeFilter] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] = useState<GrantApplication | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("");
  const [adminNotes, setAdminNotes] = useState("");

  const { data: applications, isLoading: appsLoading } = useQuery<GrantApplication[]>({
    queryKey: ["/api/applications"],
  });

  const { data: users } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, status, notes }: { id: string; status: string; notes: string }) => {
      return apiRequest("PATCH", `/api/applications/${id}/status`, { status, adminNotes: notes });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
      toast({
        title: "Status updated",
        description: "Application status has been updated successfully.",
      });
      setDialogOpen(false);
      setSelectedApplication(null);
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "Could not update status.",
        variant: "destructive",
      });
    },
  });

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
        </Card>
      </div>
    );
  }

  if (appsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const filteredApplications = applications?.filter((app) => {
    if (statusFilter !== "all" && app.status !== statusFilter) return false;
    if (grantTypeFilter !== "all" && app.grantType !== grantTypeFilter) return false;
    return true;
  });

  const stats = {
    total: applications?.length || 0,
    pending: applications?.filter(a => a.status === "pending").length || 0,
    underReview: applications?.filter(a => a.status === "under_review").length || 0,
    approved: applications?.filter(a => a.status === "approved").length || 0,
    rejected: applications?.filter(a => a.status === "rejected").length || 0,
    totalUsers: users?.length || 0,
    totalFunding: applications?.filter(a => a.status === "approved").reduce((sum, a) => sum + a.requestedAmount, 0) || 0,
  };

  const statusData = [
    { name: "Pending", value: stats.pending },
    { name: "Under Review", value: stats.underReview },
    { name: "Approved", value: stats.approved },
    { name: "Rejected", value: stats.rejected },
  ];

  const grantTypeData = applications?.reduce((acc: any[], app) => {
    const existing = acc.find(item => item.name === app.grantType);
    if (existing) {
      existing.count += 1;
      if (app.status === "approved") existing.approved += 1;
    } else {
      acc.push({ 
        name: app.grantType.replace(/_/g, " "), 
        count: 1, 
        approved: app.status === "approved" ? 1 : 0 
      });
    }
    return acc;
  }, []) || [];

  const approvalRate = stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0;

  const handleOpenDialog = (application: GrantApplication) => {
    setSelectedApplication(application);
    setNewStatus(application.status);
    setAdminNotes(application.adminNotes || "");
    setDialogOpen(true);
  };

  const handleUpdateStatus = () => {
    if (selectedApplication) {
      updateMutation.mutate({
        id: selectedApplication.id,
        status: newStatus,
        notes: adminNotes,
      });
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage grant applications and monitor platform performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Total Applications</CardDescription>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-3xl" data-testid="admin-stat-total">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Total Users</CardDescription>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-3xl" data-testid="admin-stat-users">{stats.totalUsers}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Approval Rate</CardDescription>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-3xl" data-testid="admin-stat-rate">{approvalRate}%</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Total Funded</CardDescription>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-3xl" data-testid="admin-stat-funded">
                ${(stats.totalFunding / 1000).toFixed(0)}K
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Application Status Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Applications by Grant Type</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={grantTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="hsl(var(--primary))" name="Total" />
                <Bar dataKey="approved" fill="hsl(var(--chart-2))" name="Approved" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="md:w-48" data-testid="filter-status">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={grantTypeFilter} onValueChange={setGrantTypeFilter}>
              <SelectTrigger className="md:w-48" data-testid="filter-type">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="community">Community</SelectItem>
                <SelectItem value="research">Research</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Applications Table */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Applications ({filteredApplications?.length || 0})</h2>
          {filteredApplications && filteredApplications.length > 0 ? (
            filteredApplications.map((app) => (
              <Card key={app.id} className="hover-elevate" data-testid={`admin-app-${app.id}`}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{app.projectTitle}</CardTitle>
                        <Badge
                          variant={app.status === "approved" ? "default" : "secondary"}
                          className="capitalize"
                        >
                          {app.status.replace(/_/g, " ")}
                        </Badge>
                      </div>
                      <CardDescription>
                        By {app.fullName} • {app.email} • Applied {format(new Date(app.createdAt), "MMM dd, yyyy")}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        ${app.requestedAmount.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {app.grantType.replace(/_/g, " ")}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{app.projectDescription}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      ID: {app.id.slice(0, 8)} • Phone: {app.phoneNumber}
                    </div>
                    <Button onClick={() => handleOpenDialog(app)} data-testid={`button-review-${app.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No applications match your filters</p>
            </Card>
          )}
        </div>
      </div>

      {/* Review Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Application</DialogTitle>
            <DialogDescription>
              Update the status and add notes for this application
            </DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{selectedApplication.projectTitle}</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Requested Amount: <span className="font-medium text-foreground">
                    ${selectedApplication.requestedAmount.toLocaleString()}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedApplication.projectDescription}
                </p>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger id="status" data-testid="dialog-select-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Admin Notes</Label>
                <Textarea
                  id="notes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes about this application..."
                  className="min-h-24"
                  data-testid="dialog-textarea-notes"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateStatus}
              disabled={updateMutation.isPending}
              data-testid="dialog-button-update"
            >
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Status"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
