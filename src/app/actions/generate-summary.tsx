"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function generateVideoSummary(captions: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Based on the following video captions, provide a concise summary of the main points and key takeaways. Include a bullet-point list of the most important concepts covered. Captions: ${captions}`,
    });

    return {
      success: true,
      summary: text,
    };
  } catch (error) {
    console.error("Error generating summary:", error);
    return {
      success: false,
      error: "Failed to generate summary",
    };
  }
}
