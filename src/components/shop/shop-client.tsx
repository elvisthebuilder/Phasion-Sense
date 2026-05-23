"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { resolveApiImageUrl } from "@/lib/image";
import { formatGhanaCediCompact } from "@/lib/format";
import type { ItemResponse } from "@/lib/commerce";

// Import driver.js onboarding package
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

type Props = {
  initialItems: ItemResponse[];
};

export function ShopClient({ initialItems }: Props) {
  const [items, setItems] = useState<ItemResponse[]>(initialItems);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [aiResults, setAiResults] = useState<ItemResponse[] | null>(null);

  const heights = ["h-[800px]", "h-[600px]", "h-[750px]", "h-[650px]", "h-[850px]", "h-[550px]"];

  // Driver.js onboarding tour steps
  const tourSteps = [
    {
      element: "#shop-hero",
      popover: {
        title: "Welcome to Phasion Sense",
        description: "Explore our curated collection of premium contemporary fashion, rooted in Accra.",
        side: "bottom" as const,
        align: "start" as const
      }
    },
    {
      element: "#ai-search-form",
      popover: {
        title: "PhasionAI Semantic Search",
        description: "Looking for something specific? Search using natural language! Try typing 'something dark and formal' or 'casual weekend outfits under GH₵500' and our AI will immediately curate matching items.",
        side: "bottom" as const,
        align: "center" as const
      }
    },
    {
      element: "#category-filters",
      popover: {
        title: "Smart Filtering",
        description: "Quickly browse through individual collections: Tops, Bottoms, Outerwear, Dresses, and Accessories.",
        side: "bottom" as const,
        align: "center" as const
      }
    },
    {
      element: "#product-grid",
      popover: {
        title: "Premium Catalog",
        description: "Click on any product to see the details, or hover to view alternative styling angles and dynamic transition shots.",
        side: "top" as const,
        align: "center" as const
      }
    },
    {
      element: "#phasion-ai-trigger",
      popover: {
        title: "Meet PhasionAI Stylist",
        description: "Your floating shopping companion is available on every page! Tap this bubble to chat directly with PhasionAI for advice on styling, custom outfit combinations, and event styling guidelines.",
        side: "left" as const,
        align: "center" as const
      }
    }
  ];

  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      animate: true,
      overlayColor: "rgba(28, 20, 16, 0.75)", // Custom espresso color overlay matching theme
      steps: tourSteps,
    });
    driverObj.drive();
  };

  // Launch onboarding tour automatically for new visitors on mount
  useEffect(() => {
    const tourCompleted = localStorage.getItem("phasion_tour_completed");
    if (!tourCompleted) {
      const timer = setTimeout(() => {
        const driverObj = driver({
          showProgress: true,
          animate: true,
          overlayColor: "rgba(28, 20, 16, 0.75)",
          steps: tourSteps,
          onDestroyed: () => {
            localStorage.setItem("phasion_tour_completed", "true");
          }
        });
        driverObj.drive();
      }, 1200); // Delay slightly to ensure smooth loading and image renders
      return () => clearTimeout(timer);
    }
  }, []);

  // Category mapping
  const filterByCategory = (category: string, list: ItemResponse[]) => {
    if (category === "ALL") return list;
    
    const cat = category.toLowerCase();
    return list.filter((item) => {
      const name = item.name.toLowerCase();
      const desc = (item.description || "").toLowerCase();
      
      if (cat === "tops") {
        return name.includes("top") || name.includes("shirt") || name.includes("blouse") || name.includes("tee") || name.includes("tunic") || desc.includes("top") || desc.includes("shirt");
      }
      if (cat === "bottoms") {
        return name.includes("trouser") || name.includes("pants") || name.includes("skirt") || name.includes("short") || name.includes("jean") || desc.includes("pants") || desc.includes("skirt");
      }
      if (cat === "outerwear") {
        return name.includes("jacket") || name.includes("coat") || name.includes("blazer") || name.includes("kimono") || desc.includes("jacket") || desc.includes("blazer");
      }
      if (cat === "dresses") {
        return name.includes("dress") || name.includes("gown") || name.includes("maxi") || name.includes("midi") || desc.includes("dress") || desc.includes("gown");
      }
      if (cat === "accessories") {
        return name.includes("bag") || name.includes("belt") || name.includes("hat") || name.includes("scarf") || name.includes("jewelry") || desc.includes("bag") || desc.includes("belt");
      }
      return false;
    });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setAiExplanation(null);

    try {
      const res = await fetch("/api/phasion-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feature: "search",
          query: searchQuery,
        }),
      });

      if (!res.ok) {
        throw new Error("Search failed");
      }

      const data = await res.json();
      setAiResults(data.products || []);
      setAiExplanation(data.explanation || null);
    } catch (err) {
      console.error("Semantic search failed:", err);
      // Fallback search locally if API fails
      const query = searchQuery.toLowerCase();
      const filtered = initialItems.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          (item.description || "").toLowerCase().includes(query)
      );
      setAiResults(filtered);
      setAiExplanation("Standard keyword search fallback.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleResetSearch = () => {
    setSearchQuery("");
    setAiResults(null);
    setAiExplanation(null);
    setActiveCategory("ALL");
  };

  // Determine current active list
  const activeList = aiResults !== null ? aiResults : initialItems;
  const filteredItems = filterByCategory(activeCategory, activeList);

  const part1 = filteredItems.slice(0, 6);
  const part2 = filteredItems.slice(6);

  return (
    <div className="flex flex-col min-h-screen pt-[84px]">
      
      {/* HERO SECTION */}
      <section id="shop-hero" className="relative w-full h-[40vh] overflow-hidden bg-[var(--color-onyx)]">
        {initialItems[0] && resolveApiImageUrl(initialItems[0].image_urls?.[0]) && (
          <Image 
            src={resolveApiImageUrl(initialItems[0].image_urls?.[0])!} 
            alt="The Collection"
            fill
            className="object-cover opacity-80"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-espresso)]/40 to-transparent bottom-0 h-[30%] top-auto pointer-events-none" />
        
        <div className="absolute top-6 left-8 z-10">
          <span className="font-sans text-[var(--color-ivory)] uppercase text-xs tracking-widest drop-shadow-md">
            SS26 — {filteredItems.length} PIECES
          </span>
        </div>

        <div className="absolute bottom-8 left-8 z-10">
          <h1 className="font-serif text-[clamp(3rem,6vw,5rem)] text-white font-bold tracking-tight drop-shadow-lg">
            {aiResults !== null ? "Curated Search" : "The Collection"}
          </h1>
        </div>
      </section>

      {/* SEARCH AND FILTER AREA */}
      <section className="w-full max-w-[1600px] mx-auto px-8 py-16">
        
        {/* Natural Language Search Bar */}
        <form id="ai-search-form" onSubmit={handleSearch} className="w-full max-w-[600px] mx-auto mb-16 relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isSearching}
            placeholder={isSearching ? "PhasionAI is curation matching..." : "Try 'something dark and formal under GH₵500'..."}
            className="w-full bg-white border border-[var(--color-parchment)] py-4 px-6 pr-12 font-sans text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-amber)] transition-colors rounded-none disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={isSearching}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-stone)] hover:text-[var(--color-amber)] transition-colors p-1"
          >
            {isSearching ? (
              <div className="w-5 h-5 border-2 border-t-transparent border-[var(--color-stone)] rounded-full animate-spin" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            )}
          </button>
        </form>

        {/* AI Curated Banner */}
        {aiExplanation && (
          <div className="max-w-[800px] mx-auto mb-12 bg-white border-l-2 border-[var(--color-amber)] p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-[var(--color-amber)] block mb-1">Curated by PhasionAI</span>
              <p className="font-serif italic text-base text-[var(--color-espresso)]">{aiExplanation}</p>
            </div>
            <button 
              onClick={handleResetSearch}
              className="text-xs font-sans uppercase font-bold tracking-widest text-[var(--color-espresso)] hover:text-[var(--color-amber)] border border-[var(--color-parchment)] py-2 px-4 transition-colors"
            >
              Reset Search
            </button>
          </div>
        )}

        {/* Filter Bar */}
        <div id="category-filters" className="w-full flex justify-center gap-8 border-b border-[var(--color-parchment)] pb-6 mb-16 overflow-x-auto">
          {["ALL", "TOPS", "BOTTOMS", "OUTERWEAR", "DRESSES", "ACCESSORIES"].map((filter) => {
            const isActive = activeCategory === filter;
            return (
              <button 
                key={filter}
                onClick={() => setActiveCategory(filter)}
                className={`font-sans uppercase text-sm tracking-widest whitespace-nowrap transition-all relative group pb-1 ${isActive ? "text-[var(--color-espresso)] font-bold" : "text-[var(--color-stone)] hover:text-[var(--color-espresso)]"}`}
              >
                {filter}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-[var(--color-amber)] transition-all ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
              </button>
            );
          })}
        </div>

        {/* LOADING SKELETON */}
        {isSearching ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 mb-24">
            {[1, 2, 3].map((n) => (
              <div key={n} className="break-inside-avoid mb-8 animate-pulse bg-white p-4 border border-[var(--color-parchment)]">
                <div className="w-full h-[400px] bg-[var(--color-cream)] mb-4" />
                <div className="h-6 w-3/4 bg-[var(--color-cream)] mb-2" />
                <div className="h-4 w-1/3 bg-[var(--color-cream)]" />
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="w-full text-center py-24 border border-dashed border-[var(--color-parchment)] bg-white">
            <span className="font-serif italic text-xl text-[var(--color-stone)] block mb-4">No matching pieces found.</span>
            <button 
              onClick={handleResetSearch}
              className="font-sans uppercase tracking-widest font-bold text-sm text-[var(--color-amber)] hover:underline"
            >
              Reset Filters and Search
            </button>
          </div>
        ) : (
          <>
            {/* PRODUCT GRID - Part 1 */}
            <div id="product-grid" className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 mb-24">
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

            {/* EDITORIAL INTERRUPTER (Only show if not showing filtered results or if we have second half) */}
            {part2.length > 0 && (
              <section className="w-full bg-[var(--color-cream)] py-32 border-y border-[var(--color-parchment)] my-8">
                <div className="max-w-[1600px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
                  <span className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-sm md:flex-1">THE EDIT</span>
                  <h2 className="font-serif italic text-[var(--color-espresso)] text-4xl md:text-5xl lg:text-6xl md:flex-2 text-center md:text-right">
                    Pieces worth the pause.
                  </h2>
                </div>
              </section>
            )}

            {/* PRODUCT GRID - Part 2 */}
            {part2.length > 0 && (
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
            )}

            <div className="w-full text-center py-12">
              <span className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-sm">
                End of collection.
              </span>
            </div>
          </>
        )}
      </section>

      {/* FLOATING TOUR TRIGGER BUTTON */}
      <button 
        onClick={startTour}
        className="fixed bottom-8 left-8 bg-white border border-[var(--color-parchment)] shadow-md text-[var(--color-stone)] hover:text-[var(--color-espresso)] hover:border-[var(--color-amber)] text-[10px] font-sans font-bold uppercase tracking-widest px-4 py-3.5 z-40 transition-all rounded-none flex items-center gap-2 hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-[var(--color-amber)]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.795m-9 0L18 4.5" />
        </svg>
        Take Tour
      </button>

    </div>
  );
}
