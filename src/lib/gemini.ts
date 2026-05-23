import { config } from "@/config";

export type GeminiMessage = {
  role: "user" | "model" | "ai";
  content: string;
};

export async function callGemini(
  systemPrompt: string,
  messages: GeminiMessage[],
  jsonMode: boolean = false
): Promise<string> {
  const apiKey = config.geminiApiKey;
  if (!apiKey) {
    console.warn("Gemini API key is not configured.");
    throw new Error("Gemini API key is missing. Please set GEMINI_API_KEY or NEXT_PUBLIC_GEMINI_API_KEY in your environment.");
  }

  // Format messages for Gemini API
  // Roles in Gemini API must be 'user' or 'model'
  const contents = messages.map((msg) => {
    const role = msg.role === "user" ? "user" : "model";
    return {
      role,
      parts: [{ text: msg.content }],
    };
  });

  const model = config.geminiModel || "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const payload = {
    contents,
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    generationConfig: {
      temperature: 0.2,
      responseMimeType: jsonMode ? "application/json" : undefined,
    },
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini API Error Response:", errText);
      throw new Error(`Gemini API error: ${res.status} - ${errText}`);
    }

    const data = await res.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      throw new Error("No content generated in Gemini response");
    }

    return candidateText;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // If gemini-2.5-flash fails because it's not available in the region, try falling back to gemini-2.0-flash
    if (model === "gemini-2.5-flash") {
      console.log("Attempting fallback to gemini-2.0-flash...");
      const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      try {
        const res = await fetch(fallbackUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const data = await res.json();
          return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        }
      } catch (fallbackError) {
        console.error("Fallback to gemini-2.0-flash failed:", fallbackError);
      }
    }
    throw error;
  }
}
