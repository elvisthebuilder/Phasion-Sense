"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  return (
    <form className="flex w-full max-w-lg mx-auto mb-6" onSubmit={(e) => e.preventDefault()}>
      <input 
        type="email" 
        placeholder="Your email address" 
        className="flex-1 bg-white border border-[var(--color-parchment)] border-r-0 px-6 py-4 font-sans text-[var(--color-espresso)] focus:outline-none focus:border-[var(--color-amber)] transition-colors rounded-none"
        required
      />
      <Button type="submit" variant="default" className="rounded-none border border-[var(--color-amber)] h-auto py-4 px-8">
        SUBSCRIBE
      </Button>
    </form>
  );
}
