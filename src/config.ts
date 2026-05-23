export const config = {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api-hackathon.codedematrixtech.com",
    merchantSlug: process.env.NEXT_PUBLIC_MERCHANT_SLUG ?? "phasion-sense",
    defaultWhatsappNumber: process.env.NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER ?? "0553010003",
    teamSlug: process.env.NEXT_PUBLIC_TEAM_SLUG ?? "",
    anthropicApiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY ?? "",
};
