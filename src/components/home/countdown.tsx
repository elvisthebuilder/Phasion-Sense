"use client";

import React, { useState, useEffect } from "react";

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ hrs: 2, mins: 14, secs: 33 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hrs, mins, secs } = prev;
        secs--;
        if (secs < 0) {
          secs = 59;
          mins--;
          if (mins < 0) {
            mins = 59;
            hrs--;
            if (hrs < 0) {
              clearInterval(timer);
              return { hrs: 0, mins: 0, secs: 0 };
            }
          }
        }
        return { hrs, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center gap-6">
      <div className="flex flex-col items-center">
        <span className="font-serif text-5xl text-[var(--color-amber)] leading-none">{String(timeLeft.hrs).padStart(2, '0')}</span>
        <span className="font-sans uppercase text-[10px] tracking-widest mt-1">HRS</span>
      </div>
      <span className="font-serif text-4xl text-[var(--color-amber)] mb-4">:</span>
      <div className="flex flex-col items-center">
        <span className="font-serif text-5xl text-[var(--color-amber)] leading-none">{String(timeLeft.mins).padStart(2, '0')}</span>
        <span className="font-sans uppercase text-[10px] tracking-widest mt-1">MIN</span>
      </div>
      <span className="font-serif text-4xl text-[var(--color-amber)] mb-4">:</span>
      <div className="flex flex-col items-center">
        <span className="font-serif text-5xl text-[var(--color-amber)] leading-none">{String(timeLeft.secs).padStart(2, '0')}</span>
        <span className="font-sans uppercase text-[10px] tracking-widest mt-1">SEC</span>
      </div>
    </div>
  );
}
