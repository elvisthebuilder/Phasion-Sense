"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";

export function AiTipPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show again if already dismissed this session
    if (sessionStorage.getItem("ai-tip-dismissed")) {
      setDismissed(true);
      return;
    }

    const handleScroll = () => {
      const scrollPercent =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);

      if (scrollPercent > 0.25 && !dismissed) {
        setVisible(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem("ai-tip-dismissed", "true");
  };

  if (dismissed || !visible) return null;

  return (
    <div
      className="fixed bottom-8 right-8 z-[9999] animate-in slide-in-from-bottom-4 fade-in duration-500"
    >
      <div className="relative flex items-center gap-4 bg-[var(--color-onyx)] text-white pl-5 pr-12 py-4 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-white/10 backdrop-blur-xl max-w-sm">
        {/* Icon */}
        <div className="shrink-0 w-10 h-10 rounded-full bg-[var(--color-amber)]/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-[var(--color-amber)]" />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-0.5">
          <span className="font-sans text-white/60 text-xs uppercase tracking-widest">
            Style Assist
          </span>
          <p className="font-serif text-base text-white leading-snug">
            Don&apos;t know what to wear?
          </p>
          <button
            className="font-sans text-[var(--color-amber)] text-xs uppercase tracking-widest mt-1 hover:underline underline-offset-4 text-left transition-colors cursor-pointer"
          >
            Let the AI help you →
          </button>
        </div>

        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors cursor-pointer"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
