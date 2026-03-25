'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { CheckCircle, Clock, XCircle, ChevronDown, Search, Loader2, Calendar } from 'lucide-react';

interface Lead {
  id: string;
  type: string;
  vehicle_id: string | null;
  agency_id: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string | null;
  preferred_date: string | null;
  status: string;
  created_at: string;
}

interface Reservation {
  id: string;
  vehicle_id: string;
  vehicle_slug: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  agency_name: string;
  preferred_date: string;
  time_slot: string;
  reservation_number: string;
  status: string;
  deposit_paid: boolean;
  created_at: string;
}

const STATUS_LABELS: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  new: { label: 'Nouveau', color: '#f59e0b', icon: <Clock className="w-3 h-3" /> },
  contacted: { label: 'Contacté', color: '#3b82f6', icon: <CheckCircle className="w-3 h-3" /> },
  closed: { label: 'Fermé', color: '#6b7280', icon: <XCircle className="w-3 h-3" /> },
  pending: { label: 'En attente', color: '#f59e0b', icon: <Clock className="w-3 h-3" /> },
  confirmed: { label: 'Confirmé', color: '#10b981', icon: <CheckCircle className="w-3 h-3" /> },
  cancelled: { label: 'Annulé', color: '#ef4444', icon: <XCircle className="w-3 h-3" /> },
};

const TYPE_LABELS: Record<string, string> = {
  info: 'Info véhicule',
  financement: 'Financement',
  reprise: 'Reprise',
  reservation: 'Réservation',
  essai: 'Essai',
  callback: 'Rappel',
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_LABELS[status] ?? { label: status, color: '#6b7280', icon: null };
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: `${s.color}18`, color: s.color }}
    >
      {s.icon}
      {s.label}
    </span>
  );
}

export default function AdminLeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [activeTab, setActiveTab] = useState<'leads' | 'reservations'>('leads');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [{ data: leadsData }, { data: resData }] = await Promise.all([
      supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(200),
      supabase.from('reservations').select('*').order('created_at', { ascending: false }).limit(200),
    ]);
    setLeads(leadsData ?? []);
    setReservations(resData ?? []);
    setLoading(false);
  };

  const updateLeadStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    // TODO: Vérifier que les politiques RLS sont configurées pour 'leads' (update) dans Supabase Dashboard
    await supabase.from('leads').update({ status }).eq('id', id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    setUpdatingId(null);
  };

  const updateReservationStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    // TODO: Vérifier que les politiques RLS sont configurées pour 'reservations' (update) dans Supabase Dashboard
    await supabase.from('reservations').update({ status }).eq('id', id);
    setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    setUpdatingId(null);
  };

  const filteredLeads = leads.filter((l) => {
    const q = search.toLowerCase();
    return (
      l.first_name.toLowerCase().includes(q) ||
      l.last_name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.phone.includes(q)
    );
  });

  const filteredReservations = reservations.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.first_name.toLowerCase().includes(q) ||
      r.last_name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.reservation_number.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
          {(['leads', 'reservations'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: activeTab === tab ? 'rgba(26,63,111,0.2)' : 'transparent',
                color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.5)',
                border: activeTab === tab ? '1px solid rgba(26,63,111,0.3)' : '1px solid transparent',
              }}
            >
              {tab === 'leads' ? `Leads (${leads.length})` : `Réservations (${reservations.length})`}
            </button>
          ))}
        </div>

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

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin" style={{ color: '#1A3F6F' }} />
        </div>
      ) : activeTab === 'leads' ? (
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['Date', 'Nom', 'Email', 'Téléphone', 'Type', 'Véhicule', 'Statut', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      Aucun lead trouvé
                    </td>
                  </tr>
                ) : filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {new Date(lead.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-4 py-3 font-medium text-white whitespace-nowrap">
                      {lead.first_name} {lead.last_name}
                    </td>
                    <td className="px-4 py-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      <a href={`mailto:${lead.email}`} className="hover:text-white transition-colors">{lead.email}</a>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      <a href={`tel:${lead.phone}`} className="hover:text-white transition-colors">{lead.phone}</a>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)' }}>
                        {TYPE_LABELS[lead.type] ?? lead.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {lead.vehicle_id ?? '—'}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          disabled={updatingId === lead.id}
                          className="text-xs rounded-lg px-2 py-1 outline-none appearance-none pr-6 cursor-pointer"
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
                        >
                          <option value="new">Nouveau</option>
                          <option value="contacted">Contacté</option>
                          <option value="closed">Fermé</option>
                        </select>
                        <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['Numéro', 'Date', 'Client', 'Email', 'Agence', 'RDV', 'Créneau', 'Statut', 'Action'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredReservations.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-10 text-center text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      Aucune réservation trouvée
                    </td>
                  </tr>
                ) : filteredReservations.map((res) => (
                  <tr
                    key={res.id}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-xs font-bold" style={{ color: '#1A3F6F' }}>
                      {res.reservation_number}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {new Date(res.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-4 py-3 font-medium text-white whitespace-nowrap">
                      {res.first_name} {res.last_name}
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      <a href={`mailto:${res.email}`} className="hover:text-white transition-colors">{res.email}</a>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      {res.agency_name}
                    </td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      {res.preferred_date
                        ? new Date(res.preferred_date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })
                        : '—'}
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      {res.time_slot || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={res.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative">
                        <select
                          value={res.status}
                          onChange={(e) => updateReservationStatus(res.id, e.target.value)}
                          disabled={updatingId === res.id}
                          className="text-xs rounded-lg px-2 py-1 outline-none appearance-none pr-6 cursor-pointer"
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
                        >
                          <option value="pending">En attente</option>
                          <option value="confirmed">Confirmé</option>
                          <option value="cancelled">Annulé</option>
                        </select>
                        <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
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
