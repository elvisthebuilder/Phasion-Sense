"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false); // Defaulting to false, would be controlled via context
  
  // Dummy data
  const cartItems = [
    { id: 1, name: "The Onyx Drape Coat", size: "M", price: "GH₵ 1,240", img: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80", qty: 1 },
    { id: 2, name: "Amber Silk Trousers", size: "L", price: "GH₵ 1,100", img: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=600&q=80", qty: 1 }
  ];

  const total = 2340;
  const shippingThreshold = 2500;
  const progress = Math.min((total / shippingThreshold) * 100, 100);

  // For demo purpose, we expose a global way to open it. In reality we'd use Zustand or Context.
  if (typeof window !== 'undefined') {
    (window as any).toggleCart = () => setIsOpen(!isOpen);
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-[rgba(28,20,16,0.45)] z-[60]" 
        onClick={() => setIsOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-white border-l border-[var(--color-parchment)] shadow-none z-[70] flex flex-col transform transition-transform duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center p-8 border-b border-[var(--color-parchment)]">
          <h2 className="font-serif text-[var(--color-espresso)] text-3xl">Your Cart</h2>
          <button onClick={() => setIsOpen(false)} className="text-[var(--color-stone)] hover:text-[var(--color-amber)] text-2xl font-light">
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-8">
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex gap-6 pb-6 mb-6 border-b border-[var(--color-parchment)] last:border-0 last:mb-0 last:pb-0">
              <div className="relative w-[72px] h-[90px] bg-[var(--color-parchment)] flex-shrink-0">
                <Image src={item.img} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col flex-1 justify-between py-1">
                <div>
                  <h4 className="font-serif text-[var(--color-espresso)] text-base mb-1">{item.name}</h4>
                  <p className="font-sans uppercase text-[var(--color-stone)] text-[10px] tracking-widest mb-2">SIZE: {item.size}</p>
                  <p className="font-sans uppercase text-[var(--color-amber)] text-xs tracking-widest">{item.price}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center border border-[var(--color-parchment)] font-sans text-sm">
                    <button className="px-3 py-1 text-[var(--color-stone)] hover:text-[var(--color-espresso)]">−</button>
                    <span className="px-2 text-[var(--color-espresso)]">{item.qty}</span>
                    <button className="px-3 py-1 text-[var(--color-stone)] hover:text-[var(--color-espresso)]">+</button>
                  </div>
                  <button className="font-sans text-[var(--color-stone)] text-[10px] uppercase tracking-widest hover:text-[var(--color-amber)]">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Summary */}
        <div className="p-8 bg-[var(--color-cream)] mt-auto flex flex-col gap-6">
          
          {/* Progress Bar */}
          <div>
            <p className="font-sans text-[var(--color-stone)] text-[10px] uppercase tracking-widest mb-2">
              GH₵ {shippingThreshold - total > 0 ? shippingThreshold - total : 0} away from free shipping
            </p>
            <div className="w-full h-1 bg-[var(--color-parchment)]">
              <div className="h-full bg-[var(--color-amber)] transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Totals */}
          <div className="flex flex-col gap-3 font-sans text-[var(--color-stone)] text-sm border-t border-[var(--color-parchment)] pt-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>GH₵ {total}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex justify-between items-center mt-2 pt-4 border-t border-[var(--color-parchment)]">
              <span className="font-serif text-lg text-[var(--color-espresso)] italic">Total</span>
              <span className="font-serif font-bold text-2xl text-[var(--color-espresso)]">GH₵ {total}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <Button variant="secondary" className="w-full relative justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-amber)]" />
            CHECKOUT VIA WHATSAPP
          </Button>

          <p className="font-serif text-[var(--color-stone)] text-center italic mt-2">
            Phasion Sense
          </p>
        </div>
      </div>
    </>
  );
}
