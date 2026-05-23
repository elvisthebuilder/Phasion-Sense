"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, X } from "lucide-react";
import { config } from "@/config";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { buildWhatsAppOrderMessage, buildWhatsAppUrl, getWhatsAppNumber } from "@/lib/whatsapp";
import { createBasket, getBasket, getMerchant } from "@/lib/commerce";
import { formatGhanaCedi } from "@/lib/format";
import { useCartStore } from "@/stores/cart-store";
import { useToastStore } from "@/stores/toast-store";

export function CheckoutModal() {
    const checkoutOpen = useCartStore((state) => state.checkoutOpen);
    const closeCheckout = useCartStore((state) => state.closeCheckout);
    const clearCart = useCartStore((state) => state.clearCart);
    const lines = useCartStore((state) => state.lines);
    const subtotalMinor = useCartStore((state) => state.getSubtotalMinor());
    const pushToast = useToastStore((state) => state.pushToast);
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerNote, setCustomerNote] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: merchant } = useQuery({
        queryKey: ["merchant", config.merchantSlug],
        queryFn: () => getMerchant(),
    });

    const canSubmit = lines.length > 0 && customerPhone.trim().length > 0 && customerName.trim().length > 0 && !isSubmitting;

    const summaryItems = useMemo(
        () => lines.map((line) => ({ item_id: line.item.id, qty: line.quantity, item_note: line.selectedSize === "One size" ? null : `Size: ${line.selectedSize}` })),
        [lines],
    );

    if (!checkoutOpen) {
        return null;
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!merchant || !canSubmit) {
            return;
        }

        setIsSubmitting(true);

        try {
            const basket = await createBasket({
                merchant_id: merchant.id,
                items: summaryItems,
                customer_name: customerName.trim(),
                customer_phone: customerPhone.trim(),
                customer_note: customerNote.trim() || null,
                team_slug: config.teamSlug || null,
            });

            const confirmedBasket = await getBasket(basket.id);
            const waNumber = getWhatsAppNumber(confirmedBasket.merchant?.whatsapp_number ?? merchant.whatsapp_number);

            if (!waNumber) {
                pushToast({
                    title: "WhatsApp number unavailable",
                    description: "The merchant did not provide a WhatsApp number and the fallback config is empty.",
                    variant: "error",
                });
                throw new Error("WhatsApp number is unavailable.");
            }

            const whatsappUrl = buildWhatsAppUrl(waNumber, buildWhatsAppOrderMessage(confirmedBasket));
            const windowHandle = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

            if (!windowHandle) {
                pushToast({
                    title: "Pop-up blocked",
                    description: "Allow pop-ups or open WhatsApp manually to finish the order.",
                    variant: "error",
                });
                return;
            }

            pushToast({
                title: "WhatsApp opened",
                description: "Your order draft is ready in WhatsApp. Send it to complete the request.",
                variant: "success",
            });
            clearCart();
            closeCheckout();
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6">
            <Card className="relative w-full max-w-lg overflow-hidden border-slate-200 bg-white shadow-[0_24px_90px_rgba(15,23,42,0.25)]">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Checkout</p>
                        <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-slate-950">Confirm your order</h2>
                    </div>
                    <Button variant="ghost" size="icon" onClick={closeCheckout}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <form className="space-y-5 px-5 py-5" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Customer name</label>
                            <Input value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Enter full name" className="bg-slate-50" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Phone number</label>
                            <Input value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} placeholder="+233..." className="bg-slate-50" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Note</label>
                            <textarea
                                value={customerNote}
                                onChange={(event) => setCustomerNote(event.target.value)}
                                placeholder="Optional note for the merchant"
                                className="min-h-24 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-slate-400"
                            />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center justify-between text-sm text-slate-600">
                            <span>{lines.length} item{lines.length === 1 ? "" : "s"}</span>
                            <span className="font-semibold text-slate-950">{formatGhanaCedi(subtotalMinor)}</span>
                        </div>
                    </div>

                    <Button className="h-11 w-full rounded-full shadow-sm" type="submit" disabled={!canSubmit}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Opening WhatsApp...
                            </>
                        ) : (
                            "Open WhatsApp to send"
                        )}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
