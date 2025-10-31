import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertGrantApplicationSchema, type InsertGrantApplication, grantTypes } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { apiRequest } from "@/lib/queryClient";
import { AlertCircle, Loader2, Upload, FileText } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Apply() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [applicationError, setApplicationError] = useState<string | null>(null);

  const form = useForm<InsertGrantApplication>({
    resolver: zodResolver(insertGrantApplicationSchema),
    defaultValues: {
      userId: user?.id || "",
      fullName: user?.fullName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      address: "",
      projectTitle: "",
      projectDescription: "",
      grantType: "",
      requestedAmount: 0,
      fileUrl: "",
      fileName: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        const errorMessage = "Please upload a file smaller than 10MB";
        setApplicationError(errorMessage);
        toast({
          title: "File too large",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const onSubmit = async (data: InsertGrantApplication) => {
    if (!user) {
      const errorMessage = "Please login to submit an application";
      setApplicationError(errorMessage);
      toast({
        title: "Authentication required",
        description: errorMessage,
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setIsLoading(true);
    setApplicationError(null); // Clear previous errors
    try {
      // Prepare application data
      const applicationData = {
        ...data,
        userId: user.id,
      };

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("data", JSON.stringify(applicationData));
      
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      // Get auth token
      const token = localStorage.getItem("token");
      const headers: HeadersInit = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // Submit with file upload
      const response = await fetch("/api/applications", {
        method: "POST",
        headers,
        body: formData,
      });

      // Clone response to handle errors without consuming body
      const responseClone = response.clone();

      if (!response.ok) {
        let errorMessage = "Submission failed";
        try {
          const error = await responseClone.json();
          errorMessage = error.message || errorMessage;
        } catch {
          try {
            const text = await responseClone.text();
            if (text) errorMessage = text;
          } catch {
            errorMessage = response.statusText;
          }
        }
        throw new Error(errorMessage);
      }

      toast({
        title: "Application submitted!",
        description: "We'll review your application and get back to you within 5 business days.",
      });
      navigate("/dashboard");
    } catch (error: any) {
      // Handle the error appropriately
      let errorMessage = "Could not submit application. Please try again.";
      if (error.message) {
        errorMessage = error.message;
      }
      setApplicationError(errorMessage);
      toast({
        title: "Submission failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Apply for a Grant</h1>
          <p className="text-lg text-muted-foreground">
            Complete the form below to submit your grant application
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Grant Application Form</CardTitle>
            <CardDescription>
              Please provide accurate information. All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {applicationError && (
              <div className="mb-6">
                <Alert 
                  variant="destructive" 
                  size="sm"
                  closable
                  onClose={() => setApplicationError(null)}
                  showIcon
                  icon={<AlertCircle className="h-5 w-5" />}
                >
                  <AlertTitle>Application Error</AlertTitle>
                  <AlertDescription>
                    {applicationError}
                  </AlertDescription>
                </Alert>
              </div>
            )}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            data-testid="input-fullname"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            data-testid="input-email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+1 234 567 8900"
                            data-testid="input-phone"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123 Main St, City, State, ZIP"
                            data-testid="input-address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Project Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Project Information</h3>

                  <FormField
                    control={form.control}
                    name="grantType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grant Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-granttype">
                              <SelectValue placeholder="Select a grant type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {grantTypes.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="projectTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Title *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="A brief, descriptive title for your project"
                            data-testid="input-projecttitle"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="projectDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Description *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your project, its goals, and expected impact..."
                            className="min-h-32"
                            data-testid="input-projectdescription"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide details about what you plan to do with the grant funding
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requestedAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Requested Amount (USD) *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="10000"
                            data-testid="input-amount"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter the amount you're requesting in US Dollars
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* File Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Supporting Documents</h3>
                  <div className="border-2 border-dashed rounded-lg p-6">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="p-4 bg-primary/10 rounded-full">
                        {selectedFile ? (
                          <FileText className="h-8 w-8 text-primary" />
                        ) : (
                          <Upload className="h-8 w-8 text-primary" />
                        )}
                      </div>
                      {selectedFile ? (
                        <div className="text-center">
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-2">
                            Upload your proposal or budget document (PDF, max 10MB)
                          </p>
                        </div>
                      )}
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="max-w-xs"
                        data-testid="input-file"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  data-testid="button-submit"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
