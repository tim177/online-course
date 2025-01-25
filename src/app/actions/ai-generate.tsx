"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function generateQuizQuestions(videoContent: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Based on the following video content, generate 5 multiple-choice questions to test the viewer's understanding. Each question should have 4 options. Format the output as a JSON array of objects, where each object has a 'question' field, an 'options' array, and a 'correctAnswer' field (index of the correct option). Video content: ${videoContent}`,
    });

    return {
      success: true,
      questions: JSON.parse(text),
    };
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    return {
      success: false,
      error: "Failed to generate quiz questions",
    };
  }
}

export async function generateJobTips(courseTitle: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Provide 3 job-seeking tips for someone who has completed a course on "${courseTitle}". Include potential job titles, key skills to highlight, and advice for showcasing projects. Format the output as a JSON array of objects, where each object has a 'title' field and a 'content' field.`,
    });

    return {
      success: true,
      tips: JSON.parse(text),
    };
  } catch (error) {
    console.error("Error generating job tips:", error);
    return {
      success: false,
      error: "Failed to generate job tips",
    };
  }
}
