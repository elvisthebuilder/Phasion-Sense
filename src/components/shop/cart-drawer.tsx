"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { resolveApiImageUrl } from "@/lib/image";
import { formatGhanaCediCompact } from "@/lib/format";
import { buildWhatsAppUrl, getWhatsAppNumber } from "@/lib/whatsapp";

export function CartDrawer() {
  const {
    lines,
    drawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    getSubtotalMinor,
    getItemCount,
  } = useCartStore();

  const subtotal = getSubtotalMinor();
  const shippingThreshold = 250000; // GH₵ 2,500 in minor units
  const progress = Math.min((subtotal / shippingThreshold) * 100, 100);
  const remaining = Math.max(shippingThreshold - subtotal, 0);

  const handleCheckout = () => {
    if (lines.length === 0) return;
    
    const messageLines = lines.map(
      (line) => `- ${line.item.name} (${line.selectedSize}) x${line.quantity} — ${formatGhanaCediCompact(line.item.price_minor * line.quantity)}`
    );
    const message = [
      "Hello Phasion Sense, I would like to place this order:",
      ...messageLines,
      `Total: ${formatGhanaCediCompact(subtotal)}`,
    ].join("\n");

    const number = getWhatsAppNumber(null);
    const url = buildWhatsAppUrl(number, message);
    window.open(url, "_blank");
  };

  if (!drawerOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-[rgba(28,20,16,0.45)] z-[60]" 
        onClick={closeDrawer}
      />
      
      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-white border-l border-[var(--color-parchment)] shadow-none z-[70] flex flex-col transform transition-transform duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center p-8 border-b border-[var(--color-parchment)]">
          <h2 className="font-serif text-[var(--color-espresso)] text-3xl">
            Your Cart <span className="font-sans text-base text-[var(--color-stone)]">({getItemCount()})</span>
          </h2>
          <button onClick={closeDrawer} className="text-[var(--color-stone)] hover:text-[var(--color-amber)] text-2xl font-light">
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-8">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="font-serif italic text-[var(--color-stone)] text-xl mb-4">Your cart is empty.</p>
              <p className="font-sans text-[var(--color-stone)] text-sm">Discover something extraordinary.</p>
            </div>
          ) : (
            lines.map((line) => {
              const img = resolveApiImageUrl(line.item.image_urls?.[0]);
              return (
                <div key={`${line.item.id}-${line.selectedSize}`} className="flex gap-6 pb-6 mb-6 border-b border-[var(--color-parchment)] last:border-0 last:mb-0 last:pb-0">
                  <div className="relative w-[72px] h-[90px] bg-[var(--color-parchment)] flex-shrink-0">
                    {img && <Image src={img} alt={line.item.name} fill className="object-cover" />}
                  </div>
                  <div className="flex flex-col flex-1 justify-between py-1">
                    <div>
                      <h4 className="font-serif text-[var(--color-espresso)] text-base mb-1">{line.item.name}</h4>
                      <p className="font-sans uppercase text-[var(--color-stone)] text-[10px] tracking-widest mb-2">SIZE: {line.selectedSize}</p>
                      <p className="font-sans uppercase text-[var(--color-amber)] text-xs tracking-widest">
                        {formatGhanaCediCompact(line.item.price_minor * line.quantity)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center border border-[var(--color-parchment)] font-sans text-sm">
                        <button 
                          onClick={() => updateQuantity(line.item.id, line.quantity - 1, line.selectedSize)}
                          className="px-3 py-1 text-[var(--color-stone)] hover:text-[var(--color-espresso)]"
                        >
                          −
                        </button>
                        <span className="px-2 text-[var(--color-espresso)]">{line.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(line.item.id, line.quantity + 1, line.selectedSize)}
                          className="px-3 py-1 text-[var(--color-stone)] hover:text-[var(--color-espresso)]"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(line.item.id, line.selectedSize)}
                        className="font-sans text-[var(--color-stone)] text-[10px] uppercase tracking-widest hover:text-[var(--color-amber)]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary */}
        {lines.length > 0 && (
          <div className="p-8 bg-[var(--color-cream)] mt-auto flex flex-col gap-6">
            
            {/* Progress Bar */}
            <div>
              <p className="font-sans text-[var(--color-stone)] text-[10px] uppercase tracking-widest mb-2">
                {remaining > 0 
                  ? `${formatGhanaCediCompact(remaining)} away from free shipping`
                  : "You qualify for free shipping!"}
              </p>
              <div className="w-full h-1 bg-[var(--color-parchment)]">
                <div className="h-full bg-[var(--color-amber)] transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Totals */}
            <div className="flex flex-col gap-3 font-sans text-[var(--color-stone)] text-sm border-t border-[var(--color-parchment)] pt-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatGhanaCediCompact(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-4 border-t border-[var(--color-parchment)]">
                <span className="font-serif text-lg text-[var(--color-espresso)] italic">Total</span>
                <span className="font-serif font-bold text-2xl text-[var(--color-espresso)]">{formatGhanaCediCompact(subtotal)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button 
              variant="secondary" 
              className="w-full relative justify-center gap-2"
              onClick={handleCheckout}
            >
              <span className="w-2 h-2 rounded-full bg-[var(--color-amber)]" />
              CHECKOUT VIA WHATSAPP
            </Button>

            <p className="font-serif text-[var(--color-stone)] text-center italic mt-2">
              Phasion Sense
            </p>
          </div>
        )}
      </div>
    </>
  );
}
