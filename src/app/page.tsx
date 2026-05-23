import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getMerchantItems, getMerchantCampaignDetails } from "@/lib/commerce";
import { resolveApiImageUrl } from "@/lib/image";
import { formatGhanaCediCompact } from "@/lib/format";
import { Countdown } from "@/components/home/countdown";
import { NewsletterForm } from "@/components/home/newsletter-form";

export default async function Home() {
  const [items, campaigns] = await Promise.all([
    getMerchantItems().catch(() => []),
    getMerchantCampaignDetails().catch(() => []),
  ]);

  const newArrivals = items.slice(0, 6);
  const heroImage = resolveApiImageUrl(campaigns[0]?.image_urls?.[0] ?? items[0]?.image_urls?.[0]);
  const editImage = resolveApiImageUrl(campaigns[0]?.image_urls?.[1] ?? items[1]?.image_urls?.[0]);
  const lookbook1 = resolveApiImageUrl(items[2]?.image_urls?.[0]);
  const lookbook2 = resolveApiImageUrl(items[3]?.image_urls?.[0]);
  const lookbook3 = resolveApiImageUrl(items[4]?.image_urls?.[0]);
  const campaignDropImage = resolveApiImageUrl(campaigns[0]?.image_urls?.[2] ?? items[5]?.image_urls?.[0]);

  // Heights for the masonry grid
  const heights = ["h-[600px]", "h-[800px]", "h-[500px]", "h-[700px]", "h-[550px]", "h-[850px]"];

  return (
    <div className="flex flex-col min-h-screen">
      {/* SECTION 1 — HERO */}
      <section className="relative w-full h-screen overflow-hidden bg-[var(--color-onyx)]">
        {heroImage && (
          <Image 
            src={heroImage} 
            alt="Dressed for the moment"
            fill
            className="object-cover opacity-80"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-espresso)]/60 to-transparent bottom-0 h-1/5 top-auto pointer-events-none" />
        
        {/* Top Right Label */}
        <div className="absolute top-28 right-8 z-10">
          <span className="font-sans text-[var(--color-ivory)] uppercase text-sm tracking-widest drop-shadow-md">
            SS26 COLLECTION
          </span>
        </div>

        {/* Bottom Left Content */}
        <div className="absolute bottom-16 left-8 z-10 max-w-2xl">
          <h1 className="font-serif text-[clamp(4rem,8vw,8rem)] leading-[0.9] text-white mb-10 text-balance tracking-tight drop-shadow-lg">
            Dressed for <span className="italic">the moment.</span>
          </h1>
          <div className="flex gap-4">
            <Link href="/shop">
              <Button variant="default">SHOP NOW</Button>
            </Link>
            <Link href="/lookbook">
              <Button variant="secondary">VIEW LOOKBOOK</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2 — CAMPAIGN DROP BAND */}
      {campaigns[0] && (
        <section className="w-full bg-[var(--color-onyx)] h-[108px] hidden md:flex items-center justify-between px-8 text-[var(--color-ivory)] border-y border-[var(--color-espresso)]">
          <div className="flex-1">
            <h2 className="font-serif text-3xl">
              {campaigns[0].title} — <span className="italic text-[var(--color-amber)]">DROP</span>
            </h2>
          </div>
          
          <div className="flex-1">
            <Countdown />
          </div>

          <div className="flex-1 flex justify-end gap-6 items-center">
            <Link href="/campaigns">
              <Button variant="ghost" className="pr-0 font-sans uppercase tracking-widest text-xs">All Campaigns</Button>
            </Link>
            <Link href={`/campaigns/${campaigns[0].id}`}>
              <Button variant="ghost" className="pr-0 font-sans uppercase tracking-widest text-xs text-[var(--color-amber)]">View Drop →</Button>
            </Link>
          </div>
        </section>
      )}

      {/* SECTION 3 — NEW ARRIVALS */}
      <section className="w-full max-w-[1600px] mx-auto px-8 py-24">
        <h3 className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-sm mb-12">
          NEW ARRIVALS
        </h3>
        
        {/* Asymmetric Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {newArrivals.map((item, idx) => {
            const primaryImage = resolveApiImageUrl(item.image_urls?.[0]);
            const secondaryImage = resolveApiImageUrl(item.image_urls?.[1] ?? item.image_urls?.[0]);
            
            return (
              <div key={item.id} className="break-inside-avoid relative group mb-8">
                <Link href={`/shop/${item.id}`} className="block">
                  <div className={`relative w-full ${heights[idx % heights.length]} bg-[var(--color-parchment)] overflow-hidden`}>
                    {primaryImage && (
                      <Image src={primaryImage} alt={item.name} fill className="object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0" />
                    )}
                    {secondaryImage && (
                      <Image src={secondaryImage} alt={item.name} fill className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" />
                    )}
                    
                    {/* Quick Add Strip */}
                    <div className="absolute bottom-0 left-0 w-full bg-[var(--color-espresso)] text-[var(--color-ivory)] py-4 text-center font-sans uppercase text-xs tracking-widest translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                      VIEW PRODUCT
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-1">
                    <h4 className="font-serif text-[var(--color-espresso)] text-lg">{item.name}</h4>
                    <p className="font-sans text-[var(--color-amber)] uppercase text-sm tracking-widest">
                      {formatGhanaCediCompact(item.price_minor)}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4 — EDITORIAL FEATURE STRIP */}
      <section className="w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-[65%] relative h-[600px] lg:h-[800px] bg-[var(--color-parchment)]">
          {editImage && <Image src={editImage} alt="Editorial feature" fill className="object-cover" />}
        </div>
        <div className="w-full lg:w-[35%] bg-[var(--color-cream)] flex flex-col justify-center px-12 py-24 lg:p-24 border-l border-[var(--color-parchment)]">
          <span className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-sm mb-6">THE EDIT — SS26</span>
          <h2 className="font-serif text-5xl lg:text-6xl text-[var(--color-espresso)] font-bold mb-8 leading-tight">
            Pieces that outlast the season.
          </h2>
          <p className="font-sans text-[var(--color-stone)] text-lg leading-relaxed mb-12">
            We reject the transient. Every garment is architected for permanence, blending classical tailoring with the modern rhythm of Accra. This is not fast fashion; this is enduring style.
          </p>
          <Link href="/journal/ss26-edit">
            <Button variant="ghost" className="pl-0 text-left">EXPLORE THE EDIT →</Button>
          </Link>
        </div>
      </section>

      {/* SECTION 5 — THE LOOKBOOK TEASER */}
      <section className="w-full max-w-[1600px] mx-auto px-8 py-32 bg-[var(--color-cream)]">
        <h3 className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-sm mb-12">
          LOOKBOOK — SS26
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="relative w-full h-[600px] lg:h-[900px] bg-[var(--color-parchment)]">
            {lookbook1 && <Image src={lookbook1} alt="Lookbook portrait" fill className="object-cover" />}
            <div className="absolute bottom-6 left-6">
              <span className="font-sans uppercase text-[var(--color-ivory)] text-xs tracking-widest drop-shadow-md">ACCRA / DUSK</span>
            </div>
          </div>
          <div className="flex flex-col gap-8 h-full">
            <div className="relative w-full flex-1 min-h-[300px] bg-[var(--color-parchment)]">
              {lookbook2 && <Image src={lookbook2} alt="Lookbook landscape top" fill className="object-cover" />}
              <div className="absolute bottom-6 left-6">
                <span className="font-sans uppercase text-[var(--color-ivory)] text-xs tracking-widest drop-shadow-md">HARMATTAN EDIT</span>
              </div>
            </div>
            <div className="relative w-full flex-1 min-h-[300px] bg-[var(--color-parchment)]">
              {lookbook3 && <Image src={lookbook3} alt="Lookbook landscape bottom" fill className="object-cover" />}
              <div className="absolute bottom-6 left-6">
                <span className="font-sans uppercase text-[var(--color-ivory)] text-xs tracking-widest drop-shadow-md">STUDIO ARCHIVES</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/lookbook">
            <Button variant="ghost">VIEW FULL LOOKBOOK →</Button>
          </Link>
        </div>
      </section>

      {/* SECTION 6 — BRAND STORY STRIP */}
      <section className="w-full bg-[var(--color-onyx)] py-32 px-8 flex flex-col md:flex-row items-center gap-16 md:gap-32">
        <div className="flex-1 flex justify-end">
          <Image src="/logo.png" alt="Phasion Sense Logo" width={120} height={120} className="object-contain" />
        </div>
        <div className="flex-1 max-w-xl">
          <h2 className="font-serif italic text-[var(--color-ivory)] font-light text-5xl mb-8">
            Mind Your Wears.
          </h2>
          <p className="font-sans text-[var(--color-stone)] text-lg leading-relaxed mb-10">
            Born in the vibrant heart of Accra, Phasion Sense is a dialogue between heritage and avant-garde. We construct pieces that empower the wearer, prioritizing form, drape, and absolute intent.
          </p>
          <Link href="/about">
            <Button className="bg-transparent border border-[var(--color-amber)] text-[var(--color-ivory)] hover:bg-[var(--color-amber)]">OUR STORY</Button>
          </Link>
        </div>
      </section>

      {/* SECTION 7 — FEATURED CAMPAIGN EDITORIAL */}
      {campaigns[0] ? (
        <section className="w-full flex flex-col lg:flex-row border-y border-[var(--color-parchment)]">
          <div className="w-full lg:w-1/2 relative h-[600px] lg:h-[800px] bg-[var(--color-parchment)] overflow-hidden group">
            {campaignDropImage && (
              <Image
                src={campaignDropImage}
                alt={campaigns[0].title}
                fill
                sizes="50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
          </div>
          <div className="w-full lg:w-1/2 bg-[var(--color-cream)] flex flex-col justify-center px-12 py-24 lg:p-32">
            <span className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-sm mb-6">FEATURED CAMPAIGN</span>
            <h2 className="font-serif text-[var(--color-espresso)] font-bold text-5xl lg:text-7xl mb-4 leading-tight">
              {campaigns[0].title}
            </h2>
            {campaigns[0].copy_text && (
              <p className="font-sans text-[var(--color-stone)] text-lg leading-relaxed mb-12 max-w-md">
                {campaigns[0].copy_text}
              </p>
            )}
            <div className="flex flex-col gap-4">
              <Link href={`/campaigns/${campaigns[0].id}`}>
                <Button variant="default" className="w-fit font-sans uppercase tracking-widest">SHOP THE DROP</Button>
              </Link>
              <Link href="/campaigns">
                <Button variant="ghost" className="w-fit pl-0 font-sans uppercase tracking-widest text-xs">View All Campaigns →</Button>
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="w-full flex flex-col lg:flex-row border-y border-[var(--color-parchment)]">
          <div className="w-full lg:w-1/2 relative h-[600px] lg:h-[800px] bg-[var(--color-parchment)]">
            {campaignDropImage && <Image src={campaignDropImage} alt="Campaign" fill sizes="50vw" className="object-cover" />}
          </div>
          <div className="w-full lg:w-1/2 bg-[var(--color-cream)] flex flex-col justify-center px-12 py-24 lg:p-32">
            <span className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-sm mb-6">CAMPAIGN</span>
            <h2 className="font-serif text-[var(--color-espresso)] font-bold text-5xl lg:text-7xl mb-4">Coming Soon.</h2>
            <p className="font-sans text-[var(--color-stone)] text-lg leading-relaxed mb-12 max-w-md">
              Something new is in the works. Stay close.
            </p>
            <Link href="/campaigns">
              <Button variant="default" className="w-fit font-sans uppercase tracking-widest">VIEW CAMPAIGNS</Button>
            </Link>
          </div>
        </section>
      )}

      {/* SECTION 8 — INSTAGRAM / COMMUNITY GRID */}
      <section className="w-full bg-[var(--color-cream)] pt-32 pb-24">
        <div className="max-w-[1600px] mx-auto px-8 mb-12">
          <h3 className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-sm mb-2">WEAR IT YOUR WAY</h3>
          <p className="font-serif italic text-[var(--color-espresso)] text-xl">Tagged in the wild. #PhasionSense</p>
        </div>
        
        {/* Flush mosaic grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 w-full">
          {items.slice(6, 12).map((item) => {
            const img = resolveApiImageUrl(item.image_urls?.[0]);
            if (!img) return null;
            return (
              <div key={item.id} className="relative aspect-square overflow-hidden group cursor-pointer border-[0.5px] border-[var(--color-parchment)]">
                <Image src={img} alt="Community" fill className="object-cover" />
                <div className="absolute inset-0 border-0 border-[var(--color-amber)] transition-all duration-300 group-hover:border-4" />
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="font-sans text-[var(--color-stone)] hover:text-[var(--color-amber)] transition-colors">
            @phasionsense
          </a>
        </div>
      </section>

      {/* SECTION 9 — NEWSLETTER STRIP */}
      <section className="w-full bg-[var(--color-cream)] py-32 px-8 border-t border-[var(--color-parchment)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-[var(--color-espresso)] font-bold text-4xl lg:text-5xl mb-4">First to know. Always.</h2>
          <p className="font-sans text-[var(--color-stone)] text-lg mb-12">
            New drops, exclusive edits, and the occasional secret.
          </p>
          
          <NewsletterForm />
          
          <p className="font-sans text-[var(--color-stone)] text-xs tracking-wide">
            No noise. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}