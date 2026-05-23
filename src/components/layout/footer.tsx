import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--color-espresso)] text-[var(--color-ivory)] pt-24 pb-8 px-8 mt-auto">
      <div className="max-w-[1600px] mx-auto">
        {/* Top Row: Logo & Tagline */}
        <div className="flex flex-col items-center mb-24 text-center">
          <div className="w-16 h-16 rounded-full border border-[var(--color-amber)] flex items-center justify-center text-[var(--color-amber)] font-serif font-bold text-xl mb-6">
            GH
          </div>
          <p className="font-serif italic text-2xl tracking-wide">
            Editorial fashion, rooted in Accra.
          </p>
        </div>

        {/* Four Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 border-t border-[var(--color-onyx)] pt-16">
          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-sm mb-2">Shop</h4>
            <Link href="/shop" className="font-sans text-[var(--color-ivory)] opacity-80 hover:opacity-100 transition-opacity">New Arrivals</Link>
            <Link href="/shop" className="font-sans text-[var(--color-ivory)] opacity-80 hover:opacity-100 transition-opacity">Outerwear</Link>
            <Link href="/shop" className="font-sans text-[var(--color-ivory)] opacity-80 hover:opacity-100 transition-opacity">Tops</Link>
            <Link href="/shop" className="font-sans text-[var(--color-ivory)] opacity-80 hover:opacity-100 transition-opacity">Bottoms</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-sm mb-2">Studio</h4>
            <Link href="/lookbook" className="font-sans text-[var(--color-ivory)] opacity-80 hover:opacity-100 transition-opacity">Campaigns</Link>
            <Link href="/lookbook" className="font-sans text-[var(--color-ivory)] opacity-80 hover:opacity-100 transition-opacity">Lookbook</Link>
            <Link href="/about" className="font-sans text-[var(--color-ivory)] opacity-80 hover:opacity-100 transition-opacity">Our Story</Link>
            <Link href="/journal" className="font-sans text-[var(--color-ivory)] opacity-80 hover:opacity-100 transition-opacity">The Edit</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-sm mb-2">Help</h4>
            <Link href="/faq" className="font-sans text-[var(--color-ivory)] opacity-80 hover:opacity-100 transition-opacity">FAQ</Link>
            <Link href="/shipping" className="font-sans text-[var(--color-ivory)] opacity-80 hover:opacity-100 transition-opacity">Shipping & Returns</Link>
            <Link href="/contact" className="font-sans text-[var(--color-ivory)] opacity-80 hover:opacity-100 transition-opacity">Contact Us</Link>
            <Link href="/size-guide" className="font-sans text-[var(--color-ivory)] opacity-80 hover:opacity-100 transition-opacity">Size Guide</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-[var(--color-stone)] uppercase tracking-widest text-sm mb-2">Follow</h4>
            <a href="#" className="font-sans text-[var(--color-ivory)] opacity-80 hover:opacity-100 transition-opacity">Instagram</a>
            <a href="#" className="font-sans text-[var(--color-ivory)] opacity-80 hover:opacity-100 transition-opacity">Twitter / X</a>
            <a href="#" className="font-sans text-[var(--color-ivory)] opacity-80 hover:opacity-100 transition-opacity">Pinterest</a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-between items-center pt-6 border-t border-[var(--color-stone)]/30 bg-[var(--color-onyx)]/20 -mx-8 px-8 pb-4">
          <p className="font-sans text-[var(--color-stone)] text-xs">
            © {new Date().getFullYear()} Phasion Sense. All rights reserved.
          </p>
          <p className="font-sans text-[var(--color-stone)] text-xs">
            Accra, Ghana
          </p>
        </div>
      </div>
    </footer>
  );
}
