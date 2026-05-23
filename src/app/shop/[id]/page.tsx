"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>("DETAILS");

  const images = [
    "https://images.unsplash.com/photo-1544441893-675973e31985?w=1200&q=80",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1200&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
    "https://images.unsplash.com/photo-1505322022379-7c3353ee6291?w=1200&q=80",
  ];

  const [activeImage, setActiveImage] = useState(0);

  const toggleAccordion = (section: string) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  return (
    <div className="flex flex-col min-h-screen pt-[100px] bg-[var(--color-cream)]">
      
      {/* Breadcrumb */}
      <div className="w-full max-w-[1600px] mx-auto px-8 mb-8">
        <span className="font-sans uppercase text-[var(--color-stone)] text-[10px] tracking-widest">
          <Link href="/shop" className="hover:text-[var(--color-amber)] transition-colors">SHOP</Link> / OUTERWEAR / THE ONYX DRAPE COAT
        </span>
      </div>

      {/* 60 / 40 Layout */}
      <section className="w-full max-w-[1600px] mx-auto px-8 flex flex-col lg:flex-row gap-16 mb-32">
        
        {/* LEFT COLUMN (60%) */}
        <div className="w-full lg:w-[60%] flex flex-col gap-4">
          <div className="relative w-full aspect-[3/4] bg-[var(--color-parchment)]">
            <Image 
              src={images[activeImage]} 
              alt="The Onyx Drape Coat" 
              fill 
              className="object-cover" 
              priority
            />
          </div>
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
        </div>

        {/* RIGHT COLUMN (40%) */}
        <div className="w-full lg:w-[40%] flex flex-col">
          <span className="font-sans uppercase text-[var(--color-stone)] text-xs tracking-widest mb-4">OUTERWEAR</span>
          <h1 className="font-serif text-[var(--color-espresso)] font-bold text-4xl lg:text-5xl leading-tight mb-4">
            The Onyx Drape Coat
          </h1>
          <p className="font-sans text-[var(--color-amber)] uppercase tracking-widest text-lg mb-8">GH₵ 1,240</p>
          
          <div className="w-full h-[1px] bg-[var(--color-parchment)] mb-8" />
          
          <p className="font-sans text-[var(--color-stone)] leading-[1.8] mb-8">
            An exploration in stark, unbroken lines. This coat features an oversized, dramatic drape that maintains architectural integrity through its heavy wool blend. Designed to envelop the wearer, creating a silhouette that is simultaneously imposing and deeply intimate.
          </p>

          <p className="font-sans uppercase text-[var(--color-stone)] text-[10px] tracking-widest mb-6">
            100% WOOL BLEND — LINED
          </p>

          <div className="flex justify-between items-end mb-4">
            <span className="font-sans uppercase text-[var(--color-espresso)] text-xs tracking-widest font-bold">SIZE</span>
            <button className="font-sans uppercase text-[var(--color-amber)] text-[10px] tracking-widest hover:underline">
              SIZE GUIDE
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-10">
            {["S", "M", "L", "XL"].map((size) => {
              const isSelected = selectedSize === size;
              const isOut = size === "XL"; // Demo out of stock
              
              return (
                <button
                  key={size}
                  disabled={isOut}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 font-sans uppercase text-sm border transition-colors ${
                    isOut 
                      ? "border-[var(--color-parchment)] text-[var(--color-parchment)] line-through cursor-not-allowed bg-[var(--color-cream)]" 
                      : isSelected
                        ? "bg-[var(--color-espresso)] text-[var(--color-ivory)] border-[var(--color-espresso)]"
                        : "bg-white border-[var(--color-parchment)] text-[var(--color-espresso)] hover:border-[var(--color-espresso)]"
                  } rounded-none`}
                >
                  {size}
                </button>
              );
            })}
          </div>

          <Button className="w-full mb-6">ADD TO CART</Button>
          
          <button className="text-center font-sans uppercase text-[var(--color-stone)] text-xs tracking-widest hover:text-[var(--color-amber)] transition-colors">
            ADD TO WISHLIST
          </button>

          {/* Accordions */}
          <div className="mt-16 border-t border-[var(--color-parchment)]">
            {[
              { id: "DETAILS", content: "Oversized fit. Dropped shoulders. Unstructured body. Features two deep welt pockets and a concealed front placket. The lining is a breathable viscose blend suitable for transitional weather." },
              { id: "CARE & MATERIALS", content: "Outer: 80% Wool, 20% Polyamide. Lining: 100% Viscose. Dry clean only. Do not tumble dry. Store on a wide, shaped hanger to maintain shoulder structure." },
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
      <section className="w-full bg-[var(--color-cream)] py-24 border-t border-[var(--color-parchment)] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 mb-12 flex items-end justify-between">
          <div>
            <h3 className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-sm mb-2">COMPLETE THE LOOK</h3>
            <p className="font-serif italic text-[var(--color-espresso)] text-2xl">Styled with this piece.</p>
          </div>
        </div>
        
        {/* Horizontal scroll row */}
        <div className="max-w-[1600px] mx-auto px-8 flex gap-8 overflow-x-auto pb-8 snap-x">
          {[
            { name: "Onyx Knit Mockneck", price: "GH₵ 480", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80" },
            { name: "Structured Noir Trousers", price: "GH₵ 890", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80" },
            { name: "The Accra Trench", price: "GH₵ 2,200", img: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80" },
            { name: "Amber Silk Trousers", price: "GH₵ 1,100", img: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=600&q=80" },
          ].map((item, idx) => (
            <div key={idx} className="min-w-[300px] md:min-w-[400px] snap-start relative group">
              <Link href={`/shop/${idx + 10}`}>
                <div className="relative w-full aspect-[3/4] bg-[var(--color-parchment)] overflow-hidden mb-4">
                  <Image src={item.img} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-serif text-[var(--color-espresso)] text-lg">{item.name}</h4>
                  <p className="font-sans text-[var(--color-amber)] uppercase text-sm tracking-widest">{item.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* YOU MAY ALSO LIKE */}
      <section className="w-full max-w-[1600px] mx-auto px-8 py-24 border-t border-[var(--color-parchment)]">
        <h3 className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-sm mb-12">
          YOU MAY ALSO LIKE
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
             { name: "Ivory Silk Blouse", price: "GH₵ 650", img: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&q=80" },
             { name: "Amber Pleated Skirt", price: "GH₵ 720", img: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=600&q=80" },
             { name: "Harmattan Linen Shirt", price: "GH₵ 540", img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80" },
             { name: "Stone Minimalist Dress", price: "GH₵ 1,150", img: "https://images.unsplash.com/photo-1583391733958-d1501eq4d628?w=600&q=80" },
          ].map((item, idx) => (
            <div key={idx} className="relative group">
              <Link href={`/shop/${idx + 20}`}>
                <div className="relative w-full aspect-[3/4] bg-[var(--color-parchment)] overflow-hidden mb-4">
                  <Image src={item.img} alt={item.name} fill className="object-cover transition-opacity duration-500 group-hover:opacity-80" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-serif text-[var(--color-espresso)] text-lg">{item.name}</h4>
                  <p className="font-sans text-[var(--color-amber)] uppercase text-sm tracking-widest">{item.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
