"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function CheckoutModal() {
  const [isOpen, setIsOpen] = useState(false); // Defaulting to false, would be controlled via context
  const [deliveryMethod, setDeliveryMethod] = useState("DELIVERY");

  if (typeof window !== 'undefined') {
    (window as unknown as Record<string, unknown>).toggleCheckout = () => setIsOpen(!isOpen);
  }

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-[rgba(28,20,16,0.60)] z-[80] flex items-center justify-center p-4" 
        onClick={() => setIsOpen(false)}
      >
        <div 
          className="bg-white w-full max-w-[480px] p-10 flex flex-col max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Order Summary Miniature */}
          <div className="mb-8 border-b border-[var(--color-parchment)] pb-6">
            <div className="flex gap-3 mb-4 overflow-x-auto">
              <div className="relative w-12 h-16 bg-[var(--color-parchment)] flex-shrink-0">
                 <Image src="https://images.unsplash.com/photo-1544441893-675973e31985?w=200&q=80" alt="Item" fill className="object-cover" />
              </div>
              <div className="relative w-12 h-16 bg-[var(--color-parchment)] flex-shrink-0">
                 <Image src="https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=200&q=80" alt="Item" fill className="object-cover" />
              </div>
            </div>
            <div className="flex justify-between items-end">
              <span className="font-sans uppercase text-[var(--color-stone)] text-[10px] tracking-widest">2 ITEMS</span>
              <span className="font-serif text-[var(--color-espresso)] text-2xl font-bold">GH₵ 2,340</span>
            </div>
          </div>

          <h2 className="font-serif text-[var(--color-espresso)] font-bold text-3xl mb-8">Complete Your Order</h2>

          {/* Form */}
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label className="font-sans uppercase text-[var(--color-stone)] text-[10px] tracking-widest">FULL NAME</label>
              <input type="text" className="bg-[var(--color-cream)] border border-[var(--color-parchment)] p-4 font-sans text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-amber)] rounded-none" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-sans uppercase text-[var(--color-stone)] text-[10px] tracking-widest">PHONE NUMBER</label>
              <input type="tel" className="bg-[var(--color-cream)] border border-[var(--color-parchment)] p-4 font-sans text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-amber)] rounded-none" />
            </div>

            {/* Delivery Options */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              <button 
                type="button"
                onClick={() => setDeliveryMethod("PICKUP")}
                className={`py-4 font-sans uppercase text-sm font-bold border transition-colors ${deliveryMethod === "PICKUP" ? "bg-[var(--color-espresso)] text-[var(--color-ivory)] border-[var(--color-espresso)]" : "bg-white text-[var(--color-stone)] border-[var(--color-parchment)] hover:border-[var(--color-espresso)]"} rounded-none`}
              >
                PICKUP
              </button>
              <button 
                type="button"
                onClick={() => setDeliveryMethod("DELIVERY")}
                className={`py-4 font-sans uppercase text-sm font-bold border transition-colors ${deliveryMethod === "DELIVERY" ? "bg-[var(--color-espresso)] text-[var(--color-ivory)] border-[var(--color-espresso)]" : "bg-white text-[var(--color-stone)] border-[var(--color-parchment)] hover:border-[var(--color-espresso)]"} rounded-none`}
              >
                DELIVERY
              </button>
            </div>

            {deliveryMethod === "DELIVERY" && (
              <div className="flex flex-col gap-2 mt-2">
                <label className="font-sans uppercase text-[var(--color-stone)] text-[10px] tracking-widest">DELIVERY AREA / ADDRESS</label>
                <input type="text" className="bg-[var(--color-cream)] border border-[var(--color-parchment)] p-4 font-sans text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-amber)] rounded-none" />
              </div>
            )}

            <div className="flex flex-col gap-2 mt-2">
              <label className="font-sans uppercase text-[var(--color-stone)] text-[10px] tracking-widest">ORDER NOTE (OPTIONAL)</label>
              <textarea rows={3} className="bg-[var(--color-cream)] border border-[var(--color-parchment)] p-4 font-sans text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-amber)] rounded-none resize-none" />
            </div>

            <Button className="w-full mt-4 h-14">SEND ORDER VIA WHATSAPP</Button>
            
            <button 
              type="button" 
              onClick={() => setIsOpen(false)}
              className="font-sans text-[var(--color-stone)] text-xs uppercase tracking-widest hover:text-[var(--color-amber)] mt-2"
            >
              CANCEL
            </button>
          </form>

        </div>
      </div>
    </>
  );
}
