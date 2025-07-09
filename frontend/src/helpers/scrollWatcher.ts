import { useEffect, useState } from "react";

interface ScrollInfo {
  scrollY: number;
  scrollX: number;
  direction: "up" | "down" | null;
  isBottom: boolean;
}

export const useScrollInfo = (): ScrollInfo => {
  const [scrollInfo, setScrollInfo] = useState<ScrollInfo>({
    scrollY: 0,
    scrollX: 0,
    direction: null,
    isBottom: false,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const currentX = window.scrollX;

      const direction =
        currentY > lastScrollY ? "down" : currentY < lastScrollY ? "up" : null;

      const isBottom =
        window.innerHeight + currentY >= document.body.scrollHeight - 50;

      setScrollInfo({
        scrollY: currentY,
        scrollX: currentX,
        direction,
        isBottom,
      });

      lastScrollY = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollInfo;
};
