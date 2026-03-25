'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Car, MessageSquare, Star, Calendar, TrendingUp, AlertCircle } from 'lucide-react';

interface Stats {
  totalLeads: number;
  newLeads: number;
  totalReservations: number;
  pendingReservations: number;
  totalVehicles: number;
  availableVehicles: number;
  totalReviews: number;
  pendingReviews: number;
}

function StatCard({ title, value, sub, icon: Icon, accent }: {
  title: string;
  value: number | string;
  sub?: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent?: boolean;
}) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: accent ? 'linear-gradient(135deg, rgba(26,63,111,0.15) 0%, rgba(26,63,111,0.05) 100%)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${accent ? 'rgba(26,63,111,0.25)' : 'rgba(255,255,255,0.06)'}`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>{title}</p>
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(26,63,111,0.15)' }}
        >
          <Icon className="w-4 h-4" style={{ color: '#1A3F6F' }} />
        </div>
      </div>
      <p className="text-3xl font-black text-white">{value}</p>
      {sub && (
        <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{sub}</p>
      )}
    </div>
  );
}

export default function AdminDashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [
        { count: totalLeads },
        { count: newLeads },
        { count: totalReservations },
        { count: pendingReservations },
        { count: totalVehicles },
        { count: availableVehicles },
        { count: totalReviews },
      ] = await Promise.all([
        supabase.from('leads').select('id', { count: 'exact', head: true }),
        supabase.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('reservations').select('id', { count: 'exact', head: true }),
        supabase.from('reservations').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('vehicles').select('id', { count: 'exact', head: true }),
        supabase.from('vehicles').select('id', { count: 'exact', head: true }).eq('available', true),
        supabase.from('reviews').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        totalLeads: totalLeads ?? 0,
        newLeads: newLeads ?? 0,
        totalReservations: totalReservations ?? 0,
        pendingReservations: pendingReservations ?? 0,
        totalVehicles: totalVehicles ?? 0,
        availableVehicles: availableVehicles ?? 0,
        totalReviews: totalReviews ?? 0,
        pendingReviews: 0,
      });
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-2xl h-28 animate-pulse" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }} />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Leads total"
          value={stats.totalLeads}
          sub={`${stats.newLeads} nouveau${stats.newLeads > 1 ? 'x' : ''}`}
          icon={MessageSquare}
          accent={stats.newLeads > 0}
        />
        <StatCard
          title="Réservations"
          value={stats.totalReservations}
          sub={`${stats.pendingReservations} en attente`}
          icon={Calendar}
          accent={stats.pendingReservations > 0}
        />
        <StatCard
          title="Véhicules"
          value={stats.totalVehicles}
          sub={`${stats.availableVehicles} disponibles`}
          icon={Car}
        />
        <StatCard
          title="Avis clients"
          value={stats.totalReviews}
          icon={Star}
        />
      </div>

      {/* Activity section */}
      {stats.newLeads > 0 && (
        <div
          className="flex items-center gap-3 p-4 rounded-xl"
          style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#f59e0b' }} />
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
            <strong className="text-white">{stats.newLeads} nouveau{stats.newLeads > 1 ? 'x leads' : ' lead'}</strong> en attente de traitement
          </p>
        </div>
      )}
    </div>
  );
}
