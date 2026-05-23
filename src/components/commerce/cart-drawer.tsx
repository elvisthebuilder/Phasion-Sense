"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatGhanaCedi } from "@/lib/format";
import { resolveApiImageUrl } from "@/lib/image";
import { useCartStore } from "@/stores/cart-store";

export function CartDrawer() {
    const drawerOpen = useCartStore((state) => state.drawerOpen);
    const closeDrawer = useCartStore((state) => state.closeDrawer);
    const openCheckout = useCartStore((state) => state.openCheckout);
    const lines = useCartStore((state) => state.lines);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeItem = useCartStore((state) => state.removeItem);
    const subtotalMinor = useCartStore((state) => state.getSubtotalMinor());

    return (
        <>
            {drawerOpen ? <button aria-label="Close cart drawer" className="fixed inset-0 z-40 bg-slate-950/35" onClick={closeDrawer} /> : null}
            <aside
                className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform border-l border-slate-200/80 bg-white/95 shadow-[0_24px_90px_rgba(15,23,42,0.2)] backdrop-blur-xl transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Basket</p>
                            <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-slate-950">Your cart</h2>
                        </div>
                        <Button variant="ghost" size="icon" onClick={closeDrawer}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
                        {lines.length === 0 ? (
                            <Card className="border-dashed border-slate-200 bg-slate-50 p-6 text-center shadow-none">
                                <ShoppingBag className="mx-auto h-8 w-8 text-slate-400" />
                                <p className="mt-4 font-medium text-slate-900">Your basket is empty.</p>
                                <p className="mt-2 text-sm text-slate-500">Browse the catalog and add products you like.</p>
                                <Button asChild className="mt-4 rounded-full shadow-sm">
                                    <Link href="/shop" onClick={closeDrawer}>
                                        Shop now
                                    </Link>
                                </Button>
                            </Card>
                        ) : (
                            lines.map((line) => (
                                <Card key={`${line.item.id}-${line.selectedSize}`} className="flex gap-3 border-slate-200 p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                    <img
                                        src={resolveApiImageUrl(line.item.image_urls?.[0]) ?? "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=300&q=80"}
                                        alt={line.item.name}
                                        className="h-24 w-20 rounded-2xl object-cover"
                                    />
                                    <div className="min-w-0 flex-1 space-y-3">
                                        <div>
                                            <p className="line-clamp-2 text-sm font-semibold text-slate-950">{line.item.name}</p>
                                            <p className="mt-1 text-xs text-slate-500">Size: {line.selectedSize}</p>
                                            <p className="mt-1 text-sm font-medium text-slate-900">{formatGhanaCedi(line.item.price_minor)}</p>
                                        </div>

                                        <div className="flex items-center justify-between gap-2">
                                            <div className="inline-flex items-center rounded-full border border-slate-200">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-9 w-9 rounded-none rounded-l-full"
                                                    onClick={() => updateQuantity(line.item.id, Math.max(1, line.quantity - 1), line.selectedSize)}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <span className="min-w-10 px-3 text-center text-sm font-medium">{line.quantity}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-9 w-9 rounded-none rounded-r-full"
                                                    onClick={() => updateQuantity(line.item.id, line.quantity + 1, line.selectedSize)}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <Button variant="ghost" size="icon" onClick={() => removeItem(line.item.id, line.selectedSize)}>
                                                <Trash2 className="h-4 w-4 text-rose-500" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>

                    <div className="space-y-4 border-t border-slate-200 px-5 py-4">
                        <div className="flex items-center justify-between text-sm text-slate-600">
                            <span>Subtotal</span>
                            <span className="font-semibold text-slate-950">{formatGhanaCedi(subtotalMinor)}</span>
                        </div>
                        <Button className="h-11 w-full rounded-full shadow-sm" disabled={lines.length === 0} onClick={openCheckout}>
                            Proceed to checkout
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    );
}
