"use client";

import { useEffect } from "react";

export const useInteractionLock = (isLoading: boolean) => {
  useEffect(() => {
    if (isLoading) {
      const handleKeydown = (e: KeyboardEvent) => {
        e.preventDefault();
        e.stopPropagation();
      };

      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "none";
      document.body.style.userSelect = "none";

      window.addEventListener("keydown", handleKeydown);

      return () => {
        document.body.style.overflow = "auto";
        document.body.style.pointerEvents = "all";
        document.body.style.userSelect = "auto";
        window.removeEventListener("keydown", handleKeydown);
      };
    }
  }, [isLoading]);
};
