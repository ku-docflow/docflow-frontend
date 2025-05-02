import { useEffect, useState } from "react";

export function useIsAtBottom<T extends HTMLElement = HTMLElement>(
  containerRef: React.RefObject<T | null>,
  sentinelRef: React.RefObject<T | null>
) {
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAtBottom(entry.isIntersecting);
      },
      {
        root: containerRef.current,
        threshold: 1.0,
      }
    );

    observer.observe(sentinelRef.current);

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [containerRef, sentinelRef]);

  return isAtBottom;
}
