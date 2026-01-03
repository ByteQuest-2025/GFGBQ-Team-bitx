import { cn } from "@/lib/utils";
import { BookOpen, GraduationCap, FileText, Globe } from "lucide-react";

type SourceType = "crossref" | "scholar" | "pubmed" | "arxiv" | "web";

interface SourceTagProps {
  type: SourceType;
  className?: string;
}

const sourceConfig: Record<SourceType, { label: string; icon: typeof BookOpen; color: string }> = {
  crossref: {
    label: "CrossRef",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  scholar: {
    label: "Google Scholar",
    icon: GraduationCap,
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
  },
  pubmed: {
    label: "PubMed",
    icon: FileText,
    color: "bg-green-100 text-green-700 border-green-200",
  },
  arxiv: {
    label: "arXiv",
    icon: FileText,
    color: "bg-orange-100 text-orange-700 border-orange-200",
  },
  web: {
    label: "Web",
    icon: Globe,
    color: "bg-gray-100 text-gray-700 border-gray-200",
  },
};

export function SourceTag({ type, className }: SourceTagProps) {
  const config = sourceConfig[type];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded border",
        config.color,
        className
      )}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}
