"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, BadgePercent, ShoppingBag, Sparkles } from "lucide-react";
import { config } from "@/config";
import { CampaignCard } from "@/components/commerce/campaign-card";
import { ProductCard } from "@/components/commerce/product-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatGhanaCedi } from "@/lib/format";
import { getMerchant, getMerchantCampaignDetails, getMerchantItems } from "@/lib/commerce";
import { resolveApiImageUrl } from "@/lib/image";

export function HomeScreen() {
    const merchantQuery = useQuery({
        queryKey: ["merchant", config.merchantSlug],
        queryFn: () => getMerchant(),
    });

    const campaignsQuery = useQuery({
        queryKey: ["campaign-details", config.merchantSlug, config.teamSlug],
        queryFn: () => getMerchantCampaignDetails(),
    });

    const itemsQuery = useQuery({
        queryKey: ["items", config.merchantSlug],
        queryFn: () => getMerchantItems(),
    });

    const merchant = merchantQuery.data;
    const heroColors = merchant?.brand_colors?.length ? merchant.brand_colors : ["#111827", "#1d4ed8"];
    const featuredItems = (itemsQuery.data ?? []).filter((item) => item.in_stock).slice(0, 6);
    const catalogCount = itemsQuery.data?.length ?? 0;

    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-8 sm:px-6 lg:px-8">
            <section
                className="overflow-hidden rounded-[2rem] border border-white/40 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)]"
                style={{
                    background: `radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent 28%), linear-gradient(135deg, ${heroColors[0]} 0%, ${heroColors[1] ?? heroColors[0]} 100%)`,
                }}
            >
                <div className="grid gap-8 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-14">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
                            <Sparkles className="h-4 w-4" />
                            Contemporary fashion commerce for the hackathon
                        </div>
                        <div className="space-y-4">
                            <h1 className="max-w-2xl font-[family-name:var(--font-space-grotesk)] text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                                {merchant?.name ?? "Phasion Sense"} made for discovery, styling, and checkout.
                            </h1>
                            <p className="max-w-xl text-base leading-7 text-white/88 sm:text-lg">
                                Browse campaigns, explore the catalog, add pieces to your basket, and complete checkout with a WhatsApp handoff.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Button asChild className="h-11 rounded-full bg-white px-5 text-slate-950 shadow-lg shadow-slate-950/10 hover:bg-white/95">
                                <Link href="/shop">
                                    Shop the catalog
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="h-11 rounded-full border-white/30 bg-white/10 px-5 text-white hover:bg-white/15">
                                <Link href="#campaigns">
                                    View campaigns
                                </Link>
                            </Button>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                                <p className="text-xs uppercase tracking-[0.22em] text-white/60">Catalog</p>
                                <p className="mt-2 text-xl font-semibold">{catalogCount} items</p>
                            </div>
                            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                                <p className="text-xs uppercase tracking-[0.22em] text-white/60">Featured</p>
                                <p className="mt-2 text-xl font-semibold">{featuredItems.length} picks</p>
                            </div>
                            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                                <p className="text-xs uppercase tracking-[0.22em] text-white/60">Checkout</p>
                                <p className="mt-2 text-xl font-semibold">WhatsApp</p>
                            </div>
                        </div>
                    </div>

                    <Card className="border-white/20 bg-white/10 p-6 text-white shadow-none backdrop-blur-xl">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3">
                                {resolveApiImageUrl(merchant?.logo_url) ? (
                                    <img
                                        src={resolveApiImageUrl(merchant?.logo_url) ?? undefined}
                                        alt={merchant?.name ?? "Merchant logo"}
                                        className="h-12 w-12 rounded-2xl bg-white object-cover p-1"
                                    />
                                ) : (
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-lg font-semibold">
                                        {merchant?.name?.slice(0, 1) ?? "P"}
                                    </div>
                                )}
                                <div>
                                    <p className="text-xs uppercase tracking-[0.28em] text-white/70">Merchant</p>
                                    <p className="text-lg font-semibold">{merchant?.name ?? "Loading merchant..."}</p>
                                </div>
                            </div>
                            <p className="text-sm leading-6 text-white/82">{merchant?.description ?? "A premium storefront powered by the live hackathon backend."}</p>
                            <div className="grid gap-3 pt-2 sm:grid-cols-2">
                                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/65">Featured products</p>
                                    <p className="mt-2 text-2xl font-semibold">{featuredItems.length}</p>
                                </div>
                                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/65">Catalog pricing</p>
                                    <p className="mt-2 text-2xl font-semibold">{itemsQuery.data?.[0] ? formatGhanaCedi(itemsQuery.data[0].price_minor) : "GH₵0.00"}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            <section id="campaigns" className="space-y-5">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Campaigns</p>
                        <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-slate-950">Live drops and featured edits</h2>
                    </div>
                    <Button asChild variant="outline" className="hidden rounded-full border-slate-200 bg-white px-4 sm:inline-flex">
                        <Link href="/shop">
                            <BadgePercent className="mr-2 h-4 w-4" />
                            Browse catalog
                        </Link>
                    </Button>
                </div>

                {campaignsQuery.isLoading ? (
                    <p className="text-sm text-slate-500">Loading campaigns...</p>
                ) : campaignsQuery.isError ? (
                    <p className="text-sm text-red-600">Could not load campaign data.</p>
                ) : (
                    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                        {campaignsQuery.data?.map((campaign) => <CampaignCard key={campaign.id} campaign={campaign} />)}
                    </div>
                )}
            </section>

            <section className="space-y-5">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Featured products</p>
                        <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-slate-950">A curated slice of the catalog</h2>
                    </div>
                    <Button asChild variant="outline" className="rounded-full border-slate-200 bg-white px-4">
                        <Link href="/shop">
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Open shop
                        </Link>
                    </Button>
                </div>

                {itemsQuery.isLoading ? (
                    <p className="text-sm text-slate-500">Loading products...</p>
                ) : itemsQuery.isError ? (
                    <p className="text-sm text-red-600">Could not load products.</p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {featuredItems.map((item) => (
                            <ProductCard key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}