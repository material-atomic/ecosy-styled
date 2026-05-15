import { useState, useEffect } from "react";

/**
 * A hook that returns the current window width and listens for 'resize' events.
 * Safely falls back to a default value for Server-Side Rendering (SSR).
 * Essential for evaluating responsive breakpoints natively on the Web.
 * 
 * @returns The current browser window width in pixels.
 */
export function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200 // Default SSR width
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
