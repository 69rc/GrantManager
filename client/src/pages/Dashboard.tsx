import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { type GrantApplication } from "@shared/schema";
import { Loader2, FileText, Clock, CheckCircle, XCircle, Plus } from "lucide-react";
import { format } from "date-fns";

const statusConfig = {
  pending: { label: "Pending", icon: Clock, variant: "secondary" as const },
  under_review: { label: "Under Review", icon: FileText, variant: "default" as const },
  approved: { label: "Approved", icon: CheckCircle, variant: "default" as const },
  rejected: { label: "Rejected", icon: XCircle, variant: "secondary" as const },
};

export default function Dashboard() {
  const { user } = useAuth();

  const { data: applications, isLoading } = useQuery<GrantApplication[]>({
    queryKey: ["/api/applications/user", user?.id],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Applications</h1>
            <p className="text-muted-foreground">
              Track and manage your grant applications
            </p>
          </div>
          <Link href="/apply">
            <Button size="lg" data-testid="button-new-application">
              <Plus className="mr-2 h-5 w-5" />
              New Application
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Applications</CardDescription>
              <CardTitle className="text-3xl" data-testid="stat-total">
                {applications?.length || 0}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-3xl text-muted-foreground" data-testid="stat-pending">
                {applications?.filter(a => a.status === "pending").length || 0}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Under Review</CardDescription>
              <CardTitle className="text-3xl text-primary" data-testid="stat-review">
                {applications?.filter(a => a.status === "under_review").length || 0}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Approved</CardDescription>
              <CardTitle className="text-3xl text-chart-2" data-testid="stat-approved">
                {applications?.filter(a => a.status === "approved").length || 0}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Applications List */}
        {applications && applications.length > 0 ? (
          <div className="space-y-4">
            {applications.map((application) => {
              const config = statusConfig[application.status as keyof typeof statusConfig];
              const StatusIcon = config.icon;

              return (
                <Card key={application.id} className="hover-elevate" data-testid={`application-${application.id}`}>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle>{application.projectTitle}</CardTitle>
                          <Badge variant={config.variant} className="gap-1">
                            <StatusIcon className="h-3 w-3" />
                            {config.label}
                          </Badge>
                        </div>
                        <CardDescription>
                          Applied on {format(new Date(application.createdAt), "MMM dd, yyyy")}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          ${application.requestedAmount.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground capitalize">
                          {application.grantType.replace(/_/g, " ")}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {application.projectDescription}
                    </p>
                    {application.adminNotes && (
                      <div className="p-4 bg-muted rounded-lg mb-4">
                        <p className="text-sm font-medium mb-1">Admin Notes:</p>
                        <p className="text-sm text-muted-foreground">{application.adminNotes}</p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>ID: {application.id.slice(0, 8)}</span>
                      </div>
                      {application.fileName && (
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>{application.fileName}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-12">
            <div className="text-center">
              <div className="mb-4 inline-flex p-4 bg-muted rounded-full">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Applications Yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't submitted any grant applications. Start your journey today!
              </p>
              <Link href="/apply">
                <Button size="lg" data-testid="button-first-application">
                  Submit Your First Application
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
