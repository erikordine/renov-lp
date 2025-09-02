"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

type Slide = { src: string; alt: string };

export default function SimpleCarousel({
  slides,
  interval = 4000,
}: {
  slides: Slide[];
  interval?: number;
}) {
  const [i, setI] = useState(0);
  const count = slides.length;

  const prev = useCallback(() => setI((v) => (v - 1 + count) % count), [count]);
  const next = useCallback(() => setI((v) => (v + 1) % count), [count]);

  useEffect(() => {
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [next, interval]);

  return (
    <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden border border-gray-200">
      {slides.map((s, idx) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
            priority={idx === 0}
          />
        </div>
      ))}

      {/* Controles */}
      <button
        type="button"
        onClick={prev}
        aria-label="Anterior"
        className="absolute left-2 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 rounded-full bg-white/80 border border-gray-200 backdrop-blur hover:scale-105 active:scale-95"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Próximo"
        className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 rounded-full bg-white/80 border border-gray-200 backdrop-blur hover:scale-105 active:scale-95"
      >
        ›
      </button>

      {/* Pontinhos */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, dot) => (
          <span
            key={dot}
            className={`h-2.5 w-2.5 rounded-full ${
              dot === i ? "bg-brand" : "bg-white/70 border border-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
