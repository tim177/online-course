"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { generateQuizQuestions } from "../actions/ai-generate";

interface QuizSectionProps {
  videoId: string;
  videoContent: string;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export function QuizSection({ videoId, videoContent }: QuizSectionProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      setError("");
      try {
        const result = await generateQuizQuestions(videoContent);
        if (result.success) {
          setQuestions(result.questions);
          setAnswers(new Array(result.questions.length).fill(-1));
        } else {
          setError(result.error || "Failed to generate quiz questions");
        }
      } catch (err) {
        setError("An error occurred while generating the quiz");
      } finally {
        setLoading(false);
      }
    }

    if (videoContent) {
      fetchQuestions();
    }
  }, [videoContent]);

  const handleSubmit = () => {
    setShowResults(true);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Test Your Knowledge
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="space-y-4">
            <div className="flex items-start gap-2">
              <span className="font-medium">Q{questionIndex + 1}.</span>
              <span>{question.question}</span>
            </div>
            <RadioGroup
              value={answers[questionIndex]?.toString()}
              onValueChange={(value) => {
                const newAnswers = [...answers];
                newAnswers[questionIndex] = Number.parseInt(value);
                setAnswers(newAnswers);
              }}
            >
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={optionIndex.toString()}
                    id={`q${questionIndex}-o${optionIndex}`}
                  />
                  <Label
                    htmlFor={`q${questionIndex}-o${optionIndex}`}
                    className="flex items-center gap-2"
                  >
                    {option}
                    {showResults && optionIndex === question.correctAnswer && (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    )}
                    {showResults &&
                      answers[questionIndex] === optionIndex &&
                      optionIndex !== question.correctAnswer && (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={answers.some((a) => a === -1)}
        >
          Check Answers
        </Button>
      </CardContent>
    </Card>
  );
}
