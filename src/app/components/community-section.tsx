"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send } from "lucide-react";

const COMMENTS = [
  {
    id: 1,
    user: "Alex Johnson",
    avatar: "/placeholder.svg",
    content:
      "Great explanation of Server Components! Really helped me understand the concept better.",
    timestamp: "2 hours ago",
    likes: 12,
  },
  {
    id: 2,
    user: "Sarah Chen",
    avatar: "/placeholder.svg",
    content:
      "The section about data fetching patterns was particularly useful. Would love to see more advanced examples!",
    timestamp: "5 hours ago",
    likes: 8,
  },
];

export function CommunitySection() {
  const [newComment, setNewComment] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Discussion
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {COMMENTS.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar>
                <AvatarImage src={comment.avatar} />
                <AvatarFallback>{comment.user[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{comment.user}</div>
                  <span className="text-xs text-muted-foreground">
                    {comment.timestamp}
                  </span>
                </div>
                <p className="text-sm">{comment.content}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                >
                  ♥ {comment.likes}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Add to the discussion..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button className="ml-auto">
              <Send className="h-4 w-4 mr-2" />
              Post Comment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
