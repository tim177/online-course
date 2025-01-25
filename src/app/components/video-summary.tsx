"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bot, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { generateVideoSummary } from "../actions/generate-summary";

interface VideoSummaryProps {
  videoId: string;
  captions: string;
}

export function VideoSummary({ videoId, captions }: VideoSummaryProps) {
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function getSummary() {
      if (!captions) return;

      setLoading(true);
      setError("");

      try {
        const result = await generateVideoSummary(captions);
        if (result.success) {
          setSummary(result.summary);
        } else {
          setError(result.error || "Failed to generate summary");
        }
      } catch (err) {
        setError("An error occurred while generating the summary");
        console.log("err", err);
      } finally {
        setLoading(false);
      }
    }

    console.log("captions:", captions);
    getSummary();
  }, [captions]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI-Generated Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating summary...
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : summary ? (
          <div
            className="prose prose-sm max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        ) : (
          <p className="text-muted-foreground">
            Enable captions to generate an AI summary of the video content.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
