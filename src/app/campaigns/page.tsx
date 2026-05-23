import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getMerchantCampaigns } from "@/lib/commerce";
import { resolveApiImageUrl } from "@/lib/image";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaigns — Phasion Sense",
  description:
    "Explore our curated fashion campaigns — editorial drops, seasonal collections, and exclusive limited releases from Phasion Sense.",
};

export const revalidate = 60;

function formatDate(ts: number) {
  return new Date(ts * 1000).toLocaleDateString("en-GH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function CampaignsPage() {
  const campaigns = await getMerchantCampaigns().catch(() => []);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-cream)]">
      {/* PAGE HEADER */}
      <section className="w-full bg-[var(--color-onyx)] pt-40 pb-20 px-8">
        <div className="max-w-[1400px] mx-auto">
          <span className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-xs mb-6 block">
            PHASION SENSE / CAMPAIGNS
          </span>
          <h1 className="font-serif text-[clamp(3.5rem,7vw,8rem)] leading-[0.9] text-white tracking-tight mb-8">
            The <span className="italic text-[var(--color-amber)]">Drops.</span>
          </h1>
          <p className="font-sans text-[var(--color-stone)] text-lg max-w-xl leading-relaxed">
            Each campaign is a chapter — a deliberate exploration of silhouette,
            texture, and the culture of Accra. Shop the edit, own the story.
          </p>
        </div>
      </section>

      {/* CAMPAIGN GRID */}
      <section className="w-full max-w-[1400px] mx-auto px-8 py-24">
        {campaigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 text-center">
            <p className="font-serif italic text-[var(--color-stone)] text-3xl mb-4">
              No campaigns yet.
            </p>
            <p className="font-sans text-[var(--color-stone)] text-base">
              Check back soon for new drops and editorial releases.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[var(--color-parchment)]">
            {campaigns.map((campaign, idx) => {
              const modernImages = [
                "https://images.unsplash.com/photo-1543269664-76b420e6a8e6?w=1920&q=80&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=80&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1531123414780-f74242c2b052?w=1920&q=80&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1523825036634-aab3cce05919?w=1920&q=80&auto=format&fit=crop",
              ];
              const coverImg = modernImages[idx % modernImages.length];
              const isLarge = idx === 0;

              return (
                <Link
                  key={campaign.id}
                  href={`/campaigns/${campaign.id}`}
                  className={`group relative overflow-hidden bg-[var(--color-parchment)] border-[var(--color-parchment)] ${
                    isLarge ? "md:col-span-2 h-[600px] lg:h-[780px]" : "h-[480px]"
                  } border-b border-r`}
                >
                  {/* Background Image */}
                  {coverImg ? (
                    <Image
                      src={coverImg}
                      alt={campaign.title}
                      fill
                      sizes={isLarge ? "100vw" : "50vw"}
                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-espresso)] to-[var(--color-onyx)]" />
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                    <span className="font-sans text-[var(--color-amber)] uppercase tracking-widest text-xs mb-3 block">
                      {campaign.team_slug
                        ? `BY ${campaign.team_slug.toUpperCase()}`
                        : "CAMPAIGN"}{" "}
                      · {formatDate(campaign.created_at)}
                    </span>
                    <h2
                      className={`font-serif text-white tracking-tight mb-3 leading-tight ${
                        isLarge
                          ? "text-[clamp(2.5rem,5vw,5rem)]"
                          : "text-3xl lg:text-4xl"
                      }`}
                    >
                      {campaign.title}
                    </h2>
                    {campaign.copy_text && (
                      <p className="font-sans text-white/70 text-base leading-relaxed mb-6 max-w-xl line-clamp-2">
                        {campaign.copy_text}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-2 font-sans text-white uppercase text-xs tracking-widest border-b border-white/40 pb-1 group-hover:border-[var(--color-amber)] group-hover:text-[var(--color-amber)] transition-colors duration-300">
                      EXPLORE DROP
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>

                  {/* Image count badge */}
                  {(campaign.image_urls?.length ?? 0) > 1 && (
                    <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="font-sans text-white text-xs tracking-wide">
                        {campaign.image_urls!.length} images
                      </span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* BACK TO SHOP STRIP */}
      <section className="w-full bg-[var(--color-onyx)] py-20 px-8 mt-auto">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-serif text-white text-3xl mb-2">
              Styled and ready to wear.
            </h3>
            <p className="font-sans text-[var(--color-stone)] text-base">
              Shop the full collection behind every campaign.
            </p>
          </div>
          <Link href="/shop">
            <Button className="bg-[var(--color-amber)] text-[var(--color-onyx)] hover:bg-[var(--color-ivory)] font-sans uppercase tracking-widest px-10 py-6">
              SHOP NOW →
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
