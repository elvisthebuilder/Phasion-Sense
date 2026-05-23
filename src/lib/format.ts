export function formatGhanaCedi(priceMinor: number) {
    return new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "GHS",
        maximumFractionDigits: 2,
    }).format(priceMinor / 100);
}

export function formatGhanaCediCompact(priceMinor: number) {
    return `GH₵${(priceMinor / 100).toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
