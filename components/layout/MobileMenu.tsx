'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronDown, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  dropdown?: { label: string; href: string; description?: string }[];
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  isActive: (href: string) => boolean;
  phone: string;
}

export default function MobileMenu({ open, onClose, navItems, isActive, phone }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Slide panel */}
      <div
        className={cn(
          'fixed top-0 right-0 bottom-0 w-full max-w-sm z-50 lg:hidden flex flex-col transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ background: '#111111' }}
      >
        {/* Panel header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <Link href="/" className="flex items-center" onClick={onClose}>
            <Image
              src="/logo.webp"
              alt="Activ Automobiles"
              width={120}
              height={64}
              className="object-contain h-16 w-auto"
            />
          </Link>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-11 h-11 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.dropdown ? (
                <>
                  <button
                    onClick={() =>
                      setExpanded(expanded === item.label ? null : item.label)
                    }
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-white text-base font-medium hover:bg-white/8 transition-colors"
                    style={{ color: isActive(item.href) ? '#E8A020' : undefined, minHeight: 52 }}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={16}
                      className={cn(
                        'text-white/70 transition-transform duration-200',
                        expanded === item.label && 'rotate-180 text-[#1A3F6F]'
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-200',
                      expanded === item.label ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    )}
                  >
                    <div
                      className="ml-4 mt-1 mb-2 pl-4 space-y-1"
                      style={{ borderLeft: '2px solid rgba(26,63,111,0.35)' }}
                    >
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={onClose}
                          className="flex flex-col px-3 py-3 rounded-lg hover:bg-white/8 transition-colors"
                          style={{ minHeight: 48 }}
                        >
                          <span className="text-sm font-semibold text-white">{sub.label}</span>
                          {sub.description && (
                            <span className="text-xs text-white/45 mt-0.5 leading-snug">{sub.description}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center px-4 py-3.5 rounded-xl text-base font-medium hover:bg-white/8 transition-colors',
                    isActive(item.href) ? 'text-[#E8A020] bg-[#1A3F6F]/10' : 'text-white'
                  )}
                  style={{ minHeight: 52 }}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Panel footer */}
        <div
          className="px-5 py-5 space-y-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="flex items-center justify-center gap-2.5 w-full rounded-xl text-base font-semibold transition-colors"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff',
              minHeight: 56,
            }}
          >
            <Phone size={18} style={{ color: '#E8A020' }} />
            <span>{phone}</span>
          </a>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/services/reprise"
              onClick={onClose}
              className="flex items-center justify-center w-full rounded-xl text-sm font-bold text-white transition-all"
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                boxShadow: '0 4px 20px rgba(5,150,105,0.35)',
                minHeight: 52,
              }}
            >
              Vendre ma voiture
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
