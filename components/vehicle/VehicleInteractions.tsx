'use client';

import { useState } from 'react';
import ContactModal from './ContactModal';
import MobileStickyBar from './MobileStickyBar';
import { ArrowRight } from 'lucide-react';

interface VehicleInteractionsProps {
  vehicle: {
    brand: string;
    model: string;
    version: string;
    price: number;
    imageUrl: string;
    imageAlt: string;
  };
  agencyPhone: string;
  agencyPhoneTel: string;
}

export default function VehicleInteractions({
  vehicle,
  agencyPhone,
  agencyPhoneTel,
}: VehicleInteractionsProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Primary CTA button (rendered in sidebar via slot) */}
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
        style={{ background: 'linear-gradient(135deg, #1A3F6F, #2563EB)' }}
      >
        Je suis intéressé
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Contact Modal */}
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        vehicle={vehicle}
      />

      {/* Mobile Sticky Bar */}
      <MobileStickyBar
        price={vehicle.price}
        agencyPhone={agencyPhone}
        agencyPhoneTel={agencyPhoneTel}
        onContactClick={() => setModalOpen(true)}
        sentinelId="sidebar-cta-sentinel"
      />
    </>
  );
}
