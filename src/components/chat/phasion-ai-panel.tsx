"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";
import { resolveApiImageUrl } from "@/lib/image";
import { formatGhanaCediCompact } from "@/lib/format";
import { getMerchantItems, type ItemResponse } from "@/lib/commerce";

type Message = {
  role: "ai" | "user";
  content: string;
  products?: ItemResponse[];
};

export function PhasionAIPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [catalog, setCatalog] = useState<ItemResponse[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const addItem = useCartStore((s) => s.addItem);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "Hello. I'm PhasionAI, your personal stylist. I'm here to help you curate exactly what you're looking for — whether it's a specific piece, a complete look, or style recommendations for an occasion. What can I dress you in today?"
    }
  ]);

  // Load catalog when panel opens so we have the products locally to match IDs
  useEffect(() => {
    if (isOpen && catalog.length === 0) {
      getMerchantItems()
        .then(setCatalog)
        .catch((err) => console.error("Error fetching catalog in chat:", err));
    }
  }, [isOpen, catalog.length]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;
    
    const userText = text.trim();
    // Add user message immediately
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setInput("");
    setIsTyping(true);

    try {
      // Gather conversation history
      const history = [...messages, { role: "user" as const, content: userText }].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Call server-side API endpoint
      const response = await fetch("/api/phasion-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feature: "chat",
          messages: history,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const replyText = data.reply || "";

      // Extract [PRODUCT:id] tags from reply
      const productRegex = /\[PRODUCT:([a-zA-Z0-9\-_]+)\]/g;
      const matchedIds: string[] = [];
      let match;
      
      while ((match = productRegex.exec(replyText)) !== null) {
        matchedIds.push(match[1]);
      }

      // Remove the tags from the final text so it is clean for display
      const cleanedReply = replyText.replace(productRegex, "").trim();

      // Find the actual items in the catalog
      const matchedProducts = matchedIds
        .map((id) => catalog.find((item) => item.id === id))
        .filter((item): item is ItemResponse => !!item);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: cleanedReply,
          products: matchedProducts,
        },
      ]);
    } catch (error) {
      console.error("Error communicating with PhasionAI:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "I'm having a little trouble styling right now. Please check your connection, or try asking me again in a moment.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* TRIGGER BUTTON WITH CUSTOM LOGO */}
      {!isOpen && (
        <button 
          id="phasion-ai-trigger"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-[var(--color-espresso)] rounded-full flex items-center justify-center border border-[var(--color-amber)] shadow-lg z-50 transition-all hover:scale-110 active:scale-95 group"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white">
            <Image src="/logo.png" alt="PhasionAI Stylist" fill className="object-contain p-1" />
          </div>
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--color-espresso)] animate-pulse" />
        </button>
      )}

      {/* EXPANDED PANEL */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 w-[380px] h-[540px] bg-white border-t-2 border-[var(--color-amber)] flex flex-col shadow-[0_20px_50px_-10px_rgba(28,20,16,0.25)] z-50 transition-all duration-300">
          
          {/* Header */}
          <div className="h-[76px] bg-[var(--color-espresso)] flex items-center justify-between px-6 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden bg-white border border-[var(--color-amber)]">
                <Image src="/logo.png" alt="PhasionAI" fill className="object-contain p-1" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans uppercase text-[var(--color-ivory)] text-sm font-bold tracking-widest leading-none mb-1">PHASIONAI</span>
                <span className="font-sans text-[var(--color-stone)] text-[10px] italic">Your AI Stylist</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[var(--color-ivory)] hover:text-[var(--color-amber)] transition-colors p-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto bg-[var(--color-cream)] p-5 flex flex-col gap-5">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 shadow-sm ${msg.role === 'user' ? 'bg-[var(--color-espresso)] text-[var(--color-ivory)]' : 'bg-white text-[var(--color-stone)] border border-[var(--color-parchment)]'}`}>
                  <p className="font-sans text-sm leading-relaxed whitespace-pre-line text-pretty">{msg.content}</p>
                  
                  {/* MULTI-PRODUCT RECOMMENDATION CARDS */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-4 flex flex-col gap-2.5">
                      {msg.products.map((item) => {
                        const img = resolveApiImageUrl(item.image_urls?.[0]);
                        return (
                          <div key={item.id} className="flex gap-3 border border-[var(--color-parchment)] p-2 bg-white hover:border-[var(--color-amber)] transition-colors relative">
                            <Link href={`/shop/${item.id}`} className="relative w-11 h-14 bg-[var(--color-parchment)] flex-shrink-0 block">
                              {img && <Image src={img} alt={item.name} fill className="object-cover" />}
                            </Link>
                            <div className="flex flex-col justify-between py-0.5 flex-1 min-w-0">
                              <div>
                                <Link href={`/shop/${item.id}`}>
                                  <h5 className="font-serif text-[var(--color-espresso)] text-xs font-bold leading-tight line-clamp-1 hover:underline">{item.name}</h5>
                                </Link>
                                <p className="font-sans text-[var(--color-amber)] uppercase text-[10px] tracking-widest mt-0.5">{formatGhanaCediCompact(item.price_minor)}</p>
                              </div>
                              <button 
                                onClick={() => addItem(item)}
                                className="self-start text-[10px] font-sans uppercase font-bold text-[var(--color-espresso)] hover:text-[var(--color-amber)] transition-colors tracking-widest mt-1"
                              >
                                ADD TO CART
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* TYPING INDICATOR */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-[var(--color-stone)] border border-[var(--color-parchment)] p-4 shadow-sm flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-[var(--color-stone)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-[var(--color-stone)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-[var(--color-stone)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            {/* SUGGESTED PROMPTS */}
            {messages.length === 1 && !isTyping && (
              <div className="flex flex-col gap-2 mt-2">
                {[
                  "I need something for a funeral",
                  "What works for a corporate dinner in Accra?",
                  "Suggest an outfit under GH₵600"
                ].map((prompt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="w-full text-left p-3 border border-[var(--color-parchment)] bg-white font-sans text-[var(--color-stone)] text-[10px] uppercase tracking-widest font-bold hover:border-[var(--color-amber)] hover:text-[var(--color-espresso)] transition-all rounded-none shadow-sm"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="h-[72px] bg-white border-t border-[var(--color-parchment)] flex items-center px-4 flex-shrink-0">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              disabled={isTyping}
              placeholder={isTyping ? "PhasionAI is thinking..." : "Ask PhasionAI..."}
              className="flex-1 bg-transparent border-none font-sans text-[var(--color-espresso)] text-sm focus:outline-none placeholder-[var(--color-stone)] h-full disabled:opacity-50"
            />
            <button 
              onClick={() => handleSend(input)}
              disabled={isTyping || !input.trim()}
              className="w-10 h-10 bg-[var(--color-amber)] disabled:bg-gray-200 flex items-center justify-center flex-shrink-0 hover:bg-[#d18309] transition-colors rounded-none ml-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>

        </div>
      )}
    </>
  );
}
