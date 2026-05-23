"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ItemResponse } from "@/lib/commerce";
import { formatGhanaCedi } from "@/lib/format";
import { resolveApiImageUrl } from "@/lib/image";
import { useCartStore } from "@/stores/cart-store";

type ProductCardProps = {
    item: ItemResponse;
};

export function ProductCard({ item }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    return (
        <Card className={`overflow-hidden border-slate-200 ${item.in_stock ? "" : "opacity-60 grayscale"}`}>
            <Link href={`/products/${item.id}`} className="block">
                <div className="aspect-[4/5] overflow-hidden bg-slate-100">
                    <img
                        src={resolveApiImageUrl(item.image_urls?.[0]) ?? "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80"}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                </div>
            </Link>
            <div className="space-y-4 p-5">
                <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h3 className="line-clamp-2 text-lg font-semibold text-slate-950">{item.name}</h3>
                            <p className="mt-1 line-clamp-2 text-sm text-slate-600">{item.description ?? "No description available."}</p>
                        </div>
                        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                            {item.in_stock ? "In stock" : "Sold out"}
                        </span>
                    </div>
                    <p className="text-base font-semibold text-slate-950">{formatGhanaCedi(item.price_minor)}</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button asChild variant="outline" className="h-10 flex-1 rounded-full border-slate-200 bg-white">
                        <Link href={`/products/${item.id}`}>
                            View product
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        className="h-10 rounded-full px-4"
                        onClick={() => addItem(item)}
                        disabled={!item.in_stock}
                    >
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Add
                    </Button>
                </div>
            </div>
        </Card>
    );
}
