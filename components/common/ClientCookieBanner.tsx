'use client';

import dynamic from 'next/dynamic';

const CookieBanner = dynamic(() => import('@/components/common/CookieBanner'), { ssr: false });

export default function ClientCookieBanner() {
  return <CookieBanner />;
}
