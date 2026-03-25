import { getSpiderVOVehicles } from '@/lib/spidervo-data';
import type { Vehicle, SearchFilters } from '@/lib/types';

export async function getAllVehicles(): Promise<Vehicle[]> {
  try {
    const vehicles = await getSpiderVOVehicles();
    return vehicles
      .filter((v) => v.available)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  } catch (err) {
    console.error('[vehicles] getAllVehicles error:', err);
    return [];
  }
}

export async function getFeaturedVehicles(limit = 6): Promise<Vehicle[]> {
  try {
    const vehicles = await getSpiderVOVehicles();
    return vehicles
      .filter((v) => v.available)
      .sort((a, b) => b.price - a.price)
      .slice(0, limit);
  } catch (err) {
    console.error('[vehicles] getFeaturedVehicles error:', err);
    return [];
  }
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  try {
    const vehicles = await getSpiderVOVehicles();
    return vehicles.find((v) => v.slug === slug) ?? null;
  } catch (err) {
    console.error('[vehicles] getVehicleBySlug error:', err);
    return null;
  }
}

export async function getVehiclesByBrand(brand: string): Promise<Vehicle[]> {
  try {
    const vehicles = await getSpiderVOVehicles();
    const brandLower = brand.toLowerCase();
    return vehicles.filter(
      (v) => v.available && v.brand.toLowerCase() === brandLower
    );
  } catch (err) {
    console.error('[vehicles] getVehiclesByBrand error:', err);
    return [];
  }
}

export async function getVehiclesByModel(brand: string, model: string): Promise<Vehicle[]> {
  try {
    const vehicles = await getSpiderVOVehicles();
    const brandLower = brand.toLowerCase();
    const modelLower = model.toLowerCase();
    return vehicles.filter(
      (v) =>
        v.available &&
        v.brand.toLowerCase() === brandLower &&
        v.model.toLowerCase() === modelLower
    );
  } catch (err) {
    console.error('[vehicles] getVehiclesByModel error:', err);
    return [];
  }
}

export async function getVehiclesByFuel(fuel: string): Promise<Vehicle[]> {
  try {
    const vehicles = await getSpiderVOVehicles();
    return vehicles.filter((v) => v.available && v.fuel === fuel);
  } catch (err) {
    console.error('[vehicles] getVehiclesByFuel error:', err);
    return [];
  }
}

export async function getVehiclesByBudget(min: number, max: number): Promise<Vehicle[]> {
  try {
    const vehicles = await getSpiderVOVehicles();
    return vehicles.filter(
      (v) => v.available && v.price >= min && v.price <= max
    );
  } catch (err) {
    console.error('[vehicles] getVehiclesByBudget error:', err);
    return [];
  }
}

export async function getVehiclesByAgency(agencyId: string): Promise<Vehicle[]> {
  try {
    const vehicles = await getSpiderVOVehicles();
    return vehicles.filter(
      (v) => v.available && v.agencyId === agencyId
    );
  } catch (err) {
    console.error('[vehicles] getVehiclesByAgency error:', err);
    return [];
  }
}

export async function searchVehiclesWithQuery(
  filters: SearchFilters,
  query?: string
): Promise<Vehicle[]> {
  try {
    const vehicles = await getSpiderVOVehicles();
    let results = vehicles.filter((v) => v.available);

    if (filters.brand) {
      const brandLower = filters.brand.toLowerCase();
      results = results.filter((v) => v.brand.toLowerCase() === brandLower);
    }
    if (filters.model) {
      const modelLower = filters.model.toLowerCase();
      results = results.filter((v) => v.model.toLowerCase() === modelLower);
    }
    if (filters.fuel) {
      results = results.filter((v) => v.fuel === filters.fuel);
    }
    if (filters.bodyType) {
      results = results.filter((v) => v.bodyType === filters.bodyType);
    }
    if (filters.minPrice) {
      results = results.filter((v) => v.price >= filters.minPrice!);
    }
    if (filters.maxPrice) {
      results = results.filter((v) => v.price <= filters.maxPrice!);
    }
    if (filters.minYear) {
      results = results.filter((v) => v.year >= filters.minYear!);
    }
    if (filters.maxYear) {
      results = results.filter((v) => v.year <= filters.maxYear!);
    }
    if (filters.maxMileage) {
      results = results.filter((v) => v.mileage <= filters.maxMileage!);
    }
    if (filters.transmission) {
      results = results.filter((v) => v.transmission === filters.transmission);
    }
    if (filters.agencyId) {
      results = results.filter((v) => v.agencyId === filters.agencyId);
    }
    if (filters.city) {
      const cityLower = filters.city.toLowerCase();
      results = results.filter((v) => v.agencyCity.toLowerCase().includes(cityLower));
    }

    if (query) {
      const ql = query.toLowerCase();
      results = results.filter(
        (v) =>
          v.brand.toLowerCase().includes(ql) ||
          v.model.toLowerCase().includes(ql) ||
          v.version.toLowerCase().includes(ql) ||
          v.agencyCity.toLowerCase().includes(ql)
      );
    }

    return results;
  } catch (err) {
    console.error('[vehicles] searchVehiclesWithQuery error:', err);
    return [];
  }
}

export async function searchVehicles(filters: SearchFilters): Promise<Vehicle[]> {
  return searchVehiclesWithQuery(filters);
}

export async function getAllBrands(): Promise<string[]> {
  try {
    const vehicles = await getSpiderVOVehicles();
    const brands = vehicles.filter((v) => v.available).map((v) => v.brand);
    return Array.from(new Set(brands)).sort();
  } catch (err) {
    console.error('[vehicles] getAllBrands error:', err);
    return [];
  }
}

export async function getModelsByBrand(brand: string): Promise<string[]> {
  try {
    const vehicles = await getSpiderVOVehicles();
    const brandLower = brand.toLowerCase();
    const models = vehicles
      .filter((v) => v.brand.toLowerCase() === brandLower)
      .map((v) => v.model);
    return Array.from(new Set(models)).sort();
  } catch (err) {
    console.error('[vehicles] getModelsByBrand error:', err);
    return [];
  }
}

export async function getRelatedVehicles(vehicle: Vehicle, limit = 3): Promise<Vehicle[]> {
  try {
    const vehicles = await getSpiderVOVehicles();
    return vehicles
      .filter(
        (v) =>
          v.available &&
          v.id !== vehicle.id &&
          v.brand.toLowerCase() === vehicle.brand.toLowerCase()
      )
      .slice(0, limit);
  } catch (err) {
    console.error('[vehicles] getRelatedVehicles error:', err);
    return [];
  }
}
