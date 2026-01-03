import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  ChevronLeft, 
  ChevronDown,
  Download,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ExternalLink,
  BookOpen,
  MoreVertical,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

type ClaimStatus = "verified" | "hallucinated" | "fake_citation" | "uncertain";

interface ClaimSource {
  title: string;
  url: string;
}

interface AnalysisClaim {
  id: string;
  text: string;
  status: ClaimStatus;
  pageRef?: string;
  explanation?: string;
  evidence?: string;
  source?: ClaimSource;
  noSourceFound?: boolean;
}

// Mock data matching the reference design
const mockClaims: AnalysisClaim[] = [
  {
    id: "1",
    text: '"According to Smith (2020), 40% of bees are robotic drones developed for surveillance."',
    status: "hallucinated",
    pageRef: "Page 6",
    explanation: 'We analyzed Smith (2020) and found no mention of robotic bees. The paper focuses primarily on "Apis mellifers migration patterns in urban environments." This appears to be a generated fabrication.',
    source: { title: "Smith et al., J. Ento 2020", url: "#" },
  },
  {
    id: "2",
    text: '"Climate change has accelerated the rate of glacial melt significantly over the last decade."',
    status: "verified",
    pageRef: "Page 7",
    evidence: "Supported by evidence",
    source: { title: "NASA Earth Observatory", url: "#" },
  },
  {
    id: "3",
    text: '"As argued by Dr. V. Doom in \'Latverian Economics\' (2019), scarcity is an illusion."',
    status: "fake_citation",
    pageRef: "Page 12",
    noSourceFound: true,
  },
  {
    id: "4",
    text: '"The average global temperature has risen by approximately 1.1°C since pre-industrial times."',
    status: "verified",
    pageRef: "Page 3",
    evidence: "Supported by evidence",
    source: { title: "IPCC AR6 Report", url: "#" },
  },
  {
    id: "5",
    text: '"Studies suggest that 75% of coral reefs may face extinction by 2050."',
    status: "uncertain",
    pageRef: "Page 8",
    explanation: "Multiple sources provide varying estimates. The 75% figure is within the range but on the higher end of projections.",
    source: { title: "NOAA Coral Reef Watch", url: "#" },
  },
  {
    id: "6",
    text: '"According to Johnson et al. (2023), renewable energy capacity doubled in five years."',
    status: "verified",
    pageRef: "Page 14",
    evidence: "Supported by evidence",
    source: { title: "IEA World Energy Outlook 2023", url: "#" },
  },
];

const statusConfig = {
  hallucinated: {
    label: "HALLUCINATION",
    icon: AlertTriangle,
    bgClass: "bg-hallucinated-light",
    textClass: "text-hallucinated",
    borderClass: "border-l-hallucinated",
  },
  verified: {
    label: "VERIFIED",
    icon: CheckCircle2,
    bgClass: "bg-verified-light",
    textClass: "text-verified",
    borderClass: "border-l-verified",
  },
  fake_citation: {
    label: "FAKE CITATION",
    icon: XCircle,
    bgClass: "bg-uncertain-light",
    textClass: "text-uncertain",
    borderClass: "border-l-uncertain",
  },
  uncertain: {
    label: "UNCERTAIN",
    icon: HelpCircle,
    bgClass: "bg-uncertain-light",
    textClass: "text-uncertain",
    borderClass: "border-l-uncertain",
  },
};

type FilterType = "all" | "flagged" | "uncertain" | "verified";

function ClaimAnalysisCard({ claim }: { claim: AnalysisClaim }) {
  const [isOpen, setIsOpen] = useState(false);
  const config = statusConfig[claim.status];
  const StatusIcon = config.icon;

  return (
    <div className={cn(
      "bg-card rounded-lg border border-l-4 overflow-hidden transition-all",
      config.borderClass
    )}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <StatusIcon className={cn("w-4 h-4", config.textClass)} />
            <span className={cn("text-xs font-semibold uppercase tracking-wide", config.textClass)}>
              {config.label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {claim.pageRef && (
              <span className="text-xs text-muted-foreground">{claim.pageRef}</span>
            )}
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Claim Text */}
        <p className="text-sm font-medium text-foreground leading-relaxed mb-3">
          {claim.text}
        </p>

        {/* Expandable Section */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <button className={cn(
              "flex items-center gap-2 text-sm w-full p-2 rounded-md transition-colors",
              claim.status === "hallucinated" && "bg-muted/50 hover:bg-muted",
              claim.status === "verified" && "bg-verified-light/50 hover:bg-verified-light",
              claim.status === "fake_citation" && "bg-muted/50 hover:bg-muted",
              claim.status === "uncertain" && "bg-muted/50 hover:bg-muted"
            )}>
              {claim.status === "hallucinated" && (
                <>
                  <Info className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Why this is flagged</span>
                </>
              )}
              {claim.status === "verified" && (
                <>
                  <CheckCircle2 className="w-4 h-4 text-verified" />
                  <span className="text-verified">Supported by evidence</span>
                </>
              )}
              {claim.status === "fake_citation" && (
                <>
                  <XCircle className="w-4 h-4 text-uncertain" />
                  <span className="text-uncertain">Source not found</span>
                </>
              )}
              {claim.status === "uncertain" && (
                <>
                  <HelpCircle className="w-4 h-4 text-uncertain" />
                  <span className="text-uncertain">Why this is uncertain</span>
                </>
              )}
              <ChevronDown className={cn(
                "w-4 h-4 ml-auto transition-transform text-muted-foreground",
                isOpen && "rotate-180"
              )} />
            </button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="pt-3 space-y-3">
            {claim.explanation && (
              <p className="text-sm text-muted-foreground leading-relaxed px-2">
                {claim.explanation}
              </p>
            )}
            
            {claim.noSourceFound && (
              <p className="text-sm text-muted-foreground px-2">
                No valid source link
              </p>
            )}

            {claim.source && (
              <a
                href={claim.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline px-2 group"
              >
                <BookOpen className="w-4 h-4" />
                <span>{claim.source.title}</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}

export default function ClaimAnalysisPage() {
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  // Calculate statistics
  const stats = {
    verified: mockClaims.filter(c => c.status === "verified").length,
    uncertain: mockClaims.filter(c => c.status === "uncertain").length,
    flagged: mockClaims.filter(c => c.status === "hallucinated" || c.status === "fake_citation").length,
  };
  
  const total = mockClaims.length;
  const trustScore = Math.round((stats.verified / total) * 100);

  // Filter claims
  const filteredClaims = mockClaims.filter(claim => {
    if (activeFilter === "all") return true;
    if (activeFilter === "flagged") return claim.status === "hallucinated" || claim.status === "fake_citation";
    if (activeFilter === "uncertain") return claim.status === "uncertain";
    if (activeFilter === "verified") return claim.status === "verified";
    return true;
  });

  const flaggedCount = stats.flagged;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container py-6 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            to="/verify" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-lg font-semibold">Analysis Results</h1>
          <Button variant="ghost" size="sm" className="text-primary">
            Export
          </Button>
        </div>

        {/* Trust Score Card */}
        <div className="bg-card rounded-xl border p-6 mb-6">
          <div className="flex items-center gap-6">
            {/* Circular Score */}
            <div className="relative flex-shrink-0">
              <svg className="w-20 h-20 -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="6"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="hsl(var(--verified))"
                  strokeWidth="6"
                  strokeDasharray={`${trustScore * 2.14} 214`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{trustScore}</span>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-1">TRUST SCORE</p>
            </div>

            {/* Stats Bars */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-24">Verified Claims</span>
                <Progress 
                  value={(stats.verified / total) * 100} 
                  className="h-2 flex-1 bg-muted [&>div]:bg-verified" 
                />
                <span className="text-sm font-medium w-8">{stats.verified}</span>
                <span className="text-xs text-verified font-medium w-10">
                  {Math.round((stats.verified / total) * 100)}%
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-24">Uncertain</span>
                <Progress 
                  value={(stats.uncertain / total) * 100} 
                  className="h-2 flex-1 bg-muted [&>div]:bg-uncertain" 
                />
                <span className="text-sm font-medium w-8">{stats.uncertain}</span>
                <span className="text-xs text-uncertain font-medium w-10">
                  {Math.round((stats.uncertain / total) * 100)}%
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-24">Flagged Issues</span>
                <Progress 
                  value={(stats.flagged / total) * 100} 
                  className="h-2 flex-1 bg-muted [&>div]:bg-hallucinated" 
                />
                <span className="text-sm font-medium w-8">{stats.flagged}</span>
                <span className="text-xs text-hallucinated font-medium w-10">
                  {Math.round((stats.flagged / total) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("all")}
            className="rounded-full"
          >
            All Claims
          </Button>
          <Button
            variant={activeFilter === "flagged" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("flagged")}
            className={cn(
              "rounded-full gap-1.5",
              activeFilter === "flagged" && "bg-hallucinated hover:bg-hallucinated/90"
            )}
          >
            Flagged
            {flaggedCount > 0 && (
              <Badge variant="secondary" className="h-5 px-1.5 text-xs bg-background/20">
                {flaggedCount}
              </Badge>
            )}
          </Button>
          <Button
            variant={activeFilter === "uncertain" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("uncertain")}
            className={cn(
              "rounded-full",
              activeFilter === "uncertain" && "bg-uncertain hover:bg-uncertain/90"
            )}
          >
            Uncertain
          </Button>
          <Button
            variant={activeFilter === "verified" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("verified")}
            className={cn(
              "rounded-full",
              activeFilter === "verified" && "bg-verified hover:bg-verified/90"
            )}
          >
            Verified
          </Button>
        </div>

        {/* Claims List */}
        <div className="space-y-4">
          {filteredClaims.map((claim) => (
            <ClaimAnalysisCard key={claim.id} claim={claim} />
          ))}
        </div>

        {filteredClaims.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No claims match the selected filter.</p>
          </div>
        )}

        {/* Floating Download Button */}
        <div className="fixed bottom-6 right-6">
          <Button size="lg" className="rounded-full shadow-lg h-14 w-14">
            <Download className="w-5 h-5" />
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
