import { NextRequest, NextResponse } from "next/server";
import { generateSuggestionsWithGemini, SuggestionTone } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tone = "chan-thanh", senderName, department } = body;

    const result = await generateSuggestionsWithGemini(
      tone as SuggestionTone,
      senderName,
      department
    );

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("AI suggest route error:", error);
    return NextResponse.json(
      {
        error: "Không thể tạo gợi ý AI vào lúc này.",
        fromAI: false,
      },
      { status: 500 }
    );
  }
}
