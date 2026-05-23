"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ hrs: 2, mins: 14, secs: 33 });

  // Simple countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hrs, mins, secs } = prev;
        secs--;
        if (secs < 0) {
          secs = 59;
          mins--;
          if (mins < 0) {
            mins = 59;
            hrs--;
            if (hrs < 0) {
              clearInterval(timer);
              return { hrs: 0, mins: 0, secs: 0 };
            }
          }
        }
        return { hrs, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* SECTION 1 — HERO */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Placeholder image for hero */}
        <Image 
          src="https://images.unsplash.com/photo-1550614000-4b95d466f296?w=2000&q=80" 
          alt="Dressed for the moment"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-espresso)]/60 to-transparent bottom-0 h-1/5 top-auto pointer-events-none" />
        
        {/* Top Right Label */}
        <div className="absolute top-28 right-8 z-10">
          <span className="font-sans text-[var(--color-ivory)] uppercase text-sm tracking-widest">
            SS26 COLLECTION
          </span>
        </div>

        {/* Bottom Left Content */}
        <div className="absolute bottom-16 left-8 z-10 max-w-2xl">
          <h1 className="font-serif text-[clamp(4rem,8vw,8rem)] leading-[0.9] text-white mb-10 text-balance tracking-tight">
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
      <section className="w-full bg-[var(--color-onyx)] h-[108px] flex items-center justify-between px-8 text-[var(--color-ivory)] border-y border-[var(--color-espresso)]">
        <div className="flex-1">
          <h2 className="font-serif text-3xl">
            The Noir Drop — <span className="italic text-[var(--color-amber)]">SS26</span>
          </h2>
        </div>
        
        <div className="flex-1 flex justify-center items-center gap-6">
          <div className="flex flex-col items-center">
            <span className="font-serif text-5xl text-[var(--color-amber)] leading-none">{String(timeLeft.hrs).padStart(2, '0')}</span>
            <span className="font-sans uppercase text-[10px] tracking-widest mt-1">HRS</span>
          </div>
          <span className="font-serif text-4xl text-[var(--color-amber)] mb-4">:</span>
          <div className="flex flex-col items-center">
            <span className="font-serif text-5xl text-[var(--color-amber)] leading-none">{String(timeLeft.mins).padStart(2, '0')}</span>
            <span className="font-sans uppercase text-[10px] tracking-widest mt-1">MIN</span>
          </div>
          <span className="font-serif text-4xl text-[var(--color-amber)] mb-4">:</span>
          <div className="flex flex-col items-center">
            <span className="font-serif text-5xl text-[var(--color-amber)] leading-none">{String(timeLeft.secs).padStart(2, '0')}</span>
            <span className="font-sans uppercase text-[10px] tracking-widest mt-1">SEC</span>
          </div>
        </div>

        <div className="flex-1 flex justify-end">
          <Link href="/campaigns/noir">
            <Button variant="ghost" className="pr-0">View Drop →</Button>
          </Link>
        </div>
      </section>

      {/* SECTION 3 — NEW ARRIVALS */}
      <section className="w-full max-w-[1600px] mx-auto px-8 py-24">
        <h3 className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-sm mb-12">
          NEW ARRIVALS
        </h3>
        
        {/* Asymmetric Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {[
            { id: 1, name: "The Ivory Drape Shirt", price: "GH₵ 850", img1: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&q=80", img2: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80", height: "h-[600px]" },
            { id: 2, name: "Structured Onyx Blazer", price: "GH₵ 1,400", img1: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80", img2: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=600&q=80", height: "h-[800px]" },
            { id: 3, name: "Amber Silk Trousers", price: "GH₵ 1,100", img1: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=600&q=80", img2: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80", height: "h-[500px]" },
            { id: 4, name: "Harmattan Knit Vest", price: "GH₵ 650", img1: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80", img2: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80", height: "h-[700px]" },
            { id: 5, name: "Pleated Stone Skirt", price: "GH₵ 890", img1: "https://images.unsplash.com/photo-1583391733958-d1501eq4d628?w=600&q=80", img2: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80", height: "h-[550px]" },
            { id: 6, name: "The Accra Trench", price: "GH₵ 2,200", img1: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80", img2: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80", height: "h-[850px]" },
          ].map((item, idx) => (
            <div key={idx} className="break-inside-avoid relative group mb-8">
              <Link href={`/shop/${item.id}`} className="block">
                <div className={`relative w-full ${item.height} bg-[var(--color-parchment)] overflow-hidden`}>
                  {/* First image */}
                  <Image src={item.img1} alt={item.name} fill className="object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0" />
                  {/* Second image cross-fade */}
                  <Image src={item.img2} alt={item.name} fill className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" />
                  
                  {/* Quick Add Strip */}
                  <div className="absolute bottom-0 left-0 w-full bg-[var(--color-espresso)] text-[var(--color-ivory)] py-4 text-center font-sans uppercase text-xs tracking-widest translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                    QUICK ADD
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-1">
                  <h4 className="font-serif text-[var(--color-espresso)] text-lg">{item.name}</h4>
                  <p className="font-sans text-[var(--color-amber)] uppercase text-sm tracking-widest">{item.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — EDITORIAL FEATURE STRIP */}
      <section className="w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-[65%] relative h-[600px] lg:h-[800px]">
          <Image src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80" alt="Editorial feature" fill className="object-cover" />
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
          <div className="relative w-full h-[600px] lg:h-[900px]">
            <Image src="https://images.unsplash.com/photo-1502163140606-888448ae8cbd?w=1000&q=80" alt="Lookbook portrait" fill className="object-cover" />
            <div className="absolute bottom-6 left-6">
              <span className="font-sans uppercase text-[var(--color-ivory)] text-xs tracking-widest drop-shadow-md">ACCRA / DUSK</span>
            </div>
          </div>
          <div className="flex flex-col gap-8 h-full">
            <div className="relative w-full flex-1 min-h-[300px]">
              <Image src="https://images.unsplash.com/photo-1485230405346-71acb9518d9c?w=1000&q=80" alt="Lookbook landscape top" fill className="object-cover" />
              <div className="absolute bottom-6 left-6">
                <span className="font-sans uppercase text-[var(--color-ivory)] text-xs tracking-widest drop-shadow-md">HARMATTAN EDIT</span>
              </div>
            </div>
            <div className="relative w-full flex-1 min-h-[300px]">
              <Image src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=1000&q=80" alt="Lookbook landscape bottom" fill className="object-cover" />
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
          {/* Logo Placeholder */}
          <div className="w-[120px] h-[120px] rounded-full border-2 border-[var(--color-amber)] flex items-center justify-center text-[var(--color-amber)] font-serif font-bold text-4xl">
            GH
          </div>
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
      <section className="w-full flex flex-col lg:flex-row border-y border-[var(--color-parchment)]">
        <div className="w-full lg:w-1/2 relative h-[600px] lg:h-[800px]">
          <Image src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80" alt="The Noir Drop" fill className="object-cover" />
        </div>
        <div className="w-full lg:w-1/2 bg-[var(--color-cream)] flex flex-col justify-center px-12 py-24 lg:p-32">
          <span className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-sm mb-6">CAMPAIGN</span>
          <h2 className="font-serif text-[var(--color-espresso)] font-bold text-5xl lg:text-7xl mb-4">The Noir Drop.</h2>
          <p className="font-serif italic text-[var(--color-stone)] text-2xl lg:text-3xl mb-8">Darkness, refined.</p>
          <p className="font-sans text-[var(--color-stone)] text-lg leading-relaxed mb-12 max-w-md">
            A meticulous exploration of texture in absence of color. The Noir Drop focuses entirely on silhouette, structure, and the subtle interplay of matte and gloss.
          </p>
          <div>
            <Link href="/campaigns/noir">
              <Button variant="default" className="mb-4">SHOP THE DROP</Button>
            </Link>
            <p className="font-sans text-[var(--color-stone)] text-sm tracking-wide">Limited. 47 pieces remaining.</p>
          </div>
        </div>
      </section>

      {/* SECTION 8 — INSTAGRAM / COMMUNITY GRID */}
      <section className="w-full bg-[var(--color-cream)] pt-32 pb-24">
        <div className="max-w-[1600px] mx-auto px-8 mb-12">
          <h3 className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-sm mb-2">WEAR IT YOUR WAY</h3>
          <p className="font-serif italic text-[var(--color-espresso)] text-xl">Tagged in the wild. #PhasionSense</p>
        </div>
        
        {/* Flush mosaic grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 w-full">
          {[
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80",
            "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=600&q=80",
            "https://images.unsplash.com/photo-1505322022379-7c3353ee6291?w=600&q=80",
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
            "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
          ].map((src, idx) => (
            <div key={idx} className="relative aspect-square overflow-hidden group cursor-pointer border-[0.5px] border-[var(--color-parchment)]">
              <Image src={src} alt="Community" fill className="object-cover" />
              <div className="absolute inset-0 border-0 border-[var(--color-amber)] transition-all duration-300 group-hover:border-4" />
            </div>
          ))}
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
          
          <form className="flex w-full max-w-lg mx-auto mb-6" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 bg-white border border-[var(--color-parchment)] border-r-0 px-6 py-4 font-sans text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-amber)] transition-colors rounded-none"
              required
            />
            <Button type="submit" variant="default" className="rounded-none border border-[var(--color-amber)] h-auto py-4 px-8">
              SUBSCRIBE
            </Button>
          </form>
          
          <p className="font-sans text-[var(--color-stone)] text-xs tracking-wide">
            No noise. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}