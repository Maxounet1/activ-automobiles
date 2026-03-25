'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { PHONE_MAIN } from '@/lib/utils';
import { cn } from '@/lib/utils';
import ContactDropdown from './ContactDropdown';

const NAV_ITEMS: { label: string; href: string; dropdown?: { label: string; href: string; description?: string }[] }[] = [
  {
    label: 'Acheter',
    href: '/voitures-occasion',
  },
  {
    label: 'Financer',
    href: '/financement',
  },
  {
    label: 'À propos',
    href: '/nos-engagements',
    dropdown: [
      {
        label: 'Pourquoi nous ?',
        href: '/nos-engagements',
        description: 'Nos engagements, nos valeurs, notre histoire',
      },
      {
        label: 'Nos agences',
        href: '/agences',
        description: 'Retrouvez notre réseau partout en France',
      },
      {
        label: 'Services',
        href: '/services',
        description: 'Reprise, garantie, livraison, financement',
      },
    ],
  },
  {
    label: 'Conseils',
    href: '/blog',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface NavDropdownProps {
  items: DropdownItem[];
  isOpen: boolean;
}

function NavDropdown({ items, isOpen }: NavDropdownProps) {
  return (
    <div
      className={cn(
        'absolute top-full left-1/2 -translate-x-1/2 mt-3 rounded-2xl overflow-hidden transition-all duration-200',
        isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
      )}
      style={{
        zIndex: 9999,
        width: 300,
        background: '#ffffff',
        border: '1px solid #E2E8F0',
        boxShadow: '0 24px 64px rgba(0,0,0,0.13), 0 4px 20px rgba(26,63,111,0.08)',
        borderTop: '3px solid #1A3F6F',
      }}
    >
      <div className="py-2">
        {items.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'group flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-[#EEF4FB]',
              i < items.length - 1 && 'border-b border-slate-50'
            )}
          >
            <div
              className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 transition-colors"
              style={{ background: '#1A3F6F33' }}
            />
            <div>
              <span className="block text-sm font-semibold text-[#1E293B] group-hover:text-[#1A3F6F] transition-colors leading-tight">
                {item.label}
              </span>
              {item.description && (
                <span className="block text-xs text-[#94A3B8] mt-0.5 group-hover:text-[#64748B] transition-colors leading-snug">
                  {item.description}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'shadow-lg shadow-black/8' : ''
        )}
        style={{
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(16px)',
          borderBottom: scrolled ? '1px solid #E2E8F0' : '1px solid rgba(226,232,240,0.6)',
        }}
      >
        {/* ── Top info bar ── */}
        <div
          style={{
            background: 'linear-gradient(90deg, #0B1829 0%, #111827 50%, #0B1829 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
            <div className="flex items-center gap-5 text-xs">
              <span className="flex items-center gap-1.5 text-white/60">
                <span className="relative inline-flex flex-shrink-0">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="absolute -inset-1 rounded-full bg-green-400/20 animate-ping" style={{ animationDuration: '2.5s' }} />
                </span>
                Ouvert aujourd&apos;hui&nbsp;·&nbsp;Lun–Sam 9h–19h
              </span>
              <span className="hidden sm:block text-white/60">|</span>
              <span className="hidden sm:flex items-center gap-1 text-white/60">
                Livraison partout en France
              </span>
            </div>
            <a
              href={`tel:${PHONE_MAIN.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 text-xs font-semibold text-white hover:text-[#E8A020] transition-colors"
            >
              <Phone size={11} className="shrink-0" />
              {PHONE_MAIN}
            </a>
          </div>
        </div>

        {/* ── Main nav bar ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/logo.webp"
                alt="Activ Automobiles"
                width={180}
                height={100}
                className="object-contain h-[100px] w-auto"
                priority
              />
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.dropdown ? handleMouseEnter(item.label) : handleMouseLeave()}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.dropdown ? (
                    <button
                      className={cn(
                        'flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                        isActive(item.href)
                          ? 'text-[#1A3F6F] bg-[#EEF4FB]'
                          : 'text-[#1E293B] hover:text-[#1A3F6F] hover:bg-[#EEF4FB]'
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        size={13}
                        className={cn(
                          'text-[#94A3B8] transition-transform duration-200',
                          activeDropdown === item.label && 'rotate-180 text-[#1A3F6F]'
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'relative flex items-center px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 group',
                        isActive(item.href)
                          ? 'text-[#1A3F6F] bg-[#EEF4FB]'
                          : 'text-[#1E293B] hover:text-[#1A3F6F] hover:bg-[#EEF4FB]'
                      )}
                    >
                      {item.label}
                      <span
                        className={cn(
                          'absolute bottom-0 left-3.5 right-3.5 h-0.5 rounded-full bg-[#1A3F6F] transition-all duration-200 origin-left',
                          isActive(item.href) ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60'
                        )}
                      />
                    </Link>
                  )}
                  {item.dropdown && (
                    <NavDropdown
                      items={item.dropdown}
                      isOpen={activeDropdown === item.label}
                    />
                  )}
                </div>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              <ContactDropdown />

              {/* Phone icon only (md to xl) */}
              <a
                href={`tel:${PHONE_MAIN.replace(/\s/g, '')}`}
                className="hidden md:flex xl:hidden items-center justify-center w-9 h-9 rounded-lg text-[#1A3F6F] hover:bg-[#EEF4FB] transition-all duration-150"
                aria-label={`Appeler ${PHONE_MAIN}`}
              >
                <Phone size={16} />
              </a>

              {/* Vendre ma voiture CTA */}
              <Link
                href="/services/reprise"
                className="header-cta-green hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
              >
                <span className="header-cta-shimmer" />
                Vendre ma voiture
              </Link>


              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl text-[#1E293B] hover:bg-[#F1F5F9] transition-all duration-150"
                aria-label="Menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile backdrop ── */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Mobile slide panel ── */}
      <div
        className={cn(
          'fixed top-0 right-0 bottom-0 w-full max-w-sm z-50 lg:hidden flex flex-col transition-transform duration-300 ease-in-out',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ background: '#111111' }}
      >
        {/* Panel header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
            <Image
              src="/logo.webp"
              alt="Activ Automobiles"
              width={120}
              height={64}
              className="object-contain h-16 w-auto"
            />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-11 h-11 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              {item.dropdown ? (
                <>
                  <button
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                    }
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-white text-base font-medium hover:bg-white/8 transition-colors"
                    style={{ color: isActive(item.href) ? '#E8A020' : undefined, minHeight: 52 }}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={16}
                      className={cn(
                        'text-white/70 transition-transform duration-200',
                        mobileExpanded === item.label && 'rotate-180 text-[#1A3F6F]'
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-200',
                      mobileExpanded === item.label ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
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
                          onClick={() => setMobileOpen(false)}
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
                  onClick={() => setMobileOpen(false)}
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
            href={`tel:${PHONE_MAIN.replace(/\s/g, '')}`}
            className="flex items-center justify-center gap-2.5 w-full rounded-xl text-base font-semibold transition-colors"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff',
              minHeight: 56,
            }}
          >
            <Phone size={18} style={{ color: '#E8A020' }} />
            <span>{PHONE_MAIN}</span>
          </a>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/services/reprise"
              onClick={() => setMobileOpen(false)}
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
