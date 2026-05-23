"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { resolveApiImageUrl } from "@/lib/image";
import { formatGhanaCediCompact } from "@/lib/format";
import type { ItemResponse } from "@/lib/commerce";

type Props = {
  item: ItemResponse;
  fallbackCompleteTheLook: ItemResponse[];
  youMayAlsoLike: ItemResponse[];
};

export function ProductDetailClient({ item, fallbackCompleteTheLook, youMayAlsoLike }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>("DETAILS");
  const [activeImage, setActiveImage] = useState(0);
  const addItem = useCartStore((s) => s.addItem);

  // AI-powered Complete The Look states
  const [completeTheLook, setCompleteTheLook] = useState<ItemResponse[]>(fallbackCompleteTheLook);
  const [aiReasoning, setAiReasoning] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(true);

  const images = (item.image_urls ?? []).map((url) => resolveApiImageUrl(url)).filter(Boolean) as string[];

  const toggleAccordion = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const handleAddToCart = () => {
    addItem(item, 1, selectedSize ?? "One size");
  };

  // Load Gemini-curated look on mount/change
  useEffect(() => {
    let active = true;
    setIsLoadingAi(true);
    setAiReasoning(null);
    // Instantly reset to fallback on item change so the user doesn't see old items
    setCompleteTheLook(fallbackCompleteTheLook);

    const fetchAiCuration = async () => {
      try {
        const res = await fetch("/api/phasion-ai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            feature: "complete-the-look",
            currentProduct: item,
          }),
        });

        if (!res.ok) {
          throw new Error(`Curation error: ${res.status}`);
        }

        const data = await res.json();
        
        if (active) {
          if (data.products && data.products.length > 0) {
            setCompleteTheLook(data.products);
            setAiReasoning(data.reasoning);
          }
        }
      } catch (err) {
        console.error("Error getting Complete The Look recommendations:", err);
        // Fail gracefully, keeping the standard fallbackCompleteTheLook
      } finally {
        if (active) {
          setIsLoadingAi(false);
        }
      }
    };

    fetchAiCuration();

    return () => {
      active = false;
    };
  }, [item.id, fallbackCompleteTheLook]);

  return (
    <div className="flex flex-col min-h-screen pt-[100px] bg-[var(--color-cream)]">
      
      {/* Breadcrumb */}
      <div className="w-full max-w-[1600px] mx-auto px-8 mb-8">
        <span className="font-sans uppercase text-[var(--color-stone)] text-[10px] tracking-widest">
          <Link href="/shop" className="hover:text-[var(--color-amber)] transition-colors">SHOP</Link> / {item.name.toUpperCase()}
        </span>
      </div>

      {/* 60 / 40 Layout */}
      <section className="w-full max-w-[1600px] mx-auto px-8 flex flex-col lg:flex-row gap-16 mb-32">
        
        {/* LEFT COLUMN (60%) */}
        <div className="w-full lg:w-[60%] flex flex-col gap-4">
          <div className="relative w-full aspect-[3/4] bg-[var(--color-parchment)]">
            {images[activeImage] && (
              <Image 
                src={images[activeImage]} 
                alt={item.name} 
                fill 
                className="object-cover" 
                priority
              />
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-24 aspect-[3/4] flex-shrink-0 border-2 transition-all ${activeImage === idx ? 'border-[var(--color-amber)]' : 'border-[var(--color-parchment)] hover:border-[var(--color-stone)]'}`}
                >
                  <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN (40%) */}
        <div className="w-full lg:w-[40%] flex flex-col">
          <h1 className="font-serif text-[var(--color-espresso)] font-bold text-4xl lg:text-5xl leading-tight mb-4">
            {item.name}
          </h1>
          <p className="font-sans text-[var(--color-amber)] uppercase tracking-widest text-lg mb-8">
            {formatGhanaCediCompact(item.price_minor)}
          </p>
          
          <div className="w-full h-[1px] bg-[var(--color-parchment)] mb-8" />
          
          {item.description && (
            <p className="font-sans text-[var(--color-stone)] leading-[1.8] mb-8">
              {item.description}
            </p>
          )}

          {!item.in_stock && (
            <p className="font-sans uppercase text-red-600 text-xs tracking-widest mb-6 border border-red-200 bg-red-50 py-2 px-4 inline-block">
              SOLD OUT
            </p>
          )}

          <div className="flex justify-between items-end mb-4">
            <span className="font-sans uppercase text-[var(--color-espresso)] text-xs tracking-widest font-bold">SIZE</span>
            <button className="font-sans uppercase text-[var(--color-amber)] text-[10px] tracking-widest hover:underline">
              SIZE GUIDE
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-10">
            {["S", "M", "L", "XL"].map((size) => {
              const isSelected = selectedSize === size;
              
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 font-sans uppercase text-sm border transition-colors ${
                    isSelected
                      ? "bg-[var(--color-espresso)] text-[var(--color-ivory)] border-[var(--color-espresso)]"
                      : "bg-white border-[var(--color-parchment)] text-[var(--color-espresso)] hover:border-[var(--color-espresso)]"
                  } rounded-none`}
                >
                  {size}
                </button>
              );
            })}
          </div>

          <Button 
            className="w-full mb-6" 
            disabled={!item.in_stock}
            onClick={handleAddToCart}
          >
            {item.in_stock ? "ADD TO CART" : "SOLD OUT"}
          </Button>
          
          <button className="text-center font-sans uppercase text-[var(--color-stone)] text-xs tracking-widest hover:text-[var(--color-amber)] transition-colors">
            ADD TO WISHLIST
          </button>

          {/* Accordions */}
          <div className="mt-16 border-t border-[var(--color-parchment)]">
            {[
              { id: "DETAILS", content: item.description ?? "No additional details." },
              { id: "CARE & MATERIALS", content: "Dry clean only. Do not tumble dry. Store on a wide, shaped hanger to maintain structure." },
              { id: "SHIPPING & RETURNS", content: "Complimentary delivery within Accra. International shipping calculated at checkout. Returns accepted within 14 days of delivery, provided the garment is unworn and tags remain attached." }
            ].map((acc) => (
              <div key={acc.id} className="border-b border-[var(--color-parchment)]">
                <button 
                  onClick={() => toggleAccordion(acc.id)}
                  className="w-full flex justify-between items-center py-6 focus:outline-none"
                >
                  <span className="font-sans uppercase text-[var(--color-espresso)] text-sm tracking-widest font-bold">
                    {acc.id}
                  </span>
                  <span className="font-sans text-[var(--color-espresso)] text-lg">
                    {expandedSection === acc.id ? "−" : "+"}
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${expandedSection === acc.id ? "max-h-48 pb-6 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="font-sans text-[var(--color-stone)] leading-relaxed text-sm">
                    {acc.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* COMPLETE THE LOOK */}
      {completeTheLook.length > 0 && (
        <section className="w-full bg-[var(--color-cream)] py-24 border-t border-[var(--color-parchment)] overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-8 mb-10 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-sm">COMPLETE THE LOOK</h3>
                {isLoadingAi ? (
                  <span className="flex items-center gap-1.5 font-sans text-[10px] text-[var(--color-amber)] uppercase tracking-widest font-bold">
                    <span className="w-1.5 h-1.5 bg-[var(--color-amber)] rounded-full animate-ping" />
                    Styling by PhasionAI...
                  </span>
                ) : (
                  <span className="font-sans text-[10px] text-green-600 uppercase tracking-widest font-bold flex items-center gap-1">
                    ✓ AI Styled
                  </span>
                )}
              </div>
              <p className="font-serif italic text-[var(--color-espresso)] text-2xl mt-1">Complementary styling suggestions.</p>
            </div>
          </div>
          
          {/* AI Styling Reasoning Note */}
          {aiReasoning && (
            <div className="max-w-[1600px] mx-auto px-8 mb-10">
              <div className="max-w-[800px] bg-white border-l-2 border-[var(--color-amber)] p-5 shadow-sm">
                <span className="font-sans text-[9px] tracking-widest uppercase font-bold text-[var(--color-amber)] block mb-1">Stylist Curation Note</span>
                <p className="font-serif italic text-sm text-[var(--color-espresso)] leading-relaxed">"{aiReasoning}"</p>
              </div>
            </div>
          )}

          {/* Horizontal scroll row */}
          <div className="max-w-[1600px] mx-auto px-8 flex gap-8 overflow-x-auto pb-8 snap-x">
            {completeTheLook.map((rec) => {
              const img = resolveApiImageUrl(rec.image_urls?.[0]);
              return (
                <div key={rec.id} className="min-w-[300px] md:min-w-[400px] snap-start relative group">
                  <Link href={`/shop/${rec.id}`}>
                    <div className="relative w-full aspect-[3/4] bg-[var(--color-parchment)] overflow-hidden mb-4">
                      {img && <Image src={img} alt={rec.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="font-serif text-[var(--color-espresso)] text-lg">{rec.name}</h4>
                      <p className="font-sans text-[var(--color-amber)] uppercase text-sm tracking-widest">{formatGhanaCediCompact(rec.price_minor)}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* YOU MAY ALSO LIKE */}
      {youMayAlsoLike.length > 0 && (
        <section className="w-full max-w-[1600px] mx-auto px-8 py-24 border-t border-[var(--color-parchment)]">
          <h3 className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-sm mb-12">
            YOU MAY ALSO LIKE
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {youMayAlsoLike.map((rec) => {
              const img = resolveApiImageUrl(rec.image_urls?.[0]);
              return (
                <div key={rec.id} className="relative group">
                  <Link href={`/shop/${rec.id}`}>
                    <div className="relative w-full aspect-[3/4] bg-[var(--color-parchment)] overflow-hidden mb-4">
                      {img && <Image src={img} alt={rec.name} fill className="object-cover transition-opacity duration-500 group-hover:opacity-80" />}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="font-serif text-[var(--color-espresso)] text-lg">{rec.name}</h4>
                      <p className="font-sans text-[var(--color-amber)] uppercase text-sm tracking-widest">{formatGhanaCediCompact(rec.price_minor)}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
}
