'use client';

import { useRef, useEffect } from 'react';

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(isOpen: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen || !ref.current) return;

    // Store the element that had focus before the trap opened
    previousActiveElement.current = document.activeElement as HTMLElement;

    const container = ref.current;
    const focusableElements = container.querySelectorAll(FOCUSABLE_SELECTOR);
    const firstElement = focusableElements[0] as HTMLElement | undefined;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement | undefined;

    // Focus the first focusable element
    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Let the parent handle closing
        return;
      }

      if (e.key !== 'Tab') return;

      // Re-query in case DOM changed
      const currentFocusable = container.querySelectorAll(FOCUSABLE_SELECTOR);
      const first = currentFocusable[0] as HTMLElement | undefined;
      const last = currentFocusable[currentFocusable.length - 1] as HTMLElement | undefined;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus to the previously focused element
      previousActiveElement.current?.focus();
    };
  }, [isOpen]);

  return ref;
}
