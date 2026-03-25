export type FuelType = 'essence' | 'diesel' | 'hybride' | 'electrique' | 'gpl' | 'hybride-rechargeable';
export type BodyType = 'berline' | 'suv' | 'break' | 'citadine' | 'coupe' | 'cabriolet' | 'monospace' | 'utilitaire';
export type TransmissionType = 'manuelle' | 'automatique';
export type VehicleCondition = 'occasion' | 'neuf' | 'km0';

export interface VehicleImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  label?: string;
}

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  mileage: number;
  price: number;
  monthlyPrice?: number;
  fuel: FuelType;
  transmission: TransmissionType;
  bodyType: BodyType;
  condition: VehicleCondition;
  color: string;
  doors: number;
  seats: number;
  power: number;
  co2: number;
  description: string;
  images: VehicleImage[];
  agencyId: string;
  agencyCity: string;
  available: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  options: string[];
  vin?: string;
  dtp?: string;
}

export interface Agency {
  id: string;
  slug: string;
  name: string;
  city: string;
  address: string;
  zipCode: string;
  phone: string;
  email: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
  openingHours: {
    day: string;
    hours: string;
  }[];
  services: string[];
  rating: number;
  reviewCount: number;
}

export interface Lead {
  id?: string;
  type: 'info' | 'financement' | 'reprise' | 'reservation';
  vehicleId?: string;
  agencyId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  createdAt?: string;
}

export interface FinanceLead extends Lead {
  type: 'financement';
  apport: number;
  duree: number;
  mensualiteSouhaitee?: number;
}

export interface TradeInLead extends Lead {
  type: 'reprise';
  tradeBrand: string;
  tradeModel: string;
  tradeYear: number;
  tradeMileage: number;
  tradeFuel: string;
}

export interface Reservation {
  id: string;
  vehicleId: string;
  agencyId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  depositAmount: number;
  depositPaid: boolean;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  preferredDate?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  publishedAt: string;
  readTime: number;
  featured: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  agencyId: string;
  date: string;
  source: 'google' | 'facebook' | 'site';
  badge?: string;
  visitedAt?: string;
  reviewerDetails?: string;
}

export interface SearchFilters {
  brand?: string;
  model?: string;
  fuel?: FuelType;
  bodyType?: BodyType;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  maxMileage?: number;
  transmission?: TransmissionType;
  agencyId?: string;
  city?: string;
}

export interface BudgetRange {
  label: string;
  slug: string;
  min: number;
  max: number;
}

export type VehicleBadge = 'nouveaute' | 'bon-plan' | 'faible-km' | 'coup-de-coeur' | 'promo';

export interface CatalogFilters {
  search: string;
  brands: string[];
  models: string[];
  fuels: FuelType[];
  bodyTypes: BodyType[];
  transmissions: TransmissionType[];
  minPrice: number;
  maxPrice: number;
  minYear: number;
  maxYear: number;
  maxMileage: number;
  cities: string[];
  quickFilters: QuickFilter[];
}

export type QuickFilter =
  | 'budget-10k'
  | 'budget-15k'
  | 'budget-20k'
  | 'budget-30k'
  | 'automatique'
  | 'hybride'
  | 'suv'
  | 'faible-km'
  | 'nouveaute';

export type SortOption =
  | 'pertinence'
  | 'prix-asc'
  | 'prix-desc'
  | 'km-asc'
  | 'annee-desc'
  | 'nouveaute';
