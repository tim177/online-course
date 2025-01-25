"use client";

import { Trophy, Medal, Star, Award } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ACHIEVEMENTS = [
  {
    icon: Trophy,
    label: "Quick Learner",
    description: "Completed 5 lessons in one day",
    unlocked: true,
  },
  {
    icon: Medal,
    label: "Note Taker",
    description: "Took notes in 10 different lessons",
    unlocked: true,
  },
  {
    icon: Star,
    label: "Quiz Master",
    description: "Scored 100% in 3 quizzes",
    unlocked: false,
  },
  {
    icon: Award,
    label: "Engaged Learner",
    description: "Posted 5 comments in discussions",
    unlocked: false,
  },
];

export function Achievements() {
  return (
    <TooltipProvider>
      <div className="flex gap-2">
        {ACHIEVEMENTS.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <Tooltip key={index}>
              <TooltipTrigger>
                <div
                  className={`p-1 rounded-full ${
                    achievement.unlocked
                      ? "text-yellow-500"
                      : "text-muted-foreground/30"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-sm">
                  <p className="font-medium">{achievement.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {achievement.description}
                  </p>
                  {!achievement.unlocked && (
                    <p className="text-xs text-yellow-500">
                      Keep going to unlock!
                    </p>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
