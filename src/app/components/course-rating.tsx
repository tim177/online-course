"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

export function CourseRating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Rate this Course</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              variant="ghost"
              size="icon"
              className={`hover:text-yellow-500 ${
                (hover || rating) >= star
                  ? "text-yellow-500"
                  : "text-muted-foreground"
              }`}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
            >
              <Star className="h-6 w-6" />
            </Button>
          ))}
        </div>
        <Textarea
          placeholder="Share your thoughts about this course..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="min-h-[100px]"
        />
        <Button className="w-full" disabled={!rating}>
          Submit Review
        </Button>
      </CardContent>
    </Card>
  );
}
