"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { CampaignDetail } from "@/lib/commerce";
import { formatGhanaCedi } from "@/lib/format";
import { resolveApiImageUrl } from "@/lib/image";

type CampaignCardProps = {
    campaign: CampaignDetail;
};

export function CampaignCard({ campaign }: CampaignCardProps) {
    const featuredPreview = campaign.featured_items.slice(0, 3);

    return (
        <Card className="overflow-hidden border-slate-200 shadow-sm">
            <Link href="/shop" className="block">
                <div className="aspect-[16/9] bg-slate-100">
                    <img
                        src={resolveApiImageUrl(campaign.image_urls?.[0]) ?? "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80"}
                        alt={campaign.title}
                        className="h-full w-full object-cover"
                    />
                </div>
            </Link>
            <div className="space-y-4 p-5">
                <div>
                    <h3 className="text-xl font-semibold text-slate-950">{campaign.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{campaign.copy_text ?? "A live campaign from the merchant backend."}</p>
                </div>

                {featuredPreview.length > 0 ? (
                    <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Featured items</p>
                        <div className="flex flex-wrap gap-2">
                            {featuredPreview.map((item) => (
                                <span key={item.id} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
                                    {item.name} · {formatGhanaCedi(item.price_minor)}
                                </span>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </Card>
    );
}
