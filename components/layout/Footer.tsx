'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Shield, Award, Zap, ChevronRight, ExternalLink } from 'lucide-react';
import { PHONE_MAIN, SITE_NAME } from '@/lib/utils';

const BRANDS_LINKS = [
  { label: 'Renault occasion', href: '/voitures-occasion/marque/renault' },
  { label: 'Peugeot occasion', href: '/voitures-occasion/marque/peugeot' },
  { label: 'Citroën occasion', href: '/voitures-occasion/marque/citroen' },
  { label: 'Volkswagen occasion', href: '/voitures-occasion/marque/volkswagen' },
  { label: 'BMW occasion', href: '/voitures-occasion/marque/bmw' },
  { label: 'Mercedes occasion', href: '/voitures-occasion/marque/mercedes-benz' },
  { label: 'Audi occasion', href: '/voitures-occasion/marque/audi' },
  { label: 'Toyota occasion', href: '/voitures-occasion/marque/toyota' },
];

const CITY_LINKS = [
  { label: 'Occasion Nancy', href: '/voitures-occasion/ville/nancy' },
  { label: 'Occasion Metz', href: '/voitures-occasion/ville/metz' },
  { label: 'Occasion Bordeaux', href: '/voitures-occasion/ville/bordeaux' },
  { label: 'Occasion Rennes', href: '/voitures-occasion/ville/rennes' },
  { label: 'Occasion Strasbourg', href: '/voitures-occasion/ville/strasbourg' },
  { label: 'Occasion Nantes', href: '/voitures-occasion/ville/nantes' },
  { label: 'Occasion Épinal', href: '/voitures-occasion/ville/epinal' },
  { label: 'Occasion Thionville', href: '/voitures-occasion/ville/thionville' },
];

const SERVICES_LINKS = [
  { label: 'Financement auto', href: '/financement' },
  { label: 'Reprise de véhicule', href: '/services/reprise' },
  { label: 'Garantie 12 mois', href: '/services/garantie' },
  { label: 'Livraison à domicile', href: '/services/livraison' },
  { label: 'Voitures électriques', href: '/voitures-occasion?energie=electrique' },
  { label: 'Voitures hybrides', href: '/voitures-occasion?energie=hybride' },
  { label: 'Estimation reprise', href: '/services/reprise#estimation' },
];

const AGENCIES = [
  {
    city: 'Nancy-Laxou',
    address: '12 Rue du Saintois, 54520',
    phone: '03 83 97 97 97',
    href: '/agences/nancy-laxou',
  },
  {
    city: 'Talange',
    address: 'Rue du Pré le Loop, 57525',
    phone: '03 87 73 73 73',
    href: '/agences/talange',
  },
  {
    city: 'Épinal-Chavelot',
    address: '22 Rue d\'Épinal, 88150',
    phone: '03 29 99 09 99',
    href: '/agences/epinal-chavelot',
  },
  {
    city: 'La Mothe-Achard',
    address: '3 Rue Michel Breton, 85150',
    phone: '02 19 08 01 10',
    href: '/agences/la-mothe-achard',
  },
  {
    city: 'Bordeaux',
    address: '82 Rue Marie Curie, 33127',
    phone: '05 18 25 14 94',
    href: '/agences/bordeaux',
  },
  {
    city: 'Rennes',
    address: 'ZA La Brosse, 35760',
    phone: '02 19 08 01 09',
    href: '/agences/rennes',
  },
];

const INFO_LINKS = [
  { label: 'Blog automobile', href: '/blog' },
  { label: 'Pourquoi nous ?', href: '/nos-engagements' },
  { label: 'Nous contacter', href: '/contact' },
  { label: 'Mentions légales', href: '/legal/mentions-legales' },
  { label: 'Politique de confidentialité', href: '/legal/confidentialite' },
  { label: 'Gestion des cookies', href: '/legal/cookies' },
  { label: 'CGV', href: '/legal/cgv' },
];

const TRUST_BADGES = [
  {
    icon: Shield,
    label: 'Vendeur certifié',
    sub: 'Agrément préfectoral',
  },
  {
    icon: Award,
    label: 'Garantie 12 mois',
    sub: 'Sur tous nos véhicules',
  },
  {
    icon: Zap,
    label: 'Financement immédiat',
    sub: 'Réponse rapide',
  },
];

const SOCIAL_LINKS = [
  { label: 'Facebook', icon: Facebook, href: 'https://facebook.com/activautomobiles' },
  { label: 'Instagram', icon: Instagram, href: 'https://instagram.com/activautomobiles' },
  { label: 'YouTube', icon: Youtube, href: 'https://youtube.com/activautomobiles' },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-1.5 text-sm text-white/65 hover:text-white transition-colors duration-200 py-1"
      style={{ minHeight: 36 }}
    >
      <ChevronRight
        size={12}
        className="shrink-0 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-250 text-blue-400 flex-shrink-0"
      />
      <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white/50 after:transition-[width] after:duration-250 group-hover:after:w-full">{children}</span>
    </Link>
  );
}

function FooterSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
      <span className="inline-block w-5 h-0.5 bg-blue-400 rounded-full" />
      {children}
    </h3>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="text-white relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0B2240 0%, #091A30 60%, #071525 100%)' }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 85% -10%, rgba(59,130,246,0.14) 0%, transparent 55%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 40% 60% at 10% 110%, rgba(30,80,160,0.10) 0%, transparent 55%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(96,165,250,0.25) 35%, rgba(96,165,250,0.18) 65%, transparent 100%)' }}
      />
      {/* Trust badges banner */}
      <div className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {TRUST_BADGES.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-400/30 hover:bg-blue-400/5 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-400/10 group-hover:bg-blue-400/20 transition-colors shrink-0">
                    <Icon size={22} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{badge.label}</p>
                    <p className="text-xs text-white/45 mt-0.5">{badge.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/Footer.webp"
                alt="Activ Automobiles"
                width={200}
                height={64}
                className="h-16 w-auto object-contain"
              />
            </Link>

            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Votre réseau de confiance pour l&apos;achat et la vente de véhicules d&apos;occasion sélectionnés.
              Qualité certifiée, financement et garantie inclus.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-7">
              <a
                href={`tel:${PHONE_MAIN.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors group py-1"
                style={{ minHeight: 44 }}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 group-hover:bg-blue-400/20 transition-colors flex-shrink-0">
                  <Phone size={16} className="text-blue-400" />
                </div>
                <span className="font-semibold tabular-nums">{PHONE_MAIN}</span>
                <span className="text-xs text-white/35 hidden sm:block">(appel non surtaxé)</span>
              </a>
              <a
                href="mailto:contact@activ-automobiles.fr"
                className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors group py-1"
                style={{ minHeight: 44 }}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 group-hover:bg-blue-400/20 transition-colors flex-shrink-0">
                  <Mail size={16} className="text-blue-400" />
                </div>
                <span>contact@activ-automobiles.fr</span>
              </a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-11 h-11 rounded-lg bg-white/10 text-white/50 hover:bg-blue-500 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Nos voitures (marques) */}
          <div>
            <FooterSectionTitle>Nos marques</FooterSectionTitle>
            <ul className="space-y-2.5">
              {BRANDS_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2b: Nos villes */}
          <div>
            <FooterSectionTitle>Nos villes</FooterSectionTitle>
            <ul className="space-y-2.5">
              {CITY_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <FooterSectionTitle>Services</FooterSectionTitle>
            <ul className="space-y-2.5">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Agences + Info */}
          <div className="space-y-8">
            {/* Nos agences */}
            <div>
              <FooterSectionTitle>Nos agences</FooterSectionTitle>
              <ul className="space-y-4">
                {AGENCIES.map((agency) => (
                  <li key={agency.city}>
                    <Link
                      href={agency.href}
                      className="group block"
                    >
                      <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors flex items-center gap-1">
                        <MapPin size={13} className="text-blue-400 shrink-0" />
                        {agency.city}
                      </p>
                      <p className="text-xs text-white/35 mt-0.5 ml-[17px]">{agency.address}</p>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/agences"
                    className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  >
                    Voir toutes nos agences
                    <ExternalLink size={11} />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Informations */}
            <div>
              <FooterSectionTitle>Informations</FooterSectionTitle>
              <ul className="space-y-2.5">
                {INFO_LINKS.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-xs sm:text-[13px] text-white/55 text-center sm:text-left">
              © {year} {SITE_NAME}. Tous droits réservés.
              {' '}
              <Link href="/legal/mentions-legales" className="hover:text-white transition-colors underline underline-offset-2">
                Mentions légales
              </Link>
            </p>

            {/* Payment / certification badges */}
            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
              {/* Visa */}
              <div className="flex items-center justify-center h-7 px-3 rounded-md bg-white/10 border border-white/10">
                <span className="text-[10px] font-bold text-white/70 tracking-wide">VISA</span>
              </div>
              {/* Mastercard */}
              <div className="flex items-center justify-center h-7 px-3 rounded-md bg-white/10 border border-white/10">
                <span className="text-[10px] font-bold text-white/70 tracking-wide">MASTERCARD</span>
              </div>
              {/* CB */}
              <div className="flex items-center justify-center h-7 px-3 rounded-md bg-white/10 border border-white/10">
                <span className="text-[10px] font-bold text-white/70 tracking-wide">CB</span>
              </div>
              {/* Virement */}
              <div className="flex items-center justify-center h-7 px-3 rounded-md bg-white/10 border border-white/10">
                <span className="text-[10px] font-bold text-white/70 tracking-wide">VIREMENT</span>
              </div>
              {/* Divider */}
              <div className="w-px h-5 bg-white/20 mx-1" />
              {/* SSL */}
              <div className="flex items-center gap-1 h-7 px-3 rounded-md bg-green-900/40 border border-green-700/30">
                <Shield size={11} className="text-green-400" />
                <span className="text-[10px] font-bold text-green-400">SÉCURISÉ SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
