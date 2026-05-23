import { config } from "@/config";
import type { BasketDetail } from "@/lib/commerce";

export function sanitizeWhatsAppNumber(number: string | null | undefined) {
    return (number ?? "").replace(/\D/g, "");
}

export function getWhatsAppNumber(primary: string | null | undefined) {
    const preferredNumber = sanitizeWhatsAppNumber(primary);
    if (preferredNumber) {
        return preferredNumber;
    }

    return sanitizeWhatsAppNumber(config.defaultWhatsappNumber);
}

export function buildWhatsAppUrl(number: string, message: string) {
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppOrderMessage(basket: BasketDetail) {
    const lines = basket.items.map((item) => `- ${item.name} x${item.qty} (${new Intl.NumberFormat("en-GH", { style: "currency", currency: item.currency }).format(item.price_minor / 100)})`);
    const total = new Intl.NumberFormat("en-GH", { style: "currency", currency: basket.currency ?? "GHS" }).format(basket.total_minor / 100);

    return [
        "Hello Phasion Sense, I would like to place this order:",
        ...lines,
        `Total: ${total}`,
        basket.customer_name ? `Name: ${basket.customer_name}` : null,
        basket.customer_phone ? `Phone: ${basket.customer_phone}` : null,
        basket.customer_note ? `Note: ${basket.customer_note}` : null,
    ]
        .filter(Boolean)
        .join("\n");
}
