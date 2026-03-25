'use client';

import dynamic from 'next/dynamic';

const ComparatorBar = dynamic(() => import('@/components/comparator/ComparatorBar'), { ssr: false });

export default function ClientComparatorBar() {
  return <ComparatorBar />;
}
