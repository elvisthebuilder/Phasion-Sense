"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Filter, Search } from "lucide-react";
import { config } from "@/config";
import { ProductCard } from "@/components/commerce/product-card";
import { Input } from "@/components/ui/input";
import { getMerchantItems } from "@/lib/commerce";
import { formatGhanaCedi } from "@/lib/format";

export function CatalogScreen() {
    const [search, setSearch] = useState("");
    const [onlyInStock, setOnlyInStock] = useState(true);
    const [maxPrice, setMaxPrice] = useState(5000);

    const itemsQuery = useQuery({
        queryKey: ["items", config.merchantSlug],
        queryFn: () => getMerchantItems(),
    });

    const filteredItems = useMemo(() => {
        const items = itemsQuery.data ?? [];
        const query = search.trim().toLowerCase();

        return items.filter((item) => {
            const matchesSearch = !query || [item.name, item.description ?? ""].join(" ").toLowerCase().includes(query);
            const matchesStock = !onlyInStock || item.in_stock;
            const matchesPrice = item.price_minor <= maxPrice * 100;
            return matchesSearch && matchesStock && matchesPrice;
        });
    }, [itemsQuery.data, maxPrice, onlyInStock, search]);

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <section className="space-y-6">
                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
                    <div className="grid gap-6 bg-[linear-gradient(135deg,rgba(15,23,42,0.03),rgba(37,99,235,0.05))] px-6 py-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
                        <div className="space-y-3">
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Shop</p>
                            <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Browse the full catalog</h1>
                            <p className="max-w-2xl text-sm leading-6 text-slate-600">
                                Search products, trim the price range, and keep out-of-stock items hidden while the AI seam stays ready for later.
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                            <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Items</p>
                                <p className="mt-2 text-2xl font-semibold text-slate-950">{itemsQuery.data?.length ?? 0}</p>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">In stock</p>
                                <p className="mt-2 text-2xl font-semibold text-slate-950">{(itemsQuery.data ?? []).filter((item) => item.in_stock).length}</p>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Price cap</p>
                                <p className="mt-2 text-2xl font-semibold text-slate-950">{formatGhanaCedi(maxPrice * 100)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-3 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[1.4fr_0.7fr_0.7fr]">
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products or describe the look" className="pl-9" />
                    </div>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <Filter className="h-4 w-4" />
                            Max price: {formatGhanaCedi(maxPrice * 100)}
                        </label>
                        <input
                            type="range"
                            min={10}
                            max={50}
                            step={1}
                            value={maxPrice / 100}
                            onChange={(event) => setMaxPrice(Number(event.target.value))}
                            className="h-2 w-full accent-slate-900"
                        />
                    </div>
                    <label className="flex items-center justify-start gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
                        <input type="checkbox" checked={onlyInStock} onChange={(event) => setOnlyInStock(event.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-slate-900" />
                        Hide out of stock
                    </label>
                </div>

                {itemsQuery.isLoading ? (
                    <p className="text-sm text-slate-500">Loading products...</p>
                ) : itemsQuery.isError ? (
                    <p className="text-sm text-red-600">Could not load products.</p>
                ) : filteredItems.length === 0 ? (
                    <p className="text-sm text-slate-500">No products match your filters.</p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {filteredItems.map((item) => (
                            <ProductCard key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
