'use client';

import { motion } from 'framer-motion';
import { BRAND_COLOR } from './SearchStyles';

interface PopularSearch {
  label: string;
  q: string;
  bodyType?: string;
  fuel?: string;
  maxPrice?: string;
  transmission?: string;
  [key: string]: string | undefined;
}

interface SearchPopularTagsProps {
  searches: PopularSearch[];
  onSelect: (search: PopularSearch) => void;
}

export default function SearchPopularTags({ searches, onSelect }: SearchPopularTagsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="mt-5 flex items-center gap-3 flex-wrap justify-center"
    >
      <span className="text-xs text-gray-400 font-medium">Populaires :</span>
      {searches.map((s) => (
        <button
          key={s.label}
          onClick={() => onSelect(s)}
          className="text-xs font-semibold transition-all duration-200 hover:underline hover:opacity-75"
          style={{ color: BRAND_COLOR + 'BB' }}
        >
          {s.label}
        </button>
      ))}
    </motion.div>
  );
}
