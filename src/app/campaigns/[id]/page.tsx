import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCampaign } from "@/lib/commerce";
import { resolveApiImageUrl } from "@/lib/image";
import { formatGhanaCediCompact } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const campaign = await getCampaign(id).catch(() => null);
  if (!campaign) {
    return { title: "Campaign Not Found — Phasion Sense" };
  }
  return {
    title: `${campaign.title} — Phasion Sense`,
    description: campaign.copy_text ?? `Shop ${campaign.title} from Phasion Sense.`,
  };
}

export const revalidate = 60;

function formatDate(ts: number) {
  return new Date(ts * 1000).toLocaleDateString("en-GH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function CampaignDetailPage({ params }: Props) {
  const { id } = await params;
  const campaign = await getCampaign(id).catch(() => null);

  if (!campaign) {
    notFound();
  }

  const modernImages = [
    "https://images.unsplash.com/photo-1543269664-76b420e6a8e6?w=1920&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531123414780-f74242c2b052?w=1920&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523825036634-aab3cce05919?w=1920&q=80&auto=format&fit=crop",
  ];
  
  const seed = id.charCodeAt(0) + id.charCodeAt(id.length - 1);
  const heroImage = modernImages[seed % modernImages.length];
  const additionalImages = [
    modernImages[(seed + 1) % modernImages.length],
    modernImages[(seed + 2) % modernImages.length],
    modernImages[(seed + 3) % modernImages.length]
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-cream)]">
      {/* HERO */}
      <section className="relative w-full h-screen overflow-hidden bg-[var(--color-onyx)]">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={campaign.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-75"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-espresso)] to-[var(--color-onyx)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Hero Content */}
        <div className="absolute bottom-16 left-8 right-8 z-10 max-w-4xl">
          <span className="font-sans text-[var(--color-amber)] uppercase tracking-widest text-xs mb-4 block">
            {campaign.team_slug
              ? `BY ${campaign.team_slug.toUpperCase()}`
              : "CAMPAIGN"}{" "}
            · {formatDate(campaign.created_at)}
          </span>
          <h1 className="font-serif text-[clamp(3rem,7vw,8rem)] leading-[0.9] text-white tracking-tight mb-6">
            {campaign.title}
          </h1>
          {campaign.copy_text && (
            <p className="font-sans text-white/70 text-lg lg:text-xl leading-relaxed max-w-2xl">
              {campaign.copy_text}
            </p>
          )}
        </div>
      </section>

      {/* BREADCRUMB & TIP STRIP */}
      <section className="w-full bg-[var(--color-cream)] px-8 py-6 border-b border-[var(--color-parchment)]">
        <div className="max-w-[1400px] mx-auto flex justify-center sm:justify-end items-center">
          <div className="flex items-center gap-2 bg-[var(--color-amber)]/10 text-[var(--color-espresso)] px-4 py-2 rounded-full font-sans text-xs uppercase tracking-widest border border-[var(--color-amber)]/20">
            <span className="opacity-80">💡 Don't know what to wear?</span>
            <Link href="#" className="font-semibold underline decoration-[var(--color-amber)]/50 hover:decoration-[var(--color-amber)] underline-offset-4 hover:text-[var(--color-amber)] transition-colors">
              Let the AI help you
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED ITEMS */}
      {campaign.featured_items.length > 0 && (
        <section className="w-full max-w-[1400px] mx-auto px-8 py-24">
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-xs mb-3 block">
                FEATURED IN THIS DROP
              </span>
              <h2 className="font-serif text-[var(--color-espresso)] text-5xl lg:text-6xl tracking-tight">
                Shop the Edit.
              </h2>
            </div>
            <Link href="/shop">
              <Button variant="ghost" className="hidden md:inline-flex pr-0 font-sans uppercase tracking-widest text-xs">
                View All →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 border-t border-l border-[var(--color-parchment)]">
            {campaign.featured_items.map((item) => {
              const img = resolveApiImageUrl(item.image_url);
              return (
                <Link
                  key={item.id}
                  href={`/shop/${item.id}`}
                  className="group relative bg-[var(--color-parchment)] border-b border-r border-[var(--color-parchment)] overflow-hidden block"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-[var(--color-parchment)]">
                    {img ? (
                      <Image
                        src={img}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-stone)]/20 to-[var(--color-espresso)]/20" />
                    )}

                    {/* Out of stock overlay */}
                    {!item.in_stock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="font-sans text-white uppercase text-xs tracking-widest">
                          Sold Out
                        </span>
                      </div>
                    )}

                    {/* Quick View strip */}
                    <div className="absolute bottom-0 left-0 w-full bg-[var(--color-espresso)] text-[var(--color-ivory)] py-3 text-center font-sans uppercase text-xs tracking-widest translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                      VIEW PRODUCT
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 bg-[var(--color-cream)]">
                    <h3 className="font-serif text-[var(--color-espresso)] text-lg mb-1 leading-tight">
                      {item.name}
                    </h3>
                    <p className="font-sans text-[var(--color-amber)] uppercase text-sm tracking-widest">
                      {formatGhanaCediCompact(item.price_minor)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* CAMPAIGN IMAGE GALLERY */}
      {additionalImages.length > 0 && (
        <section className="w-full bg-[var(--color-onyx)] py-24 px-8">
          <div className="max-w-[1400px] mx-auto">
            <span className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-xs mb-12 block">
              CAMPAIGN GALLERY
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {additionalImages.map((src, idx) => (
                <div
                  key={idx}
                  className={`relative overflow-hidden bg-[var(--color-espresso)] ${
                    idx === 0 && additionalImages.length > 2
                      ? "md:col-span-2 h-[500px]"
                      : "h-[380px]"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${campaign.title} — image ${idx + 2}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA STRIP */}
      <section className="w-full bg-[var(--color-cream)] py-32 px-8 border-t border-[var(--color-parchment)]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
            <h2 className="font-serif text-[var(--color-espresso)] text-4xl lg:text-5xl mb-4">
              More campaigns await.
            </h2>
            <p className="font-sans text-[var(--color-stone)] text-base leading-relaxed max-w-md">
              Every drop tells a new story. Explore all our curated campaigns
              and find the one that speaks to you.
            </p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Link href="/campaigns">
              <Button
                variant="default"
                className="font-sans uppercase tracking-widest px-8 py-6"
              >
                ALL CAMPAIGNS
              </Button>
            </Link>
            <Link href="/shop">
              <Button
                variant="ghost"
                className="font-sans uppercase tracking-widest px-8 py-6"
              >
                SHOP ALL →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
