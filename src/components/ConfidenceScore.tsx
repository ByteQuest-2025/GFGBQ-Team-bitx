import { cn } from "@/lib/utils";

interface ConfidenceScoreProps {
  score: number; // 0-100
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function ConfidenceScore({ 
  score, 
  size = "md", 
  showLabel = true,
  className 
}: ConfidenceScoreProps) {
  const normalizedScore = Math.min(100, Math.max(0, score));
  
  const getColorClass = () => {
    if (normalizedScore >= 80) return "text-verified";
    if (normalizedScore >= 60) return "text-uncertain";
    return "text-hallucinated";
  };

  const getStrokeColor = () => {
    if (normalizedScore >= 80) return "stroke-verified";
    if (normalizedScore >= 60) return "stroke-uncertain";
    return "stroke-hallucinated";
  };

  const sizeConfig = {
    sm: { size: 48, strokeWidth: 4, fontSize: "text-sm" },
    md: { size: 80, strokeWidth: 6, fontSize: "text-xl" },
    lg: { size: 120, strokeWidth: 8, fontSize: "text-3xl" },
  };

  const config = sizeConfig[size];
  const radius = (config.size - config.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative" style={{ width: config.size, height: config.size }}>
        <svg
          width={config.size}
          height={config.size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={config.size / 2}
            cy={config.size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            className="text-muted"
          />
          {/* Progress circle */}
          <circle
            cx={config.size / 2}
            cy={config.size / 2}
            r={radius}
            fill="none"
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn("transition-all duration-700 ease-out", getStrokeColor())}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("font-bold", config.fontSize, getColorClass())}>
            {normalizedScore}%
          </span>
        </div>
      </div>
      {showLabel && (
        <span className="text-sm text-muted-foreground font-medium">
          Trust Score
        </span>
      )}
    </div>
  );
}
