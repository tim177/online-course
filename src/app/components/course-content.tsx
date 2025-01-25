"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const COURSE_MODULES = [
  {
    id: "dQw4w9WgXcQ",
    title: "Stage 1",
    subtitle: "Basics of Working in Next.js",
    lessons: [
      { id: "1-1", title: "Introduction to Next.js", duration: "10:20" },
      {
        id: "1-2",
        title: "Setting Up Your Development Environment",
        duration: "15:45",
      },
      {
        id: "1-3",
        title: "Understanding Server Components",
        duration: "20:30",
      },
    ],
  },
  {
    id: "stage-2",
    title: "Stage 2",
    subtitle: "Model Detailing",
    lessons: [
      { id: "2-1", title: "Component Architecture", duration: "12:15" },
      { id: "2-2", title: "Working with Dynamic Routes", duration: "18:30" },
      { id: "2-3", title: "Data Fetching Strategies", duration: "25:00" },
    ],
  },
  {
    id: "stage-3",
    title: "Stage 3",
    subtitle: "Learning Advanced Techniques",
    lessons: [
      { id: "3-1", title: "Advanced Hooks", duration: "15:56" },
      { id: "3-2", title: "State Management", duration: "28:34" },
      { id: "3-3", title: "Performance Optimization", duration: "41:23" },
      { id: "3-4", title: "Server Actions", duration: "39:41" },
      { id: "3-5", title: "Creating Complex UIs", duration: "11:04" },
    ],
  },
  {
    id: "stage-4",
    title: "Stage 4",
    subtitle: "Creating Animations",
    lessons: [
      { id: "4-1", title: "Basic Animations", duration: "15:20" },
      { id: "4-2", title: "Complex Transitions", duration: "20:45" },
      { id: "4-3", title: "Framer Motion Integration", duration: "22:10" },
    ],
  },
  {
    id: "stage-5",
    title: "Stage 5",
    subtitle: "Final Project",
    lessons: [
      { id: "5-1", title: "Project Setup", duration: "25:15" },
      { id: "5-2", title: "Implementation", duration: "45:30" },
      { id: "5-3", title: "Deployment", duration: "15:20" },
    ],
  },
];

interface CourseContentProps {
  currentVideoId: string;
  completedVideos: string[];
  onVideoSelect: (videoId: string) => void;
}

export function CourseContent({
  currentVideoId,
  completedVideos,
  onVideoSelect,
}: CourseContentProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>([
    COURSE_MODULES[0].id,
  ]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getModuleProgress = (moduleId: string) => {
    const module = COURSE_MODULES.find((m) => m.id === moduleId);
    if (!module) return 0;
    const completedLessons = module.lessons.filter((lesson) =>
      completedVideos.includes(lesson.id)
    );
    return Math.round((completedLessons.length / module.lessons.length) * 100);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Course Content</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {COURSE_MODULES.map((module) => {
            const progress = getModuleProgress(module.id);
            const isExpanded = expandedModules.includes(module.id);

            return (
              <div
                key={module.id}
                className="rounded-2xl overflow-hidden bg-background"
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-between p-4 h-auto hover:bg-muted/50",
                    isExpanded && "bg-muted/50"
                  )}
                  onClick={() => toggleModule(module.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <svg className="w-8 h-8">
                        <circle
                          cx="16"
                          cy="16"
                          r="14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-muted-foreground/20"
                        />
                        {progress > 0 && (
                          <circle
                            cx="16"
                            cy="16"
                            r="14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-orange-500"
                            strokeDasharray={`${progress * 0.88} 100`}
                            transform="rotate(-90 16 16)"
                          />
                        )}
                      </svg>
                      {progress === 100 && (
                        <Check className="h-4 w-4 absolute inset-0 m-auto text-orange-500" />
                      )}
                      {progress > 0 && progress < 100 && (
                        <span className="absolute inset-0 text-[10px] font-medium flex items-center justify-center">
                          {progress}%
                        </span>
                      )}
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-sm">{module.title}</h3>
                      <p className="text-base font-semibold">
                        {module.subtitle}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  </motion.div>
                </Button>
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 space-y-1">
                        {module.lessons.map((lesson) => {
                          const isCompleted = completedVideos.includes(
                            lesson.id
                          );
                          const isCurrent = currentVideoId === lesson.id;

                          return (
                            <Button
                              key={lesson.id}
                              variant="ghost"
                              className={cn(
                                "w-full justify-between h-auto py-2 px-4 hover:bg-muted/50",
                                isCurrent && "bg-muted/50"
                              )}
                              onClick={() => onVideoSelect(lesson.id)}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={cn(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                                    isCompleted
                                      ? "border-orange-500 bg-orange-500"
                                      : "border-muted-foreground/30",
                                    isCurrent &&
                                      !isCompleted &&
                                      "border-orange-500"
                                  )}
                                >
                                  {isCompleted && (
                                    <Check className="h-3 w-3 text-white" />
                                  )}
                                </div>
                                <span
                                  className={cn(
                                    "text-sm",
                                    isCompleted && "text-muted-foreground"
                                  )}
                                >
                                  {lesson.title}
                                </span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {lesson.duration}
                              </span>
                            </Button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
