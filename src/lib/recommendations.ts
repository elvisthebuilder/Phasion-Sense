import type { ItemResponse } from "@/lib/commerce";

function tokenize(text: string) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter(Boolean);
}

export function pickCompleteTheLook(currentItem: ItemResponse, catalog: ItemResponse[]) {
    const currentTokens = new Set(tokenize(`${currentItem.name} ${currentItem.description ?? ""}`));

    return catalog
        .filter((item) => item.id !== currentItem.id && item.in_stock)
        .map((item) => {
            const candidateTokens = tokenize(`${item.name} ${item.description ?? ""}`);
            const overlap = candidateTokens.reduce((score, token) => score + (currentTokens.has(token) ? 1 : 0), 0);
            const priceDistance = Math.abs(item.price_minor - currentItem.price_minor);
            const affinity = overlap * 10 - priceDistance / 500;
            return { item, affinity };
        })
        .sort((left, right) => right.affinity - left.affinity)
        .slice(0, 3)
        .map((entry) => entry.item);
}
