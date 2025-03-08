"use client";

import { useEffect, useRef } from "react";

// Simple hook to detect clicks outside of a component
function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
  enabled = true
) {
  // Keep the handler reference updated
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      // Special case for select/dropdown components (they're usually portaled)
      if (
        (event.target as Element).closest?.('[role="listbox"]') ||
        (event.target as Element).closest?.(
          "[data-radix-popper-content-wrapper]"
        )
      ) {
        return;
      }

      handlerRef.current();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, enabled]);
}

export default useClickOutside;
