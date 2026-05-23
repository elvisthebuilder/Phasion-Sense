import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getMerchantItems } from "@/lib/commerce";
import { resolveApiImageUrl } from "@/lib/image";
import { formatGhanaCediCompact } from "@/lib/format";
import { ArrowRight } from "lucide-react";

export const metadata = {
    title: "Lookbook | Phasion Sense",
    description: "Explore the latest editorial lookbook and style curation from Phasion Sense.",
};

export default async function LookbookPage() {
    const items = await getMerchantItems().catch(() => []);
    
    // We only want to show items that actually have images in the lookbook
    const visualItems = items.filter(item => item.image_urls && item.image_urls.length > 0);

    // Hero image (take the second item's image, or fallback to first)
    const heroImage = resolveApiImageUrl(visualItems[1]?.image_urls?.[0] ?? visualItems[0]?.image_urls?.[0]);

    // Asymmetric masonry heights to create an editorial feel
    const heights = [
        "h-[500px]", 
        "h-[800px]", 
        "h-[600px]", 
        "h-[900px]", 
        "h-[550px]", 
        "h-[750px]",
        "h-[650px]",
        "h-[850px]"
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[var(--color-cream)]">
            
            {/* HERO SECTION */}
            <section className="relative w-full h-[70vh] lg:h-[90vh] bg-[#1a1412] flex items-center justify-center overflow-hidden">
                {heroImage && (
                    <>
                        {/* Glow effect */}
                        <div className="absolute inset-0 pointer-events-none z-0">
                            <Image 
                                src={heroImage}
                                alt="Background glow"
                                fill
                                className="object-cover blur-[100px] opacity-60 scale-110"
                                priority
                            />
                        </div>
                        <div className="absolute inset-0 z-0">
                            <Image 
                                src={heroImage}
                                alt="Lookbook Cover"
                                fill
                                className="object-cover opacity-80"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1412] via-[#1a1412]/30 to-transparent pointer-events-none" />
                        </div>
                    </>
                )}

                <div className="relative z-10 flex flex-col items-center justify-end h-full w-full pb-20 px-8 text-center">
                    <span className="font-sans text-[var(--color-amber)] uppercase tracking-[0.3em] text-sm mb-6 drop-shadow-md">
                        Style Curation
                    </span>
                    <h1 className="font-serif text-[clamp(3.5rem,7vw,7rem)] leading-[0.9] text-white tracking-tight drop-shadow-lg">
                        The Lookbook.
                    </h1>
                </div>
            </section>

            {/* INTRO TEXT */}
            <section className="w-full max-w-4xl mx-auto px-8 py-24 text-center">
                <p className="font-serif italic text-[var(--color-espresso)] text-2xl lg:text-4xl font-light leading-relaxed">
                    "A study in form, function, and absolute intent. Every piece curated here is an intersection of heritage tailoring and the contemporary pulse of Accra."
                </p>
            </section>

            {/* MASONRY EDITORIAL GRID */}
            <section className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 pb-32">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 sm:gap-8 space-y-6 sm:space-y-8">
                    {visualItems.map((item, idx) => {
                        const primaryImage = resolveApiImageUrl(item.image_urls?.[0]);
                        if (!primaryImage) return null;

                        return (
                            <div key={item.id} className="break-inside-avoid relative group overflow-hidden bg-[var(--color-parchment)]">
                                <Link href={`/shop/${item.id}`} className="block w-full h-full">
                                    <div className={`relative w-full ${heights[idx % heights.length]} overflow-hidden`}>
                                        <Image 
                                            src={primaryImage} 
                                            alt={item.name} 
                                            fill 
                                            className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105" 
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex flex-col justify-end p-8">
                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                                                <h3 className="font-serif text-3xl text-white mb-2">{item.name}</h3>
                                                <p className="font-sans text-[var(--color-amber)] uppercase text-sm tracking-widest flex items-center gap-2">
                                                    {formatGhanaCediCompact(item.price_minor)}
                                                    <ArrowRight className="w-4 h-4" />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* NARRATIVE FOOTER */}
            <section className="w-full bg-[#1a1412] text-white py-32 px-8 text-center border-t border-white/10">
                <div className="max-w-2xl mx-auto">
                    <span className="font-sans text-[var(--color-amber)] uppercase tracking-[0.3em] text-xs mb-6 block">
                        Phasion Sense
                    </span>
                    <h2 className="font-serif text-4xl lg:text-5xl mb-8 leading-tight">
                        Built to Outlast.
                    </h2>
                    <p className="font-sans text-white/70 text-lg mb-12">
                        Explore the full catalog to find these pieces and more, designed for those who appreciate the permanence of true style.
                    </p>
                    <Link href="/shop" className="inline-flex items-center gap-3 font-sans uppercase tracking-widest text-sm text-white hover:text-[var(--color-amber)] transition-colors border-b border-white/30 hover:border-[var(--color-amber)] pb-1">
                        Open Catalog <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

        </div>
    );
}
