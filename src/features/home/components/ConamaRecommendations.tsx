import { cn } from "@/utils/cn";

interface ConamaRecommendationsProps {
  iqarGeral: number;
  className?: string;
}

interface QualityLevel {
  range: string;
  effects: string;
  color: string;
}

const CONAMA_LEVELS: QualityLevel[] = [
  {
    range: "0 - 40",
    effects: "No health effects. Air quality is good.",
    color: "text-green-700 bg-green-50 border-green-200",
  },
  {
    range: "41 - 80",
    effects:
      "People in sensitive groups (children, elderly, and people with respiratory and heart diseases) may present symptoms such as dry cough and fatigue. The general population is not affected.",
    color: "text-yellow-700 bg-yellow-50 border-yellow-200",
  },
  {
    range: "81 - 120",
    effects:
      "The entire population may present symptoms such as dry cough, fatigue, burning in eyes, nose and throat. People in sensitive groups (children, elderly, and people with respiratory and heart diseases) may present more serious health effects.",
    color: "text-orange-700 bg-orange-50 border-orange-200",
  },
  {
    range: "121 - 200",
    effects:
      "The entire population may present aggravation of symptoms such as dry cough, fatigue, burning in eyes, nose and throat and still lack of air and wheezing. Even more serious effects on the health of sensitive groups (children, elderly, and people with respiratory and heart diseases).",
    color: "text-red-700 bg-red-50 border-red-200",
  },
  {
    range: "> 200",
    effects:
      "The entire population may present serious risks of manifestations of respiratory and cardiovascular diseases. Increase in premature deaths in people from sensitive groups.",
    color: "text-purple-700 bg-purple-50 border-purple-200",
  },
];

function getCurrentLevel(iqar: number): QualityLevel {
  if (iqar <= 40) return CONAMA_LEVELS[0];
  if (iqar <= 80) return CONAMA_LEVELS[1];
  if (iqar <= 120) return CONAMA_LEVELS[2];
  if (iqar <= 200) return CONAMA_LEVELS[3];
  return CONAMA_LEVELS[4];
}

/**
 * Component that displays air quality recommendations based on CONAMA standards
 */
export function ConamaRecommendations({
  iqarGeral,
  className,
}: ConamaRecommendationsProps) {
  const currentLevel = getCurrentLevel(iqarGeral);

  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-sm font-semibold text-foreground">
        CONAMA Recommendations
      </h3>

      <div
        className={cn(
          "rounded-lg border p-4 transition-colors",
          currentLevel.color
        )}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="text-xl font-bold">{currentLevel.range}</div>
            <div className="text-xs font-medium mt-1">AQI</div>
          </div>
          <div className="flex-1">
            <p className="text-sm leading-relaxed">{currentLevel.effects}</p>
          </div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground mt-2">
        Current index: <span className="font-semibold">{iqarGeral.toFixed(2)}</span>
      </div>
    </div>
  );
}
