import { cn } from "@/lib/utils";
import { StatusBadge, VerificationStatus } from "./StatusBadge";
import { ChevronDown, ChevronUp, ExternalLink, BookOpen } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export interface ClaimData {
  id: string;
  text: string;
  status: VerificationStatus;
  confidence: number;
  explanation?: string;
  sources?: Array<{
    title: string;
    url: string;
    type: "crossref" | "scholar" | "pubmed" | "arxiv" | "web";
  }>;
  suggestedCorrection?: string;
}

interface ClaimCardProps {
  claim: ClaimData;
  onApplyCorrection?: (claimId: string, correction: string) => void;
  className?: string;
}

const sourceTypeLabels = {
  crossref: "CrossRef",
  scholar: "Google Scholar",
  pubmed: "PubMed",
  arxiv: "arXiv",
  web: "Web",
};

export function ClaimCard({ claim, onApplyCorrection, className }: ClaimCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={cn(
        "bg-card rounded-lg border p-4 transition-all hover:shadow-md",
        claim.status === "hallucinated" && "border-hallucinated/30",
        claim.status === "uncertain" && "border-uncertain/30",
        claim.status === "verified" && "border-verified/30",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge status={claim.status} size="sm" />
            <span className="text-xs text-muted-foreground">
              {claim.confidence}% confidence
            </span>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            "{claim.text}"
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="shrink-0"
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t space-y-4 animate-fade-in">
          {claim.explanation && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Why this was flagged
              </h4>
              <p className="text-sm text-foreground/80 bg-muted/50 p-3 rounded-md">
                {claim.explanation}
              </p>
            </div>
          )}

          {claim.sources && claim.sources.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                Sources
              </h4>
              <div className="space-y-2">
                {claim.sources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline group"
                  >
                    <span className="px-1.5 py-0.5 text-xs bg-primary/10 rounded">
                      {sourceTypeLabels[source.type]}
                    </span>
                    <span className="truncate">{source.title}</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {claim.suggestedCorrection && claim.status === "hallucinated" && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Suggested Correction
              </h4>
              <div className="bg-verified-light/50 border border-verified/20 p-3 rounded-md">
                <p className="text-sm text-foreground mb-3">
                  {claim.suggestedCorrection}
                </p>
                <Button
                  size="sm"
                  onClick={() => onApplyCorrection?.(claim.id, claim.suggestedCorrection!)}
                  className="bg-verified hover:bg-verified/90"
                >
                  Apply Correction
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
