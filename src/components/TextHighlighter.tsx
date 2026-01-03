import { cn } from "@/lib/utils";
import { VerificationStatus } from "./StatusBadge";

export interface HighlightSegment {
  id: string;
  text: string;
  status?: VerificationStatus;
  startIndex: number;
  endIndex: number;
}

interface TextHighlighterProps {
  text: string;
  segments: HighlightSegment[];
  onSegmentClick?: (segment: HighlightSegment) => void;
  selectedSegmentId?: string;
  className?: string;
}

export function TextHighlighter({
  text,
  segments,
  onSegmentClick,
  selectedSegmentId,
  className,
}: TextHighlighterProps) {
  // Sort segments by start index
  const sortedSegments = [...segments].sort((a, b) => a.startIndex - b.startIndex);

  // Build rendered parts
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  sortedSegments.forEach((segment) => {
    // Add unhighlighted text before this segment
    if (segment.startIndex > lastIndex) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {text.slice(lastIndex, segment.startIndex)}
        </span>
      );
    }

    // Add highlighted segment
    const highlightClass = segment.status
      ? {
          verified: "highlight-verified cursor-pointer hover:opacity-80",
          uncertain: "highlight-uncertain cursor-pointer hover:opacity-80",
          hallucinated: "highlight-hallucinated cursor-pointer hover:opacity-80",
          review: "highlight-uncertain cursor-pointer hover:opacity-80",
        }[segment.status]
      : "";

    parts.push(
      <span
        key={segment.id}
        className={cn(
          highlightClass,
          "transition-all rounded-sm px-0.5",
          selectedSegmentId === segment.id && "ring-2 ring-primary ring-offset-1"
        )}
        onClick={() => onSegmentClick?.(segment)}
      >
        {segment.text}
      </span>
    );

    lastIndex = segment.endIndex;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex)}</span>);
  }

  return (
    <div className={cn("text-foreground leading-relaxed", className)}>
      {parts}
    </div>
  );
}
