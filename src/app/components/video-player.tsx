"use client";

import { useState, useEffect, useCallback } from "react";
import YouTube from "react-youtube";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Subtitles, CaptionsIcon as SubtitlesOff } from "lucide-react";

interface VideoPlayerProps {
  videoId: string;
  onComplete: () => void;
  onCaptionsUpdate: (captions: string) => void;
}

export function VideoPlayer({
  videoId,
  onComplete,
  onCaptionsUpdate,
}: VideoPlayerProps) {
  const [showCaptions, setShowCaptions] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [captionsText, setCaptionsText] = useState<string>("");

  //   const opts = {
  //     height: "500",
  //     width: "100%",
  //     playerVars: {
  //       cc_load_policy: showCaptions ? 1 : 0,
  //       cc_lang_pref: "en",
  //     },
  //   };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      //   cc_load_policy: showCaptions ? 1 : 0,
      autoplay: 0, // Don't autoplay the video
      rel: 0, // Don't show related videos
      modestbranding: 1, // Use minimal YouTube branding
    },
  };

  const onReady = (event: any) => {
    setPlayer(event.target);
  };

  const onEnd = () => {
    onComplete();
  };

  // Function to fetch captions from YouTube
  const fetchCaptions = useCallback(async () => {
    if (!player) return;

    try {
      // Get captions track
      const tracks = player.getOption("captions", "tracklist") || [];
      const track =
        tracks.find((t: any) => t.languageCode === "en") || tracks[0];

      if (track) {
        // Get captions data
        const captions = await new Promise((resolve) => {
          player.getOption("captions", "getCaptionsJson", (captions: any) => {
            resolve(captions);
          });
        });

        // Convert captions to text
        const captionsText = Array.isArray(captions)
          ? captions.map((caption: any) => caption.text).join(" ")
          : "";

        setCaptionsText(captionsText);
        onCaptionsUpdate(captionsText);
      }
    } catch (error) {
      console.error("Error fetching captions:", error);
    }
  }, [player, onCaptionsUpdate]);

  useEffect(() => {
    if (player) {
      player.setOption(
        "captions",
        "track",
        showCaptions ? { languageCode: "en" } : {}
      );
      if (showCaptions) {
        fetchCaptions();
      }
    }
  }, [showCaptions, player, fetchCaptions]);

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <YouTube
          videoId="dQw4w9WgXcQ"
          opts={opts}
          onReady={onReady}
          onEnd={onEnd}
          className="w-full aspect-video"
        />
        <div className="absolute bottom-4 right-4">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setShowCaptions(!showCaptions)}
            className="bg-background/80 backdrop-blur-sm"
          >
            {showCaptions ? (
              <Subtitles className="h-4 w-4" />
            ) : (
              <SubtitlesOff className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      {/* <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        allow="autoplay; encrypted-media"
      ></iframe> */}
    </Card>
  );
}
