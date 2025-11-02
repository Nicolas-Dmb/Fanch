"use client";
import React, { useEffect, useRef } from "react";
import {ColorType} from '../entities/Background.ts'


interface ModalProps {
  title: string;
  content: string;
  background: ColorType; // ex: Colors.Black
  text: ColorType;       // ex: Colors.White
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({
  title,
  content,
  background,
  text,
  onClose,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ onClose]);


  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      aria-hidden="false"
      role="presentation"
      onClick={() => onClose(false)}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

      {/* dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="
          relative w-[92vw] max-w-lg shadow-2xl
          p-6 md:p-7
          animate-in fade-in zoom-in duration-150
        "
        style={{ backgroundColor: background, color: text }}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Close (petite croix) */}
        <button
          type="button"
          aria-label="Fermer"
          onClick={() => onClose(false)}
          className="
            absolute right-3 top-3
            inline-flex h-8 w-8 items-center justify-center
            rounded-full/95 border border-white/20
            hover:scale-105 active:scale-95 transition
          "
          style={{ color: text }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" strokeWidth="2"
               className="h-4 w-4">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <h2 id="modal-title" className="text-xl md:text-2xl font-semibold pr-8">
          {title}
        </h2>

        <p className="mt-4 leading-relaxed opacity-90">{content}</p>

      </div>
    </div>
  );
}
