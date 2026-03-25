import Link from 'next/link';
import { ChevronRight, Chrome as Home } from 'lucide-react';
import BreadcrumbSchema from './BreadcrumbSchema';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const allItems = [{ name: 'Accueil', url: '/' }, ...items];

  return (
    <>
      <BreadcrumbSchema items={allItems} />
      <nav
        aria-label="Fil d'Ariane"
        className={`flex items-center gap-2 text-sm ${className}`}
      >
        <Link
          href="/"
          className="flex items-center gap-1.5 transition-colors hover:text-blue-900"
          style={{ color: 'rgba(15,25,45,0.55)' }}
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Accueil</span>
        </Link>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={item.url} className="flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5" style={{ color: 'rgba(15,25,45,0.25)' }} />
              {isLast ? (
                <span
                  className="font-medium"
                  style={{ color: 'rgba(15,25,45,0.85)' }}
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="transition-colors hover:text-blue-900"
                  style={{ color: 'rgba(15,25,45,0.55)' }}
                >
                  {item.name}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
