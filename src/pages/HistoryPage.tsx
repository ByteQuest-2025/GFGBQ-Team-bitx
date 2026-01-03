import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge, VerificationStatus } from "@/components/StatusBadge";
import { ConfidenceScore } from "@/components/ConfidenceScore";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Download,
  GitCompare,
  FileText,
  TrendingUp,
  Calendar,
  Filter,
  X,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock report data
interface Report {
  id: string;
  title: string;
  date: Date;
  wordCount: number;
  trustScore: number;
  status: "verified" | "issues_found" | "needs_review";
  verifiedCount: number;
  uncertainCount: number;
  hallucinatedCount: number;
}

const mockReports: Report[] = [
  {
    id: "1",
    title: "Research Paper: Climate Change Analysis",
    date: new Date(2026, 0, 3, 14, 30),
    wordCount: 2450,
    trustScore: 85,
    status: "verified",
    verifiedCount: 12,
    uncertainCount: 2,
    hallucinatedCount: 1,
  },
  {
    id: "2",
    title: "Literature Review: Machine Learning Ethics",
    date: new Date(2026, 0, 2, 10, 15),
    wordCount: 3200,
    trustScore: 62,
    status: "issues_found",
    verifiedCount: 8,
    uncertainCount: 4,
    hallucinatedCount: 3,
  },
  {
    id: "3",
    title: "Blog Post: AI in Healthcare",
    date: new Date(2026, 0, 1, 16, 45),
    wordCount: 1100,
    trustScore: 91,
    status: "verified",
    verifiedCount: 6,
    uncertainCount: 1,
    hallucinatedCount: 0,
  },
  {
    id: "4",
    title: "Academic Essay: Quantum Computing",
    date: new Date(2025, 11, 28, 9, 0),
    wordCount: 1800,
    trustScore: 45,
    status: "issues_found",
    verifiedCount: 4,
    uncertainCount: 3,
    hallucinatedCount: 5,
  },
  {
    id: "5",
    title: "Grant Proposal: Renewable Energy",
    date: new Date(2025, 11, 25, 11, 30),
    wordCount: 4500,
    trustScore: 78,
    status: "needs_review",
    verifiedCount: 15,
    uncertainCount: 6,
    hallucinatedCount: 2,
  },
];

const statusLabels = {
  verified: "Verified Content",
  issues_found: "Issues Found",
  needs_review: "Needs Review",
};

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [confidenceFilter, setConfidenceFilter] = useState("all");
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Filter reports
  const filteredReports = mockReports.filter((report) => {
    // Search filter
    if (searchQuery && !report.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const reportDate = report.date;
      if (dateFilter === "today" && reportDate.toDateString() !== now.toDateString()) {
        return false;
      }
      if (dateFilter === "week") {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        if (reportDate < weekAgo) return false;
      }
      if (dateFilter === "month") {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        if (reportDate < monthAgo) return false;
      }
    }
    // Status filter
    if (statusFilter !== "all" && report.status !== statusFilter) {
      return false;
    }
    // Confidence filter
    if (confidenceFilter !== "all") {
      if (confidenceFilter === "high" && report.trustScore < 80) return false;
      if (confidenceFilter === "medium" && (report.trustScore < 50 || report.trustScore >= 80)) return false;
      if (confidenceFilter === "low" && report.trustScore >= 50) return false;
    }
    return true;
  });

  // Stats
  const totalAnalyzed = mockReports.length;
  const avgAccuracy = Math.round(mockReports.reduce((acc, r) => acc + r.trustScore, 0) / mockReports.length);
  const issuesFound = mockReports.reduce((acc, r) => acc + r.hallucinatedCount, 0);

  const toggleReportSelection = (id: string) => {
    setSelectedReports((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const selectedReportData = mockReports.filter((r) => selectedReports.includes(r.id));

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setDateFilter("all");
    setStatusFilter("all");
    setConfidenceFilter("all");
  };

  const hasActiveFilters = searchQuery || dateFilter !== "all" || statusFilter !== "all" || confidenceFilter !== "all";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">History & Reports</h1>
          <p className="text-muted-foreground">
            View, compare, and download your verification reports.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl border p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalAnalyzed}</p>
              <p className="text-sm text-muted-foreground">Total Analyzed</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-verified/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-verified" />
            </div>
            <div>
              <p className="text-2xl font-bold">{avgAccuracy}%</p>
              <p className="text-sm text-muted-foreground">Avg. Accuracy</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-hallucinated/10 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-hallucinated" />
            </div>
            <div>
              <p className="text-2xl font-bold">{issuesFound}</p>
              <p className="text-sm text-muted-foreground">Issues Found</p>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-card rounded-xl border p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[140px]">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="issues_found">Issues Found</SelectItem>
                  <SelectItem value="needs_review">Needs Review</SelectItem>
                </SelectContent>
              </Select>

              <Select value={confidenceFilter} onValueChange={setConfidenceFilter}>
                <SelectTrigger className="w-[160px]">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Confidence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Scores</SelectItem>
                  <SelectItem value="high">High (80%+)</SelectItem>
                  <SelectItem value="medium">Medium (50-79%)</SelectItem>
                  <SelectItem value="low">Low (&lt;50%)</SelectItem>
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                  <X className="w-4 h-4" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Compare Action */}
          {selectedReports.length >= 2 && (
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {selectedReports.length} reports selected
              </p>
              <Button onClick={() => setShowComparison(true)} className="gap-2">
                <GitCompare className="w-4 h-4" />
                Compare Selected
              </Button>
            </div>
          )}
        </div>

        {/* Reports List */}
        <div className="space-y-3">
          {filteredReports.length === 0 ? (
            <div className="bg-card rounded-xl border p-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No reports found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Try adjusting your search or filters.
              </p>
              <Link to="/verify">
                <Button>Verify New Content</Button>
              </Link>
            </div>
          ) : (
            filteredReports.map((report) => (
              <div
                key={report.id}
                className={cn(
                  "bg-card rounded-xl border p-4 transition-all hover:shadow-md",
                  selectedReports.includes(report.id) && "ring-2 ring-primary"
                )}
              >
                <div className="flex items-center gap-4">
                  {/* Checkbox */}
                  <Checkbox
                    checked={selectedReports.includes(report.id)}
                    onCheckedChange={() => toggleReportSelection(report.id)}
                  />

                  {/* Report Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold truncate">{report.title}</h3>
                      <StatusBadge
                        status={
                          report.status === "verified"
                            ? "verified"
                            : report.status === "issues_found"
                            ? "hallucinated"
                            : "review"
                        }
                        size="sm"
                        showIcon={false}
                      />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{formatDate(report.date)}</span>
                      <span>{report.wordCount.toLocaleString()} words</span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-verified" />
                        {report.verifiedCount}
                        <span className="w-2 h-2 rounded-full bg-uncertain ml-2" />
                        {report.uncertainCount}
                        <span className="w-2 h-2 rounded-full bg-hallucinated ml-2" />
                        {report.hallucinatedCount}
                      </span>
                    </div>
                  </div>

                  {/* Trust Score */}
                  <div className="hidden sm:block">
                    <ConfidenceScore score={report.trustScore} size="sm" showLabel={false} />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="w-4 h-4" />
                      <span className="hidden md:inline">PDF</span>
                    </Button>
                    <Link to="/results">
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />

      {/* Comparison Dialog */}
      <Dialog open={showComparison} onOpenChange={setShowComparison}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GitCompare className="w-5 h-5" />
              Compare Reports
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {selectedReportData.slice(0, 2).map((report) => (
              <div key={report.id} className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-4 truncate">{report.title}</h4>
                
                <div className="flex justify-center mb-4">
                  <ConfidenceScore score={report.trustScore} size="md" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span>{formatDate(report.date)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Word Count</span>
                    <span>{report.wordCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Verified Claims</span>
                    <span className="text-verified font-medium">{report.verifiedCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Uncertain</span>
                    <span className="text-uncertain font-medium">{report.uncertainCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Hallucinated</span>
                    <span className="text-hallucinated font-medium">{report.hallucinatedCount}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Download className="w-4 h-4" />
                    Download Report
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {selectedReportData.length > 2 && (
            <p className="text-sm text-muted-foreground text-center mt-4">
              Showing first 2 of {selectedReportData.length} selected reports
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
