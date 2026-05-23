"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Check, ShoppingBag } from "lucide-react";
import { config } from "@/config";
import { ProductCard } from "@/components/commerce/product-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getItem, getMerchantItems } from "@/lib/commerce";
import { formatGhanaCedi } from "@/lib/format";
import { resolveApiImageUrl } from "@/lib/image";
import { pickCompleteTheLook } from "@/lib/recommendations";
import { useCartStore } from "@/stores/cart-store";

type ProductScreenProps = {
    itemId: string;
};

export function ProductScreen({ itemId }: ProductScreenProps) {
    const [selectedSize, setSelectedSize] = useState("One size");
    const addItem = useCartStore((state) => state.addItem);

    const itemQuery = useQuery({
        queryKey: ["item", itemId],
        queryFn: () => getItem(itemId),
    });

    const catalogQuery = useQuery({
        queryKey: ["items", config.merchantSlug],
        queryFn: () => getMerchantItems(),
    });

    const product = itemQuery.data;
    const recommendations = useMemo(() => {
        if (!product || !catalogQuery.data) {
            return [];
        }

        return pickCompleteTheLook(product, catalogQuery.data);
    }, [catalogQuery.data, product]);

    if (itemQuery.isLoading) {
        return <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">Loading product...</main>;
    }

    if (itemQuery.isError || !product) {
        return <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8 text-red-600">Product not found.</main>;
    }

    const imageUrl = resolveApiImageUrl(product.image_urls?.[0]) ?? "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80";

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                <Card className="overflow-hidden border-slate-200 shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
                    <img src={imageUrl} alt={product.name} className="h-full w-full object-cover" />
                </Card>

                <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)] lg:p-8">
                    <div className="space-y-3">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Product detail</p>
                        <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl font-semibold tracking-tight text-slate-950">{product.name}</h1>
                        <p className="max-w-2xl text-base leading-7 text-slate-600">{product.description ?? "No description available for this product yet."}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${product.in_stock ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-600"}`}>
                            {product.in_stock ? "In stock" : "Out of stock"}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{product.currency}</span>
                    </div>

                    <p className="text-2xl font-semibold text-slate-950">{formatGhanaCedi(product.price_minor)}</p>

                    <div className="space-y-3">
                        <p className="text-sm font-medium text-slate-700">Select size</p>
                        <div className="flex flex-wrap gap-2">
                            {["One size", "S", "M", "L", "XL"].map((size) => (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => setSelectedSize(size)}
                                    className={`rounded-full border px-4 py-2 text-sm transition ${selectedSize === size ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700"}`}
                                >
                                    {selectedSize === size ? <Check className="mr-2 inline-block h-4 w-4" /> : null}
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Button className="h-11 rounded-full px-5 shadow-sm" disabled={!product.in_stock} onClick={() => addItem(product, 1, selectedSize)}>
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Add to cart
                        </Button>
                        <Button asChild variant="outline" className="h-11 rounded-full border-slate-200 bg-white px-5 shadow-sm">
                            <a href="/shop">
                                Back to shop
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    </div>
                </div>
            </section>

            <section className="mt-12 space-y-5">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Complete the look</p>
                    <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-slate-950">Recommended pieces that work with this item</h2>
                </div>

                {catalogQuery.isLoading ? (
                    <p className="text-sm text-slate-500">Loading recommendations...</p>
                ) : recommendations.length === 0 ? (
                    <p className="text-sm text-slate-500">No complementary items found yet.</p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {recommendations.map((item) => (
                            <ProductCard key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
