import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ConfidenceScore } from "@/components/ConfidenceScore";
import { StatusBadge, VerificationStatus } from "@/components/StatusBadge";
import { ClaimCard, ClaimData } from "@/components/ClaimCard";
import { TextHighlighter, HighlightSegment } from "@/components/TextHighlighter";
import { 
  FileText, 
  Download, 
  Share2, 
  ChevronLeft,
  CheckCircle,
  AlertTriangle,
  XCircle,
  HelpCircle
} from "lucide-react";

// Mock analysis data
const mockText = `According to a 2023 study by Smith et al. published in the Journal of Climate Science, global temperatures have risen by 1.5°C since pre-industrial times. This finding is consistent with the IPCC's Sixth Assessment Report (2021), which projects further warming of 2-4°C by 2100 under current emission trajectories.

However, the controversial Johnson 2024 study claims that climate sensitivity is significantly lower than previously thought, suggesting only 1°C of additional warming. This research has not been peer-reviewed and contradicts the scientific consensus.

The World Health Organization (WHO, 2022) estimates that climate change will cause approximately 250,000 additional deaths per year between 2030 and 2050. Meanwhile, a report from the fictional "Global Climate Institute" (2023) suggests these numbers are vastly overstated.`;

const mockSegments: HighlightSegment[] = [
  {
    id: "1",
    text: "According to a 2023 study by Smith et al. published in the Journal of Climate Science",
    status: "verified",
    startIndex: 0,
    endIndex: 86,
  },
  {
    id: "2",
    text: "IPCC's Sixth Assessment Report (2021)",
    status: "verified",
    startIndex: 185,
    endIndex: 222,
  },
  {
    id: "3",
    text: "Johnson 2024 study",
    status: "hallucinated",
    startIndex: 330,
    endIndex: 348,
  },
  {
    id: "4",
    text: "World Health Organization (WHO, 2022)",
    status: "verified",
    startIndex: 520,
    endIndex: 557,
  },
  {
    id: "5",
    text: '"Global Climate Institute" (2023)',
    status: "hallucinated",
    startIndex: 718,
    endIndex: 751,
  },
];

const mockClaims: ClaimData[] = [
  {
    id: "1",
    text: "A 2023 study by Smith et al. published in the Journal of Climate Science found global temperatures have risen by 1.5°C since pre-industrial times.",
    status: "verified",
    confidence: 95,
    explanation: "This citation was verified in CrossRef and Google Scholar. The paper exists and the claim accurately represents its findings.",
    sources: [
      { title: "Smith et al. (2023) - Global Temperature Trends", url: "#", type: "crossref" },
      { title: "Journal of Climate Science - Vol 45", url: "#", type: "scholar" },
    ],
  },
  {
    id: "2",
    text: "The IPCC's Sixth Assessment Report (2021) projects further warming of 2-4°C by 2100.",
    status: "verified",
    confidence: 98,
    explanation: "The IPCC AR6 report is a well-documented source. The warming projections stated are accurate.",
    sources: [
      { title: "IPCC AR6 Climate Change 2021", url: "#", type: "web" },
    ],
  },
  {
    id: "3",
    text: "The Johnson 2024 study claims that climate sensitivity is significantly lower than previously thought.",
    status: "hallucinated",
    confidence: 12,
    explanation: "No publication by an author named 'Johnson' in 2024 regarding climate sensitivity could be found in any academic database. This appears to be a fabricated citation.",
    suggestedCorrection: "Consider removing this reference or replacing with a verified source such as 'Lewis & Curry (2018)' which discusses climate sensitivity estimates.",
    sources: [],
  },
  {
    id: "4",
    text: "The WHO estimates 250,000 additional deaths per year between 2030 and 2050 due to climate change.",
    status: "verified",
    confidence: 92,
    explanation: "This statistic is from the WHO's official climate change and health fact sheet.",
    sources: [
      { title: "WHO Climate Change and Health", url: "#", type: "web" },
    ],
  },
  {
    id: "5",
    text: 'A report from the "Global Climate Institute" (2023) suggests death estimates are overstated.',
    status: "hallucinated",
    confidence: 5,
    explanation: "The 'Global Climate Institute' does not appear to be a real organization. No publications from this entity could be found.",
    suggestedCorrection: "Remove this fabricated source. If discussing alternative viewpoints, cite legitimate organizations such as the Heartland Institute or specific peer-reviewed critiques.",
    sources: [],
  },
];

export default function ResultsPage() {
  const location = useLocation();
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null);

  // Use passed text or mock data
  const analysisText = location.state?.text || mockText;

  const statusCounts = {
    verified: mockClaims.filter(c => c.status === "verified").length,
    uncertain: mockClaims.filter(c => c.status === "uncertain" || c.status === "review").length,
    hallucinated: mockClaims.filter(c => c.status === "hallucinated").length,
  };

  const overallScore = Math.round(
    mockClaims.reduce((acc, c) => acc + c.confidence, 0) / mockClaims.length
  );

  const handleSegmentClick = (segment: HighlightSegment) => {
    setSelectedSegmentId(segment.id === selectedSegmentId ? null : segment.id);
  };

  const handleApplyCorrection = (claimId: string, correction: string) => {
    console.log("Applying correction:", claimId, correction);
    // In real implementation, would update the text
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link to="/verify" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Verify
            </Link>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <FileText className="w-6 h-6" />
              Analysis Results
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Analyzed on {new Date().toLocaleDateString()} • {analysisText.split(" ").length} words
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Trust Score & Summary */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-xl border p-6 flex flex-col items-center justify-center">
            <ConfidenceScore score={overallScore} size="lg" />
          </div>
          <div className="md:col-span-3 bg-card rounded-xl border p-6">
            <h3 className="font-semibold mb-4">Verification Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-verified-light">
                <CheckCircle className="w-8 h-8 text-verified" />
                <div>
                  <p className="text-2xl font-bold text-verified">{statusCounts.verified}</p>
                  <p className="text-sm text-muted-foreground">Verified</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-uncertain-light">
                <HelpCircle className="w-8 h-8 text-uncertain" />
                <div>
                  <p className="text-2xl font-bold text-uncertain">{statusCounts.uncertain}</p>
                  <p className="text-sm text-muted-foreground">Uncertain</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-hallucinated-light">
                <XCircle className="w-8 h-8 text-hallucinated" />
                <div>
                  <p className="text-2xl font-bold text-hallucinated">{statusCounts.hallucinated}</p>
                  <p className="text-sm text-muted-foreground">Hallucinated</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Split View */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Highlighted Text */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Original Content
            </h3>
            <div className="prose prose-sm max-w-none">
              <TextHighlighter
                text={mockText}
                segments={mockSegments}
                onSegmentClick={handleSegmentClick}
                selectedSegmentId={selectedSegmentId || undefined}
                className="text-sm leading-relaxed"
              />
            </div>
            <div className="mt-6 pt-4 border-t">
              <p className="text-xs text-muted-foreground mb-2">Legend:</p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="w-3 h-3 rounded bg-verified" />
                  <span>Verified</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="w-3 h-3 rounded bg-uncertain" />
                  <span>Uncertain</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="w-3 h-3 rounded bg-hallucinated" />
                  <span>Hallucinated</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Claims */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Verification Details
            </h3>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {mockClaims.map((claim) => (
                <ClaimCard
                  key={claim.id}
                  claim={claim}
                  onApplyCorrection={handleApplyCorrection}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
