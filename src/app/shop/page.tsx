"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ShopPage() {
  return (
    <div className="flex flex-col min-h-screen pt-[84px]"> {/* Offset for navbar */}
      
      {/* HERO SECTION */}
      <section className="relative w-full h-[40vh] overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80" 
          alt="The Collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-espresso)]/40 to-transparent bottom-0 h-[30%] top-auto pointer-events-none" />
        
        <div className="absolute top-6 left-8 z-10">
          <span className="font-sans text-[var(--color-ivory)] uppercase text-xs tracking-widest drop-shadow-md">
            SS26 — 84 PIECES
          </span>
        </div>

        <div className="absolute bottom-8 left-8 z-10">
          <h1 className="font-serif text-[clamp(3rem,6vw,5rem)] text-white font-bold tracking-tight">
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
          {[
            { id: "1", name: "The Onyx Drape Coat", price: "GH₵ 1,240", img1: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80", img2: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80", height: "h-[800px]" },
            { id: "2", name: "Ivory Silk Blouse", price: "GH₵ 650", img1: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&q=80", img2: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80", height: "h-[600px]" },
            { id: "3", name: "Structured Noir Trousers", price: "GH₵ 890", img1: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80", img2: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=600&q=80", height: "h-[750px]" },
            { id: "4", name: "Amber Pleated Skirt", price: "GH₵ 720", img1: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=600&q=80", img2: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80", height: "h-[650px]" },
            { id: "5", name: "Harmattan Linen Shirt", price: "GH₵ 540", img1: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80", img2: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80", height: "h-[850px]" },
            { id: "6", name: "Stone Minimalist Dress", price: "GH₵ 1,150", img1: "https://images.unsplash.com/photo-1583391733958-d1501eq4d628?w=600&q=80", img2: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80", height: "h-[550px]" },
          ].map((item, idx) => (
            <div key={idx} className="break-inside-avoid relative group mb-8">
              <Link href={`/shop/${item.id}`} className="block">
                <div className={`relative w-full ${item.height} bg-[var(--color-parchment)] overflow-hidden`}>
                  <Image src={item.img1} alt={item.name} fill className="object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0" />
                  <Image src={item.img2} alt={item.name} fill className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" />
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
      <section className="w-full max-w-[1600px] mx-auto px-8 py-16 mb-24">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 mb-16">
          {[
            { id: "7", name: "Dusk Silhouette Blazer", price: "GH₵ 1,600", img1: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80", img2: "https://images.unsplash.com/photo-1505322022379-7c3353ee6291?w=600&q=80", height: "h-[800px]" },
            { id: "8", name: "Onyx Knit Mockneck", price: "GH₵ 480", img1: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80", img2: "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=600&q=80", height: "h-[550px]" },
            { id: "9", name: "Sand Asymmetric Top", price: "GH₵ 520", img1: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80", img2: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80", height: "h-[700px]" },
          ].map((item, idx) => (
            <div key={idx} className="break-inside-avoid relative group mb-8">
              <Link href={`/shop/${item.id}`} className="block">
                <div className={`relative w-full ${item.height} bg-[var(--color-parchment)] overflow-hidden`}>
                  <Image src={item.img1} alt={item.name} fill className="object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0" />
                  <Image src={item.img2} alt={item.name} fill className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" />
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

        <div className="w-full text-center py-12">
          <span className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-sm">
            Loading more...
          </span>
        </div>
      </section>

    </div>
  );
}
