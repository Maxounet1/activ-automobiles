'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { Vehicle } from '@/lib/types';

const MAX_VEHICLES = 3;
const STORAGE_KEY = 'activ-comparator';

interface ComparatorState {
  vehicles: Vehicle[];
  isOpen: boolean;
  addVehicle: (vehicle: Vehicle) => void;
  removeVehicle: (vehicleId: string) => void;
  clearAll: () => void;
  setOpen: (open: boolean) => void;
  isInComparator: (vehicleId: string) => boolean;
}

const ComparatorContext = createContext<ComparatorState>({
  vehicles: [],
  isOpen: false,
  addVehicle: () => {},
  removeVehicle: () => {},
  clearAll: () => {},
  setOpen: () => {},
  isInComparator: () => false,
});

export function ComparatorProvider({ children }: { children: ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setVehicles(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
  }, [vehicles, hydrated]);

  const addVehicle = useCallback((vehicle: Vehicle) => {
    setVehicles((prev) => {
      if (prev.length >= MAX_VEHICLES) return prev;
      if (prev.find((v) => v.id === vehicle.id)) return prev;
      return [...prev, vehicle];
    });
    setIsOpen(true);
  }, []);

  const removeVehicle = useCallback((vehicleId: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
  }, []);

  const clearAll = useCallback(() => {
    setVehicles([]);
    setIsOpen(false);
  }, []);

  const isInComparator = useCallback(
    (vehicleId: string) => vehicles.some((v) => v.id === vehicleId),
    [vehicles]
  );

  return (
    <ComparatorContext.Provider value={{ vehicles, isOpen, addVehicle, removeVehicle, clearAll, setOpen: setIsOpen, isInComparator }}>
      {children}
    </ComparatorContext.Provider>
  );
}

export const useComparator = () => useContext(ComparatorContext);
export { MAX_VEHICLES };
