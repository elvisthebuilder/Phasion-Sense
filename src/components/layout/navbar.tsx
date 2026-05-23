"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const itemCount = useCartStore((s: ReturnType<typeof useCartStore.getState>) => s.getItemCount());
  const openDrawer = useCartStore((s: ReturnType<typeof useCartStore.getState>) => s.openDrawer);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-in-out px-8 py-6",
        isScrolled ? "bg-[var(--color-cream)] border-b border-[var(--color-parchment)]" : "bg-transparent"
      )}
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="Phasion Sense Logo" 
            width={48} 
            height={48} 
            className="w-12 h-12 object-contain"
            priority
          />
        </Link>

        {/* Right: Links & Cart */}
        <nav className="flex items-center gap-8">
          <Link
            href="/shop"
            className={cn(
              "text-sm font-sans font-medium uppercase tracking-widest relative group",
              isScrolled ? "text-[var(--color-stone)] hover:text-[var(--color-espresso)]" : "text-[var(--color-ivory)] opacity-90 hover:opacity-100"
            )}
          >
            Shop
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-amber)] transition-all group-hover:w-full" />
          </Link>
          <Link
            href="/lookbook"
            className={cn(
              "text-sm font-sans font-medium uppercase tracking-widest relative group",
              isScrolled ? "text-[var(--color-stone)] hover:text-[var(--color-espresso)]" : "text-[var(--color-ivory)] opacity-90 hover:opacity-100"
            )}
          >
            Lookbook
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-amber)] transition-all group-hover:w-full" />
          </Link>
          <Link
            href="/campaigns"
            className={cn(
              "text-sm font-sans font-medium uppercase tracking-widest relative group",
              isScrolled ? "text-[var(--color-stone)] hover:text-[var(--color-espresso)]" : "text-[var(--color-ivory)] opacity-90 hover:opacity-100"
            )}
          >
            Campaigns
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-amber)] transition-all group-hover:w-full" />
          </Link>

          {/* Cart Icon */}
          <button onClick={openDrawer} className="relative ml-4 flex items-center justify-center group">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              className={cn(
                "w-6 h-6 transition-colors",
                isScrolled ? "text-[var(--color-espresso)]" : "text-[var(--color-ivory)]"
              )}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[var(--color-amber)] text-[var(--color-surface)] text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
