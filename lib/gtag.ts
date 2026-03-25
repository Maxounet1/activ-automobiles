export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackVehicleView = (vehicleId: string, vehicleName: string) => {
  event({
    action: 'view_vehicle',
    category: 'Vehicle',
    label: `${vehicleName} (${vehicleId})`,
  });
};

export const trackLeadSubmit = (leadType: string, source: string) => {
  event({
    action: 'submit_lead',
    category: 'Lead',
    label: `${leadType} - ${source}`,
  });
};

export const trackComparatorAdd = (vehicleId: string) => {
  event({
    action: 'add_to_comparator',
    category: 'Comparator',
    label: vehicleId,
  });
};

export const trackCallClick = (phoneNumber: string, source: string) => {
  event({
    action: 'click_call',
    category: 'Contact',
    label: `${phoneNumber} - ${source}`,
  });
};

export const trackFinanceSimulation = (vehiclePrice: number, monthlyPayment: number) => {
  event({
    action: 'simulate_finance',
    category: 'Finance',
    label: `Price: ${vehiclePrice}€`,
    value: monthlyPayment,
  });
};

export const trackSearch = (searchTerm: string, resultsCount: number) => {
  event({
    action: 'search',
    category: 'Search',
    label: searchTerm,
    value: resultsCount,
  });
};
