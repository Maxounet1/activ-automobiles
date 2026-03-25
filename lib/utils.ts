import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Vehicle, BudgetRange, FuelType } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(mileage: number): string {
  return new Intl.NumberFormat('fr-FR').format(mileage) + ' km';
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('fr-FR').format(n);
}

export function calculateMonthlyPayment(price: number, apport: number = 0, duree: number = 60, taux: number = 5.9): number {
  const safePrice = Math.max(0, price || 0);
  const safeApport = Math.max(0, Math.min(apport || 0, safePrice));
  const safeDuree = Math.max(1, duree || 60);
  const safeTaux = Math.max(0, taux || 0);
  const montant = safePrice - safeApport;
  if (montant <= 0) return 0;
  const tauxMensuel = safeTaux / 100 / 12;
  if (tauxMensuel === 0) return Math.round(montant / safeDuree);
  const mensualite = (montant * tauxMensuel * Math.pow(1 + tauxMensuel, safeDuree)) / (Math.pow(1 + tauxMensuel, safeDuree) - 1);
  const result = Math.round(mensualite);
  return isFinite(result) ? result : 0;
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getVehicleTitle(vehicle: Vehicle): string {
  return `${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.year}`;
}

export function getFuelLabel(fuel: FuelType): string {
  const labels: Record<FuelType, string> = {
    essence: 'Essence',
    diesel: 'Diesel',
    hybride: 'Hybride',
    electrique: 'Électrique',
    gpl: 'GPL',
    'hybride-rechargeable': 'Hybride Rechargeable',
  };
  return labels[fuel] || fuel;
}

export const BUDGET_RANGES: BudgetRange[] = [
  { label: 'Moins de 10 000 €', slug: 'moins-10000', min: 0, max: 10000 },
  { label: '10 000 € - 15 000 €', slug: '10000-15000', min: 10000, max: 15000 },
  { label: '15 000 € - 20 000 €', slug: '15000-20000', min: 15000, max: 20000 },
  { label: '20 000 € - 30 000 €', slug: '20000-30000', min: 20000, max: 30000 },
  { label: '30 000 € - 40 000 €', slug: '30000-40000', min: 30000, max: 40000 },
  { label: 'Plus de 40 000 €', slug: 'plus-40000', min: 40000, max: 999999 },
];

export const BRANDS = [
  'Audi', 'BMW', 'Citroën', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Mercedes-Benz',
  'Opel', 'Peugeot', 'Renault', 'Seat', 'Skoda', 'Toyota', 'Volkswagen', 'Volvo',
];

export const FUEL_TYPES: { value: FuelType; label: string }[] = [
  { value: 'essence', label: 'Essence' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'hybride', label: 'Hybride' },
  { value: 'electrique', label: 'Électrique' },
  { value: 'hybride-rechargeable', label: 'Hybride Rechargeable' },
  { value: 'gpl', label: 'GPL' },
];

export const PHONE_MAIN = '03 83 97 97 97';
export const PHONE_WHATSAPP = '+33383979797';
export const SITE_URL = 'https://www.activ-automobiles.fr';
export const SITE_NAME = 'Activ Automobiles';
export const SITE_DESCRIPTION = 'Réseau de concessions automobiles - Voitures d\'occasion sélectionnées, financement, reprise et garantie. Paris, Lyon, Bordeaux.';
