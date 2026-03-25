import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AcheterSlugPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/voitures-occasion/${slug}`);
}
