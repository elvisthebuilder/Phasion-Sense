import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getMerchantItems } from "@/lib/commerce";
import { resolveApiImageUrl } from "@/lib/image";
import { formatGhanaCediCompact } from "@/lib/format";

export default async function ShopPage() {
  const items = await getMerchantItems().catch(() => []);
  const part1 = items.slice(0, 6);
  const part2 = items.slice(6);

  const heights = ["h-[800px]", "h-[600px]", "h-[750px]", "h-[650px]", "h-[850px]", "h-[550px]"];

  return (
    <div className="flex flex-col min-h-screen pt-[84px]"> {/* Offset for navbar */}
      
      {/* HERO SECTION */}
      <section className="relative w-full h-[40vh] overflow-hidden bg-[var(--color-onyx)]">
        {items[0] && resolveApiImageUrl(items[0].image_urls?.[0]) && (
          <Image 
            src={resolveApiImageUrl(items[0].image_urls?.[0])!} 
            alt="The Collection"
            fill
            className="object-cover opacity-80"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-espresso)]/40 to-transparent bottom-0 h-[30%] top-auto pointer-events-none" />
        
        <div className="absolute top-6 left-8 z-10">
          <span className="font-sans text-[var(--color-ivory)] uppercase text-xs tracking-widest drop-shadow-md">
            SS26 — {items.length} PIECES
          </span>
        </div>

        <div className="absolute bottom-8 left-8 z-10">
          <h1 className="font-serif text-[clamp(3rem,6vw,5rem)] text-white font-bold tracking-tight drop-shadow-lg">
            The Collection
          </h1>
        </div>
      </section>

      {/* CONTENT BELOW HERO */}
      <section className="w-full max-w-[1600px] mx-auto px-8 py-16">
        
        {/* Natural Language Search Bar */}
        <div className="w-full max-w-[600px] mx-auto mb-16 relative">
          <input 
            type="text" 
            placeholder="Try 'something dark and formal under GH₵500'..."
            className="w-full bg-white border border-[var(--color-parchment)] py-4 px-6 pr-12 font-sans text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-amber)] transition-colors rounded-none"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-stone)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="w-full flex justify-center gap-8 border-b border-[var(--color-parchment)] pb-6 mb-16 overflow-x-auto">
          {["ALL", "TOPS", "BOTTOMS", "OUTERWEAR", "DRESSES", "ACCESSORIES"].map((filter, idx) => (
            <button 
              key={filter}
              className={`font-sans uppercase text-sm tracking-widest whitespace-nowrap transition-colors relative group ${idx === 0 ? "text-[var(--color-espresso)] font-bold" : "text-[var(--color-stone)] hover:text-[var(--color-espresso)]"}`}
            >
              {filter}
              <span className={`absolute -bottom-6 left-0 h-[2px] bg-[var(--color-amber)] transition-all ${idx === 0 ? "w-full" : "w-0 group-hover:w-full"}`} />
            </button>
          ))}
        </div>

        {/* PRODUCT GRID - Part 1 */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 mb-24">
          {part1.map((item, idx) => {
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

      {/* EDITORIAL INTERRUPTER */}
      <section className="w-full bg-[var(--color-cream)] py-32 border-y border-[var(--color-parchment)] my-8">
        <div className="max-w-[1600px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-sm md:flex-1">THE EDIT</span>
          <h2 className="font-serif italic text-[var(--color-espresso)] text-4xl md:text-5xl lg:text-6xl md:flex-2 text-center md:text-right">
            Pieces worth the pause.
          </h2>
        </div>
      </section>

      {/* PRODUCT GRID - Part 2 (Infinite Scroll Simulation) */}
      {part2.length > 0 && (
        <section className="w-full max-w-[1600px] mx-auto px-8 py-16 mb-24">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 mb-16">
            {part2.map((item, idx) => {
              const primaryImage = resolveApiImageUrl(item.image_urls?.[0]);
              const secondaryImage = resolveApiImageUrl(item.image_urls?.[1] ?? item.image_urls?.[0]);
              
              return (
                <div key={item.id} className="break-inside-avoid relative group mb-8">
                  <Link href={`/shop/${item.id}`} className="block">
                    <div className={`relative w-full ${heights[(idx + 2) % heights.length]} bg-[var(--color-parchment)] overflow-hidden`}>
                      {primaryImage && (
                        <Image src={primaryImage} alt={item.name} fill className="object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0" />
                      )}
                      {secondaryImage && (
                        <Image src={secondaryImage} alt={item.name} fill className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" />
                      )}
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

          <div className="w-full text-center py-12">
            <span className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-sm">
              End of collection.
            </span>
          </div>
        </section>
      )}

    </div>
  );
}
