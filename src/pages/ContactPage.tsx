import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle,
  Mail,
  Send,
  FileWarning
} from "lucide-react";

const feedbackSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message must be less than 2000 characters")
});

const reportSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  reportType: z.enum(["false-positive", "false-negative"], { required_error: "Please select a report type" }),
  claimText: z.string().trim().min(10, "Claim must be at least 10 characters").max(1000, "Claim must be less than 1000 characters"),
  correctInfo: z.string().trim().min(10, "Correction must be at least 10 characters").max(2000, "Correction must be less than 2000 characters"),
  sourceUrl: z.string().trim().url("Please enter a valid URL").max(500, "URL must be less than 500 characters").optional().or(z.literal(""))
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;
type ReportFormData = z.infer<typeof reportSchema>;

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);

  const feedbackForm = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" }
  });

  const reportForm = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: { name: "", email: "", claimText: "", correctInfo: "", sourceUrl: "" }
  });

  const onFeedbackSubmit = async (data: FeedbackFormData) => {
    setIsSubmittingFeedback(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmittingFeedback(false);
    toast({
      title: "Feedback Sent",
      description: "Thank you for your feedback. We'll review it shortly.",
    });
    feedbackForm.reset();
  };

  const onReportSubmit = async (data: ReportFormData) => {
    setIsSubmittingReport(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmittingReport(false);
    toast({
      title: "Report Submitted",
      description: "Thank you for helping us improve. Our team will investigate.",
    });
    reportForm.reset();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Contact Us
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have feedback, questions, or found an error? We'd love to hear from you.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Mail className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-sm text-muted-foreground">support@verifact.ai</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <MessageSquare className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-1">Response Time</h3>
                <p className="text-sm text-muted-foreground">Within 24-48 hours</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <FileWarning className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-1">Report Issues</h3>
                <p className="text-sm text-muted-foreground">Help improve accuracy</p>
              </CardContent>
            </Card>
          </div>

          {/* Forms */}
          <Tabs defaultValue="feedback" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="feedback" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                General Feedback
              </TabsTrigger>
              <TabsTrigger value="report" className="gap-2">
                <AlertTriangle className="w-4 h-4" />
                Report Error
              </TabsTrigger>
            </TabsList>

            {/* General Feedback Form */}
            <TabsContent value="feedback">
              <Card>
                <CardHeader>
                  <CardTitle>Send Feedback</CardTitle>
                  <CardDescription>
                    Share your thoughts, suggestions, or questions with our team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={feedbackForm.handleSubmit(onFeedbackSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="feedback-name">Name</Label>
                        <Input
                          id="feedback-name"
                          placeholder="Your name"
                          {...feedbackForm.register("name")}
                        />
                        {feedbackForm.formState.errors.name && (
                          <p className="text-sm text-destructive">{feedbackForm.formState.errors.name.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="feedback-email">Email</Label>
                        <Input
                          id="feedback-email"
                          type="email"
                          placeholder="your@email.com"
                          {...feedbackForm.register("email")}
                        />
                        {feedbackForm.formState.errors.email && (
                          <p className="text-sm text-destructive">{feedbackForm.formState.errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="feedback-subject">Subject</Label>
                      <Input
                        id="feedback-subject"
                        placeholder="What's this about?"
                        {...feedbackForm.register("subject")}
                      />
                      {feedbackForm.formState.errors.subject && (
                        <p className="text-sm text-destructive">{feedbackForm.formState.errors.subject.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="feedback-message">Message</Label>
                      <Textarea
                        id="feedback-message"
                        placeholder="Tell us what's on your mind..."
                        rows={5}
                        {...feedbackForm.register("message")}
                      />
                      {feedbackForm.formState.errors.message && (
                        <p className="text-sm text-destructive">{feedbackForm.formState.errors.message.message}</p>
                      )}
                    </div>

                    <Button type="submit" className="w-full md:w-auto" disabled={isSubmittingFeedback}>
                      {isSubmittingFeedback ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Feedback
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Report Error Form */}
            <TabsContent value="report">
              <Card>
                <CardHeader>
                  <CardTitle>Report Verification Error</CardTitle>
                  <CardDescription>
                    Help us improve by reporting false positives or false negatives
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={reportForm.handleSubmit(onReportSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="report-name">Name</Label>
                        <Input
                          id="report-name"
                          placeholder="Your name"
                          {...reportForm.register("name")}
                        />
                        {reportForm.formState.errors.name && (
                          <p className="text-sm text-destructive">{reportForm.formState.errors.name.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="report-email">Email</Label>
                        <Input
                          id="report-email"
                          type="email"
                          placeholder="your@email.com"
                          {...reportForm.register("email")}
                        />
                        {reportForm.formState.errors.email && (
                          <p className="text-sm text-destructive">{reportForm.formState.errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="report-type">Error Type</Label>
                      <Select onValueChange={(value) => reportForm.setValue("reportType", value as "false-positive" | "false-negative")}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select error type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="false-positive">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-verified" />
                              <span>False Positive (marked true but false)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="false-negative">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-hallucinated" />
                              <span>False Negative (marked false but true)</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {reportForm.formState.errors.reportType && (
                        <p className="text-sm text-destructive">{reportForm.formState.errors.reportType.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="report-claim">Original Claim</Label>
                      <Textarea
                        id="report-claim"
                        placeholder="Paste the claim that was incorrectly verified..."
                        rows={3}
                        {...reportForm.register("claimText")}
                      />
                      {reportForm.formState.errors.claimText && (
                        <p className="text-sm text-destructive">{reportForm.formState.errors.claimText.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="report-correct">Correct Information</Label>
                      <Textarea
                        id="report-correct"
                        placeholder="What is the correct information and why?"
                        rows={4}
                        {...reportForm.register("correctInfo")}
                      />
                      {reportForm.formState.errors.correctInfo && (
                        <p className="text-sm text-destructive">{reportForm.formState.errors.correctInfo.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="report-source">Source URL (optional)</Label>
                      <Input
                        id="report-source"
                        placeholder="https://example.com/evidence"
                        {...reportForm.register("sourceUrl")}
                      />
                      {reportForm.formState.errors.sourceUrl && (
                        <p className="text-sm text-destructive">{reportForm.formState.errors.sourceUrl.message}</p>
                      )}
                    </div>

                    <Button type="submit" className="w-full md:w-auto" disabled={isSubmittingReport}>
                      {isSubmittingReport ? (
                        "Submitting..."
                      ) : (
                        <>
                          <FileWarning className="w-4 h-4 mr-2" />
                          Submit Report
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
