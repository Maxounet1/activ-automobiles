'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Star, Check, X, Trash2, Loader2, Search } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  agency_id: string;
  source: string;
  badge: string | null;
  visited_at: string | null;
  reviewer_details: string | null;
  is_approved: boolean;
  created_at: string;
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-3 h-3"
          fill={i < rating ? '#f59e0b' : 'none'}
          style={{ color: i < rating ? '#f59e0b' : 'rgba(255,255,255,0.4)' }}
        />
      ))}
    </div>
  );
}

export default function AdminReviewsTable() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(300);
    setReviews(data ?? []);
    setLoading(false);
  };

  const toggleApproval = async (id: string, current: boolean) => {
    setUpdatingId(id);
    // TODO: Vérifier que les politiques RLS sont configurées pour 'reviews' (update) dans Supabase Dashboard
    await supabase.from('reviews').update({ is_approved: !current }).eq('id', id);
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, is_approved: !current } : r)));
    setUpdatingId(null);
  };

  const deleteReview = async (id: string) => {
    if (!confirm('Supprimer cet avis ?')) return;
    setUpdatingId(id);
    // TODO: Vérifier que les politiques RLS sont configurées pour 'reviews' (delete) dans Supabase Dashboard
    await supabase.from('reviews').delete().eq('id', id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setUpdatingId(null);
  };

  const filtered = reviews.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.author.toLowerCase().includes(q) ||
      r.comment.toLowerCase().includes(q) ||
      r.agency_id.toLowerCase().includes(q)
    );
  });

  const approved = filtered.filter((r) => r.is_approved);
  const pending = filtered.filter((r) => !r.is_approved);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-4">
          <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
            <span className="text-white font-bold">{approved.length}</span> approuvé{approved.length > 1 ? 's' : ''}
          </div>
          {pending.length > 0 && (
            <div className="text-sm" style={{ color: '#f59e0b' }}>
              <span className="font-bold">{pending.length}</span> en attente
            </div>
          )}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="pl-9 pr-4 py-2 rounded-xl text-sm text-white outline-none"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', width: '220px' }}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin" style={{ color: '#1A3F6F' }} />
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['Date', 'Auteur', 'Note', 'Commentaire', 'Agence', 'Source', 'Statut', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      Aucun avis trouvé
                    </td>
                  </tr>
                ) : filtered.map((review) => (
                  <tr
                    key={review.id}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {new Date(review.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-4 py-3 font-medium text-white whitespace-nowrap">
                      {review.author}
                    </td>
                    <td className="px-4 py-3">
                      <StarRow rating={review.rating} />
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '260px' }}>
                        {review.comment}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {review.agency_id}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs capitalize" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}>
                        {review.source}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                          background: review.is_approved ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)',
                          color: review.is_approved ? '#10b981' : '#f59e0b',
                        }}
                      >
                        {review.is_approved ? <Check className="w-3 h-3" /> : <Loader2 className="w-3 h-3" />}
                        {review.is_approved ? 'Approuvé' : 'En attente'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleApproval(review.id, review.is_approved)}
                          disabled={updatingId === review.id}
                          className="p-1.5 rounded-lg transition-colors"
                          style={{
                            background: review.is_approved ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                            color: review.is_approved ? '#ef4444' : '#10b981',
                          }}
                          title={review.is_approved ? 'Désapprouver' : 'Approuver'}
                        >
                          {review.is_approved ? <X className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => deleteReview(review.id)}
                          disabled={updatingId === review.id}
                          className="p-1.5 rounded-lg transition-colors hover:bg-red-500/10"
                          style={{ color: '#ef4444' }}
                          title="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
