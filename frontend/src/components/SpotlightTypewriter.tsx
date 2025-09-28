"use client";
import type { JSX } from "react";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

interface Word {
  text: string;
  className?: string;
}

export function SpotlightTypewriterDemo(): JSX.Element {
  const words: Word[] = [
    { text: "One",className: "text-gray-500 dark:text-gray-500" },
    { text: "Task",className: "text-gray-500 dark:text-gray-500" },
    { text: "At",className: "text-gray-500 dark:text-gray-500" },
    { text: "a",className: "text-gray-500 dark:text-gray-500" },
    { text: "Time.", className: "text-blue-500 dark:text-blue-500" },
  ];

  return (
    <div className="w-full flex items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        <TypewriterEffectSmooth words={words} />
      </div>
    </div>
  );
}
