import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ACHIEVEMENTS, getAchievementById } from "./AchievementIcons";

interface AchievementBadgesProps {
  achievementIds: string[];
  maxVisible?: number;
  size?: "sm" | "md";
}

export const AchievementBadges = ({
  achievementIds,
  maxVisible = 3,
  size = "sm",
}: AchievementBadgesProps) => {
  const [showAll, setShowAll] = useState(false);

  if (!achievementIds || achievementIds.length === 0) {
    return null;
  }

  const visibleAchievements = showAll
    ? achievementIds
    : achievementIds.slice(0, maxVisible);
  const hiddenCount = achievementIds.length - maxVisible;
  const hasHidden = hiddenCount > 0 && !showAll;

  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
  };

  const iconSizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        {visibleAchievements.map((id) => {
          const achievement = getAchievementById(id);
          if (!achievement) return null;

          const IconComponent = achievement.icon;

          return (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <div
                  className={`${sizeClasses[size]} p-1 rounded-md bg-secondary/80 hover:bg-secondary transition-colors cursor-pointer`}
                >
                  <IconComponent
                    className={iconSizeClasses[size]}
                    isUnlocked={true}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                <p className="font-medium">{achievement.name}</p>
                <p className="text-muted-foreground">{achievement.description}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}

        {hasHidden && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`${sizeClasses[size]} flex items-center justify-center rounded-md bg-secondary/80 hover:bg-secondary transition-colors cursor-pointer text-[10px] font-semibold text-muted-foreground`}
              >
                +{hiddenCount}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs max-w-[200px]">
              <p className="font-medium mb-1">More achievements</p>
              <div className="space-y-0.5">
                {achievementIds.slice(maxVisible).map((id) => {
                  const achievement = getAchievementById(id);
                  return achievement ? (
                    <p key={id} className="text-muted-foreground">
                      • {achievement.name}
                    </p>
                  ) : null;
                })}
              </div>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};

// Compact version for cards - just icons in a row
export const AchievementBadgesCompact = ({
  achievementIds,
  maxVisible = 3,
}: AchievementBadgesProps) => {
  if (!achievementIds || achievementIds.length === 0) {
    return null;
  }

  const visibleAchievements = achievementIds.slice(0, maxVisible);
  const hiddenCount = achievementIds.length - maxVisible;

  return (
    <TooltipProvider>
      <div className="flex items-center -space-x-0.5">
        {visibleAchievements.map((id) => {
          const achievement = getAchievementById(id);
          if (!achievement) return null;

          const IconComponent = achievement.icon;

          return (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <div className="h-5 w-5 p-0.5 rounded-sm bg-secondary/80 hover:bg-secondary transition-colors cursor-pointer ring-1 ring-background">
                  <IconComponent className="h-4 w-4" isUnlocked={true} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                <p className="font-medium">{achievement.name}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}

        {hiddenCount > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="h-5 w-5 flex items-center justify-center rounded-sm bg-secondary/80 hover:bg-secondary transition-colors cursor-pointer ring-1 ring-background text-[9px] font-bold text-muted-foreground">
                +{hiddenCount}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs max-w-[200px]">
              <p className="font-medium mb-1">More achievements</p>
              <div className="space-y-0.5">
                {achievementIds.slice(maxVisible).map((id) => {
                  const achievement = getAchievementById(id);
                  return achievement ? (
                    <p key={id} className="text-muted-foreground">
                      • {achievement.name}
                    </p>
                  ) : null;
                })}
              </div>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};