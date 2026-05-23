"use client";

import React, { useState } from "react";
import Image from "next/image";

export function PhasionAIPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Hello. I'm here to help you find exactly what you're looking for — whether it's a specific piece, a full look, or just something that feels right. What do you have in mind?"
    }
  ]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");
    
    // Simulate AI typing delay
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "ai", 
        content: "I recommend the Ivory Silk Blouse. It has an architectural drape that works perfectly for formal settings while maintaining a relaxed edge.",
        product: {
          name: "Ivory Silk Blouse",
          price: "GH₵ 650",
          img: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=200&q=80"
        }
      }]);
    }, 1500);
  };

  return (
    <>
      {/* TRIGGER BUTTON */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-[52px] h-[52px] bg-[var(--color-espresso)] rounded-full flex items-center justify-center border-0 z-50 transition-transform hover:scale-105"
        >
          <div className="relative">
             <div className="w-6 h-6 border border-[var(--color-ivory)] rounded-full flex items-center justify-center text-[10px] font-serif font-bold text-[var(--color-ivory)]">
               GH
             </div>
             <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[var(--color-amber)] rounded-full border border-[var(--color-espresso)]" />
          </div>
        </button>
      )}

      {/* EXPANDED PANEL */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 w-[380px] h-[520px] bg-white border-t-2 border-[var(--color-amber)] flex flex-col shadow-[0_20px_40px_-15px_rgba(28,20,16,0.15)] z-50">
          
          {/* Header */}
          <div className="h-[72px] bg-[var(--color-espresso)] flex items-center justify-between px-6 flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-7 h-7 border border-[var(--color-amber)] rounded-full flex items-center justify-center text-[10px] font-serif font-bold text-[var(--color-amber)] bg-[var(--color-espresso)]">
                GH
              </div>
              <div className="flex flex-col">
                <span className="font-sans uppercase text-[var(--color-ivory)] text-sm font-bold tracking-widest leading-none mb-1">PHASIONAI</span>
                <span className="font-sans text-[var(--color-stone)] text-[10px] italic">Your style assistant</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[var(--color-ivory)] hover:text-[var(--color-amber)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto bg-[var(--color-cream)] p-6 flex flex-col gap-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 ${msg.role === 'user' ? 'bg-[var(--color-espresso)] text-[var(--color-ivory)]' : 'bg-white text-[var(--color-stone)] border border-[var(--color-parchment)]'}`}>
                  <p className="font-sans text-sm leading-relaxed">{msg.content}</p>
                  
                  {msg.product && (
                    <div className="mt-4 flex gap-3 border border-[var(--color-parchment)] p-2 bg-white">
                      <div className="relative w-11 h-14 bg-[var(--color-parchment)] flex-shrink-0">
                        <Image src={msg.product.img} alt={msg.product.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col justify-between py-1 flex-1">
                        <div>
                          <h5 className="font-serif text-[var(--color-espresso)] text-xs font-bold leading-tight line-clamp-1">{msg.product.name}</h5>
                          <p className="font-sans text-[var(--color-amber)] uppercase text-[10px] tracking-widest">{msg.product.price}</p>
                        </div>
                        <button className="self-start text-[10px] font-sans uppercase font-bold text-[var(--color-amber)] hover:underline tracking-widest">
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="flex flex-col gap-2 mt-4">
                {["SOMETHING FOR A DINNER EVENT", "STYLE ME HEAD TO TOE", "NEW ARRIVALS UNDER GH₵500"].map((prompt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="w-full text-left p-3 border border-[var(--color-parchment)] bg-white font-sans text-[var(--color-stone)] text-[10px] uppercase tracking-widest font-bold hover:border-[var(--color-amber)] transition-colors rounded-none"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="h-[72px] bg-white border-t border-[var(--color-parchment)] flex items-center px-4 flex-shrink-0">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Ask PhasionAI..."
              className="flex-1 bg-transparent border-none font-sans text-[var(--color-espresso)] text-sm focus:outline-none placeholder-[var(--color-stone)] h-full"
            />
            <button 
              onClick={() => handleSend(input)}
              className="w-10 h-10 bg-[var(--color-amber)] flex items-center justify-center flex-shrink-0 hover:bg-[#d18309] transition-colors rounded-none ml-2"
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
