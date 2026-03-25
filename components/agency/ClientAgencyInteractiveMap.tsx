'use client';

import dynamic from 'next/dynamic';
import type { Agency } from '@/lib/types';

const AgencyInteractiveMap = dynamic(
  () => import('@/components/agency/AgencyInteractiveMap'),
  { ssr: false }
);

interface Props {
  agencies: Agency[];
}

export default function ClientAgencyInteractiveMap({ agencies }: Props) {
  return <AgencyInteractiveMap agencies={agencies} />;
}
