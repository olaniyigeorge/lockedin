"use client"

import { useInteractionLock } from "@/hooks/use-interaction-lock";

type InlineLoaderProps = {
  color: string;
  size: string;
  textSize: string;
};

export const InlineLoader = ({ color, size, textSize }: InlineLoaderProps) => {
  useInteractionLock(true);

  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className="rounded-full relative"
    >
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderColor: color,
          borderTopColor: "transparent",
        }}
        className="border-4 rounded-full animate-spin"
      ></div>
      <span
        style={{ fontSize: `${textSize}px`, color }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold"
      >
        ln
      </span>
    </div>
  );
};
