"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Menu, ShoppingBag } from "lucide-react";
import { config } from "@/config";
import { Button } from "@/components/ui/button";
import { getMerchant } from "@/lib/commerce";
import { resolveApiImageUrl } from "@/lib/image";
import { useCartStore } from "@/stores/cart-store";

export function SiteHeader() {
    const { data: merchant } = useQuery({
        queryKey: ["merchant", config.merchantSlug],
        queryFn: () => getMerchant(),
    });
    const itemCount = useCartStore((state) => state.lines.reduce((total, line) => total + line.quantity, 0));
    const openDrawer = useCartStore((state) => state.openDrawer);

    return (
        <header className="fixed inset-x-0 top-0 z-40 border-b border-white/60 bg-white/75 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-3 rounded-full border border-slate-200/80 bg-white px-3 py-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-slate-950 text-sm font-semibold text-white shadow-sm">
                        {resolveApiImageUrl(merchant?.logo_url) ? (
                            <img
                                src={resolveApiImageUrl(merchant?.logo_url) ?? undefined}
                                alt={merchant?.name ?? "Merchant logo"}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            merchant?.name?.slice(0, 1) ?? "P"
                        )}
                    </div>
                    <div className="pr-1">
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-slate-400">Phasion Sense</p>
                        <p className="text-sm font-semibold text-slate-950">{merchant?.name ?? "Loading store..."}</p>
                    </div>
                </Link>

                <nav className="hidden items-center gap-2 sm:flex">
                    <Button asChild variant="ghost" className="rounded-full px-4 text-slate-600 hover:bg-slate-100 hover:text-slate-950">
                        <Link href="/">Home</Link>
                    </Button>
                    <Button asChild variant="ghost" className="rounded-full px-4 text-slate-600 hover:bg-slate-100 hover:text-slate-950">
                        <Link href="/shop">Shop</Link>
                    </Button>
                </nav>

                <div className="flex items-center gap-2">
                    <Button asChild variant="outline" className="hidden rounded-full border-slate-200 bg-white px-4 text-slate-700 shadow-sm sm:inline-flex">
                        <Link href="/shop">
                            <Menu className="mr-2 h-4 w-4" />
                            Catalog
                        </Link>
                    </Button>
                    <Button className="rounded-full px-4 shadow-sm" onClick={openDrawer}>
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Cart {itemCount > 0 ? `(${itemCount})` : ""}
                    </Button>
                </div>
            </div>
        </header>
    );
}
