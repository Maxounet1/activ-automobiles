'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import AdminAuth from './AdminAuth';
import AdminNav from './AdminNav';
import AdminDashboardStats from './AdminDashboardStats';
import AdminLeadsTable from './AdminLeadsTable';
import AdminReviewsTable from './AdminReviewsTable';
import AdminVehiclesTable from './AdminVehiclesTable';

type AdminTab = 'dashboard' | 'vehicles' | 'leads' | 'reviews';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(!!data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(180deg, #0B1829 0%, #111827 100%)' }}
      >
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#1A3F6F', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminAuth onSuccess={() => setIsAuthenticated(true)} />;
  }

  const TAB_TITLES: Record<AdminTab, string> = {
    dashboard: 'Tableau de bord',
    vehicles: 'Gestion des véhicules',
    leads: 'Leads & Réservations',
    reviews: 'Avis clients',
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0B1829' }}>
      <AdminNav activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header
          className="flex-shrink-0 flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <h1 className="text-white font-black text-lg">{TAB_TITLES[activeTab]}</h1>
          <div className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Connecté
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {activeTab === 'dashboard' && <AdminDashboardStats />}
          {activeTab === 'vehicles' && <AdminVehiclesTable />}
          {activeTab === 'leads' && <AdminLeadsTable />}
          {activeTab === 'reviews' && <AdminReviewsTable />}
        </div>
      </main>
    </div>
  );
}
