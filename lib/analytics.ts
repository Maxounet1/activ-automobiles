'use client';

type EventName =
  | 'click_call'
  | 'click_whatsapp'
  | 'submit_lead'
  | 'submit_finance'
  | 'submit_tradein'
  | 'start_reservation'
  | 'complete_reservation'
  | 'view_vehicle'
  | 'click_vehicle'
  | 'search_vehicles'
  | 'click_agency'
  | 'view_financing'
  | 'click_cta'
  | 'catalog_filter_apply'
  | 'catalog_sort_change'
  | 'vehicle_card_view'
  | 'submit_callback';

interface EventProperties {
  vehicleId?: string;
  vehicleSlug?: string;
  brand?: string;
  model?: string;
  price?: number;
  agencyId?: string;
  agencyCity?: string;
  source?: string;
  value?: number;
  [key: string]: unknown;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: EventName, properties?: EventProperties): void {
  if (typeof window === 'undefined') return;

  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event, properties);
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', event, {
      event_category: 'engagement',
      ...properties,
    });
  }

  if (typeof window.fbq === 'function') {
    const fbEventMap: Record<string, string> = {
      submit_lead: 'Lead',
      complete_reservation: 'Purchase',
      view_vehicle: 'ViewContent',
      search_vehicles: 'Search',
    };
    const fbEvent = fbEventMap[event];
    if (fbEvent) {
      window.fbq('track', fbEvent, properties);
    }
  }
}
