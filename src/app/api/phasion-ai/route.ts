import { NextResponse } from "next/server";
import { getMerchantItems } from "@/lib/commerce";
import { callGemini } from "@/lib/gemini";
import { buildChatPrompt, buildSearchPrompt, buildCompleteTheLookPrompt } from "@/lib/prompts";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { feature, messages, query, currentProduct } = body;

    // Fetch the product catalog
    const catalog = await getMerchantItems().catch((err) => {
      console.error("Failed to fetch catalog in API route:", err);
      return [];
    });

    if (feature === "chat") {
      if (!messages || !Array.isArray(messages)) {
        return NextResponse.json({ error: "Missing messages array" }, { status: 400 });
      }
      
      const systemPrompt = buildChatPrompt(catalog);
      const geminiMessages = messages.map((m: any) => ({
        role: m.role === "user" ? ("user" as const) : ("model" as const),
        content: m.content
      }));

      const replyText = await callGemini(systemPrompt, geminiMessages, false);
      return NextResponse.json({ reply: replyText });
    } 
    
    if (feature === "search") {
      if (!query || typeof query !== "string") {
        return NextResponse.json({ error: "Missing search query" }, { status: 400 });
      }

      const systemPrompt = buildSearchPrompt(catalog, query);
      const userMessage = [{ role: "user" as const, content: `Search query: ${query}` }];
      const responseText = await callGemini(systemPrompt, userMessage, true);
      
      let cleanText = responseText.trim();
      if (cleanText.startsWith("```")) {
        cleanText = cleanText.replace(/^```json\s*/, "").replace(/^```\s*/, "").replace(/\s*```$/, "");
      }

      try {
        const jsonResult = JSON.parse(cleanText);
        const matchedProducts = (jsonResult.ids || [])
          .map((id: string) => catalog.find((item) => item.id === id))
          .filter(Boolean);

        return NextResponse.json({
          explanation: jsonResult.explanation || "Curated search results matching your query.",
          products: matchedProducts,
        });
      } catch (parseError) {
        console.error("JSON parse error for search response:", parseError, "Raw response:", responseText);
        return NextResponse.json({ error: "Failed to parse search response from AI" }, { status: 500 });
      }
    }

    if (feature === "complete-the-look") {
      if (!currentProduct) {
        return NextResponse.json({ error: "Missing currentProduct" }, { status: 400 });
      }

      const systemPrompt = buildCompleteTheLookPrompt(catalog, currentProduct);
      const userMessage = [{ role: "user" as const, content: `Current product is ${currentProduct.name}` }];
      const responseText = await callGemini(systemPrompt, userMessage, true);

      let cleanText = responseText.trim();
      if (cleanText.startsWith("```")) {
        cleanText = cleanText.replace(/^```json\s*/, "").replace(/^```\s*/, "").replace(/\s*```$/, "");
      }

      try {
        const jsonResult = JSON.parse(cleanText);
        const matchedProducts = (jsonResult.ids || [])
          .map((id: string) => catalog.find((item) => item.id === id))
          .filter(Boolean);

        return NextResponse.json({
          reasoning: jsonResult.reasoning || "An elegant combination to complete your style.",
          products: matchedProducts,
        });
      } catch (parseError) {
        console.error("JSON parse error for complete-the-look response:", parseError, "Raw response:", responseText);
        return NextResponse.json({ error: "Failed to parse recommendations from AI" }, { status: 500 });
      }
    }

    return NextResponse.json({ error: "Unsupported feature" }, { status: 400 });
  } catch (error: any) {
    console.error("Error in PhasionAI API route:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
