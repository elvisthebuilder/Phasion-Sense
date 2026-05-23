export const config = {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api-hackathon.codedematrixtech.com",
    merchantSlug: process.env.NEXT_PUBLIC_MERCHANT_SLUG ?? "phasion-sense",
    defaultWhatsappNumber: process.env.NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER ?? "0553010003",
    teamSlug: process.env.NEXT_PUBLIC_TEAM_SLUG ?? "",
    anthropicApiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY ?? "",
    geminiApiKey: process.env.GEMINI_API_KEY ?? process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "",
    geminiModel: process.env.GEMINI_MODEL ?? process.env.NEXT_PUBLIC_GEMINI_MODEL ?? "gemini-2.5-flash",
};

