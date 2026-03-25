'use client';

import { Car, MessageSquare, Star, LayoutDashboard, LogOut, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type AdminTab = 'dashboard' | 'vehicles' | 'leads' | 'reviews';

interface Props {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
}

const TABS = [
  { id: 'dashboard' as AdminTab, label: 'Tableau de bord', icon: LayoutDashboard },
  { id: 'vehicles' as AdminTab, label: 'Véhicules', icon: Car },
  { id: 'leads' as AdminTab, label: 'Leads & Réservations', icon: MessageSquare },
  { id: 'reviews' as AdminTab, label: 'Avis clients', icon: Star },
];

export default function AdminNav({ activeTab, onTabChange }: Props) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <aside
      className="w-56 flex-shrink-0 flex flex-col"
      style={{ background: '#0d1426', borderRight: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(26,63,111,0.2)' }}
          >
            <Car className="w-4 h-4" style={{ color: '#1A3F6F' }} />
          </div>
          <div>
            <p className="text-white text-sm font-bold leading-none">Activ Admin</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Back-office</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {TABS.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left group"
              style={{
                background: active ? 'rgba(26,63,111,0.15)' : 'transparent',
                color: active ? '#fff' : 'rgba(255,255,255,0.5)',
                border: active ? '1px solid rgba(26,63,111,0.25)' : '1px solid transparent',
              }}
            >
              <Icon className="w-4 h-4 flex-shrink-0" style={{ color: active ? '#1A3F6F' : undefined }} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight className="w-3 h-3 opacity-50" />}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-white/5"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
