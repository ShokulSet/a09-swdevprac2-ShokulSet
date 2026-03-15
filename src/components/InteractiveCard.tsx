"use client";

import { useState, ReactNode } from "react";

export default function InteractiveCard({ children }: { children: ReactNode }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`rounded-lg transition-all duration-200 ${
        hovered ? "shadow-2xl bg-neutral-200" : "shadow-lg bg-white"
      }`}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      {children}
    </div>
  );
}
