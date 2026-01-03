import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, XCircle, HelpCircle } from "lucide-react";

export type VerificationStatus = "verified" | "uncertain" | "hallucinated" | "review";

interface StatusBadgeProps {
  status: VerificationStatus;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

const statusConfig = {
  verified: {
    label: "Verified",
    icon: CheckCircle,
    className: "bg-verified-light text-verified border-verified/20",
  },
  uncertain: {
    label: "Uncertain",
    icon: HelpCircle,
    className: "bg-uncertain-light text-uncertain border-uncertain/20",
  },
  hallucinated: {
    label: "Hallucinated",
    icon: XCircle,
    className: "bg-hallucinated-light text-hallucinated border-hallucinated/20",
  },
  review: {
    label: "Needs Review",
    icon: AlertCircle,
    className: "bg-uncertain-light text-uncertain border-uncertain/20",
  },
};

const sizeConfig = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
};

export function StatusBadge({ 
  status, 
  size = "md", 
  showIcon = true, 
  className 
}: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full border",
        config.className,
        sizeConfig[size],
        className
      )}
    >
      {showIcon && <Icon className={cn(
        size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-5 h-5"
      )} />}
      {config.label}
    </span>
  );
}
