"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, Share2, RotateCcw } from "lucide-react";
import { VideoSummary } from "./components/video-summary";
import { NotesSection } from "./components/notes-section";
import { QuizSection } from "./components/quiz-section";
import { Achievements } from "./components/achievements";
import { VideoPlayer } from "./components/video-player";
import { CareerSection } from "./components/career-section";
import { CommunitySection } from "./components/community-section";
import { Certificate } from "./components/certificate";
import { CourseRating } from "./components/course-rating";
import { COURSE_MODULES, CourseContent } from "./components/course-content";

const COURSE_TITLE = "Advanced React Development with Next.js";

export default function CoursePage() {
  const [currentVideoId, setCurrentVideoId] = useState(
    COURSE_MODULES[0].lessons[0].id
  );
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentCaptions, setCurrentCaptions] = useState("");

  useEffect(() => {
    const totalVideos = COURSE_MODULES.reduce(
      (sum, module) => sum + module.lessons.length,
      0
    );
    const newProgress = Math.round(
      (completedVideos.length / totalVideos) * 100
    );
    setProgress(newProgress);
  }, [completedVideos]);

  const handleVideoComplete = () => {
    if (!completedVideos.includes(currentVideoId)) {
      setCompletedVideos([...completedVideos, currentVideoId]);
    }
  };

  const handleVideoSelect = (videoId: string) => {
    setCurrentVideoId(videoId);
  };

  const handleNextVideo = () => {
    const allLessons = COURSE_MODULES.flatMap((module) => module.lessons);
    const currentIndex = allLessons.findIndex(
      (lesson) => lesson.id === currentVideoId
    );
    if (currentIndex < allLessons.length - 1) {
      setCurrentVideoId(allLessons[currentIndex + 1].id);
    }
  };

  const handlePreviousVideo = () => {
    const allLessons = COURSE_MODULES.flatMap((module) => module.lessons);
    const currentIndex = allLessons.findIndex(
      (lesson) => lesson.id === currentVideoId
    );
    if (currentIndex > 0) {
      setCurrentVideoId(allLessons[currentIndex - 1].id);
    }
  };

  const handleCaptionsUpdate = (captions: string) => {
    setCurrentCaptions(captions);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={handlePreviousVideo}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleNextVideo}>
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </header>

      <div className="grid lg:grid-cols-[1fr,320px] h-[calc(100vh-65px)]">
        <main className="p-6 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-2xl font-bold mb-2">{COURSE_TITLE}</h1>
              <p className="text-muted-foreground">
                Master modern React development with Next.js, including Server
                Components, App Router, and advanced patterns.
              </p>
              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <span>4h 20min</span>
                <span>45 videos</span>
                <span>38 lessons</span>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>4.7</span>
                  <span className="ml-1">(325 reviews)</span>
                </div>
              </div>
              <Progress value={progress} className="mt-4" />
              <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                <span>Progress: {progress}%</span>
                <Achievements />
              </div>
            </div>

            <Tabs defaultValue="video" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="video">Video</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
                <TabsTrigger value="career">Career & Community</TabsTrigger>
              </TabsList>
              <TabsContent value="video" className="space-y-4">
                <VideoPlayer
                  videoId={currentVideoId}
                  onComplete={handleVideoComplete}
                  onCaptionsUpdate={handleCaptionsUpdate}
                />
                <Separator />
                <VideoSummary
                  videoId={currentVideoId}
                  captions={currentCaptions}
                />
              </TabsContent>
              <TabsContent value="notes">
                <NotesSection videoId={currentVideoId} />
              </TabsContent>
              <TabsContent value="quiz">
                <QuizSection
                  videoId={currentVideoId}
                  videoContent={currentCaptions}
                />
              </TabsContent>
              <TabsContent value="career" className="space-y-6">
                <CareerSection courseTitle={COURSE_TITLE} />
                <CommunitySection />
              </TabsContent>
            </Tabs>

            <div className="space-y-6">
              <Certificate progress={progress} />
              <CourseRating />
            </div>
          </div>
        </main>

        <aside className="border-l overflow-auto">
          <CourseContent
            currentVideoId={currentVideoId}
            completedVideos={completedVideos}
            onVideoSelect={handleVideoSelect}
          />
        </aside>
      </div>
    </div>
  );
}
