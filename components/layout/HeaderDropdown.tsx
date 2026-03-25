'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface HeaderDropdownProps {
  items: DropdownItem[];
  isOpen: boolean;
}

export default function HeaderDropdown({ items, isOpen }: HeaderDropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.98 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
          style={{ minWidth: 280 }}
        >
          <div
            className="rounded-2xl overflow-hidden py-2.5 px-1.5"
            style={{
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(16px)',
              border: '1px solid #E5E7EB',
              boxShadow: '0 20px 52px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)',
            }}
          >
            {items.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                className="group flex flex-col px-4 py-3 rounded-xl hover:bg-[#F1F5F9] transition-colors mx-1"
              >
                <span className="text-sm font-semibold text-[#1E293B] group-hover:text-[#1A3F6F] transition-colors">
                  {sub.label}
                </span>
                {sub.description && (
                  <span className="text-xs text-gray-400 mt-0.5 leading-snug">
                    {sub.description}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
