"use client";

import Link from "next/link";
import { pushToDataLayer } from "@/lib/gtm";

const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "";

function buildWaLink() {
  const msg = encodeURIComponent("Olá! Gostaria de solicitar uma proposta para administração do meu condomínio.");
  return waNumber ? `https://wa.me/${waNumber}?text=${msg}` : "#";
}

export default function WhatsFab() {
  if (!waNumber) return null; // se não tiver número, não mostra

  const href = buildWaLink();
  const onClick = () => pushToDataLayer({ event: "whatsapp_fab_click" });

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-transform"
    >
      {/* círculo verde com o ícone do Whats dentro */}
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center"
           style={{ backgroundColor: "#25D366" }}>
        {/* Ícone WhatsApp (SVG) */}
        <svg width="28" height="28" viewBox="0 0 32 32" fill="white" aria-hidden="true">
          <path d="M19.11 17.07c-.29-.15-1.69-.84-1.95-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.63.07-.29-.15-1.24-.46-2.36-1.47-.87-.77-1.46-1.72-1.63-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.55-.88-2.13-.23-.56-.47-.49-.64-.5l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43s1.03 2.82 1.18 3.01c.15.19 2.02 3.08 4.9 4.32.68.29 1.21.46 1.62.59.68.22 1.29.19 1.77.12.54-.08 1.69-.69 1.93-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34zM16 3c7.18 0 13 5.82 13 13 0 7.18-5.82 13-13 13-2.28 0-4.41-.6-6.26-1.65L3 29l1.73-6.54A12.93 12.93 0 0 1 3 16C3 8.82 8.82 3 16 3zm0-2C7.72 1 1 7.72 1 16c0 2.29.58 4.44 1.6 6.34L1 31l8.81-1.55A14.95 14.95 0 0 0 16 31c8.28 0 15-6.72 15-15S24.28 1 16 1z"/>
        </svg>
      </div>
      <span className="sr-only">WhatsApp</span>
    </Link>
  );
}
