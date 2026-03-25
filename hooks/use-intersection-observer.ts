'use client';

import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
  triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends Element = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
    triggerOnce = false,
  } = options;

  const elementRef = useRef<T>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const element = elementRef.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !element) {
      return;
    }

    const observerCallback: IntersectionObserverCallback = ([entry]) => {
      setEntry(entry);

      if (triggerOnce && entry.isIntersecting && element) {
        observer.unobserve(element);
      }
    };

    const observerOptions: IntersectionObserverInit = {
      threshold,
      root,
      rootMargin,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, threshold, root, rootMargin, frozen, triggerOnce]);

  return {
    ref: elementRef,
    entry,
    isIntersecting: !!entry?.isIntersecting,
    isVisible: !!entry?.isIntersecting,
  };
}
