'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Search, Pencil, Trash2, Eye, EyeOff, Loader2, X, Check, ChevronUp, ChevronDown } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface VehicleRow {
  id: string;
  slug: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  mileage: number;
  price: number;
  fuel: string;
  transmission: string;
  agency_city: string;
  available: boolean;
  featured: boolean;
  created_at: string;
}

const FUEL_LABELS: Record<string, string> = {
  essence: 'Essence',
  diesel: 'Diesel',
  hybride: 'Hybride',
  electrique: 'Électrique',
  gpl: 'GPL',
  'hybride-rechargeable': 'H. Rechargeable',
};

type SortField = 'brand' | 'price' | 'year' | 'mileage' | 'created_at';

export default function AdminVehiclesTable() {
  const [vehicles, setVehicles] = useState<VehicleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('vehicles')
      .select('id, slug, brand, model, version, year, mileage, price, fuel, transmission, agency_city, available, featured, created_at')
      .order('created_at', { ascending: false })
      .limit(500);
    setVehicles(data ?? []);
    setLoading(false);
  };

  const toggleAvailable = async (id: string, current: boolean) => {
    setUpdatingId(id);
    // TODO: Vérifier que les politiques RLS sont configurées pour 'vehicles' (update) dans Supabase Dashboard
    await supabase.from('vehicles').update({ available: !current }).eq('id', id);
    setVehicles((prev) => prev.map((v) => (v.id === id ? { ...v, available: !current } : v)));
    setUpdatingId(null);
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    setUpdatingId(id);
    // TODO: Vérifier que les politiques RLS sont configurées pour 'vehicles' (update) dans Supabase Dashboard
    await supabase.from('vehicles').update({ featured: !current }).eq('id', id);
    setVehicles((prev) => prev.map((v) => (v.id === id ? { ...v, featured: !current } : v)));
    setUpdatingId(null);
  };

  const deleteVehicle = async (id: string, slug: string) => {
    if (!confirm(`Supprimer le véhicule ${slug} ?`)) return;
    setUpdatingId(id);
    // TODO: Vérifier que les politiques RLS sont configurées pour 'vehicles' (delete) dans Supabase Dashboard
    await supabase.from('vehicles').delete().eq('id', id);
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    setUpdatingId(null);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const filtered = vehicles
    .filter((v) => {
      const q = search.toLowerCase();
      return (
        v.brand.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.version.toLowerCase().includes(q) ||
        v.agency_city.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const mult = sortDir === 'asc' ? 1 : -1;
      if (sortField === 'brand') return mult * a.brand.localeCompare(b.brand);
      if (sortField === 'price') return mult * (a.price - b.price);
      if (sortField === 'year') return mult * (a.year - b.year);
      if (sortField === 'mileage') return mult * (a.mileage - b.mileage);
      return mult * (new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronUp className="w-3 h-3 opacity-20" />;
    return sortDir === 'asc' ? <ChevronUp className="w-3 h-3" style={{ color: '#1A3F6F' }} /> : <ChevronDown className="w-3 h-3" style={{ color: '#1A3F6F' }} />;
  };

  const available = vehicles.filter((v) => v.available).length;
  const featured = vehicles.filter((v) => v.featured).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-4 text-sm">
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>
            <span className="text-white font-bold">{vehicles.length}</span> véhicules
          </span>
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>
            <span className="font-bold" style={{ color: '#10b981' }}>{available}</span> disponibles
          </span>
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>
            <span className="font-bold" style={{ color: '#f59e0b' }}>{featured}</span> mis en avant
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="pl-9 pr-4 py-2 rounded-xl text-sm text-white outline-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', width: '220px' }}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin" style={{ color: '#1A3F6F' }} />
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <th
                    className="px-4 py-3 text-left text-xs font-semibold cursor-pointer select-none"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                    onClick={() => handleSort('brand')}
                  >
                    <span className="flex items-center gap-1">Véhicule <SortIcon field="brand" /></span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>Carburant</th>
                  <th
                    className="px-4 py-3 text-left text-xs font-semibold cursor-pointer select-none"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                    onClick={() => handleSort('year')}
                  >
                    <span className="flex items-center gap-1">Année <SortIcon field="year" /></span>
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-semibold cursor-pointer select-none"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                    onClick={() => handleSort('mileage')}
                  >
                    <span className="flex items-center gap-1">Km <SortIcon field="mileage" /></span>
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-semibold cursor-pointer select-none"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                    onClick={() => handleSort('price')}
                  >
                    <span className="flex items-center gap-1">Prix <SortIcon field="price" /></span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>Agence</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>Dispo</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>Mise en avant</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-10 text-center text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      Aucun véhicule trouvé
                    </td>
                  </tr>
                ) : filtered.map((vehicle) => (
                  <tr
                    key={vehicle.id}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <p className="font-semibold text-white">{vehicle.brand} {vehicle.model}</p>
                      <p className="text-xs mt-0.5 truncate max-w-[180px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{vehicle.version}</p>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      {FUEL_LABELS[vehicle.fuel] ?? vehicle.fuel}
                    </td>
                    <td className="px-4 py-3 text-xs text-white">{vehicle.year}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      {vehicle.mileage.toLocaleString('fr-FR')} km
                    </td>
                    <td className="px-4 py-3 font-bold text-white">{formatPrice(vehicle.price)}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{vehicle.agency_city}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleAvailable(vehicle.id, vehicle.available)}
                        disabled={updatingId === vehicle.id}
                        className="p-1.5 rounded-lg transition-colors"
                        style={{
                          background: vehicle.available ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.1)',
                          color: vehicle.available ? '#10b981' : '#ef4444',
                        }}
                      >
                        {vehicle.available ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleFeatured(vehicle.id, vehicle.featured)}
                        disabled={updatingId === vehicle.id}
                        className="p-1.5 rounded-lg transition-colors"
                        style={{
                          background: vehicle.featured ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.05)',
                          color: vehicle.featured ? '#f59e0b' : 'rgba(255,255,255,0.3)',
                        }}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`/voitures-occasion/${vehicle.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
                          style={{ color: 'rgba(255,255,255,0.5)' }}
                          title="Voir la fiche"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => deleteVehicle(vehicle.id, vehicle.slug)}
                          disabled={updatingId === vehicle.id}
                          className="p-1.5 rounded-lg transition-colors hover:bg-red-500/10"
                          style={{ color: '#ef4444' }}
                          title="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
