"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PenLine, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NotesSectionProps {
  videoId: string;
}

export function NotesSection({ videoId }: NotesSectionProps) {
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes_${videoId}`);
    if (savedNotes) {
      setNotes(savedNotes);
    } else {
      setNotes("");
    }
  }, [videoId]);

  const handleSave = () => {
    localStorage.setItem(`notes_${videoId}`, notes);
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <PenLine className="h-5 w-5" />
          Your Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Take notes while watching the video..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[200px]"
        />
        <Button onClick={handleSave} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          Save Notes
        </Button>
      </CardContent>
    </Card>
  );
}
