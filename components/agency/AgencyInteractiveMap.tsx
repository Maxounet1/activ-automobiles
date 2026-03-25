'use client';

import { useEffect, useRef, useState } from 'react';
import { Building2, ChevronRight, MousePointer2 } from 'lucide-react';
import Link from 'next/link';
import type { Agency } from '@/lib/types';

interface DeliveryPoint {
  city: string;
  lat: number;
  lng: number;
  dept: string;
}

const DELIVERY_POINTS: DeliveryPoint[] = [
  { city: 'Paris', lat: 48.8566, lng: 2.3522, dept: '75' },
  { city: 'Lyon', lat: 45.7640, lng: 4.8357, dept: '69' },
  { city: 'Marseille', lat: 43.2965, lng: 5.3698, dept: '13' },
  { city: 'Toulouse', lat: 43.6047, lng: 1.4442, dept: '31' },
  { city: 'Strasbourg', lat: 48.5734, lng: 7.7521, dept: '67' },
  { city: 'Nantes', lat: 47.2184, lng: -1.5536, dept: '44' },
  { city: 'Montpellier', lat: 43.6108, lng: 3.8767, dept: '34' },
  { city: 'Lille', lat: 50.6292, lng: 3.0573, dept: '59' },
  { city: 'Nice', lat: 43.7102, lng: 7.2620, dept: '06' },
  { city: 'Grenoble', lat: 45.1885, lng: 5.7245, dept: '38' },
  { city: 'Dijon', lat: 47.3220, lng: 5.0415, dept: '21' },
  { city: 'Angers', lat: 47.4784, lng: -0.5632, dept: '49' },
  { city: 'Reims', lat: 49.2583, lng: 4.0317, dept: '51' },
  { city: 'Rouen', lat: 49.4432, lng: 1.0993, dept: '76' },
  { city: 'Metz', lat: 49.1193, lng: 6.1757, dept: '57' },
  { city: 'Caen', lat: 49.1829, lng: -0.3707, dept: '14' },
  { city: 'Amiens', lat: 49.8942, lng: 2.2957, dept: '80' },
  { city: 'Orléans', lat: 47.9029, lng: 1.9093, dept: '45' },
  { city: 'Clermont-Ferrand', lat: 45.7797, lng: 3.0863, dept: '63' },
  { city: 'Tours', lat: 47.3941, lng: 0.6848, dept: '37' },
  { city: 'Limoges', lat: 45.8336, lng: 1.2611, dept: '87' },
  { city: 'Poitiers', lat: 46.5802, lng: 0.3404, dept: '86' },
  { city: 'La Rochelle', lat: 46.1603, lng: -1.1511, dept: '17' },
  { city: 'Pau', lat: 43.2951, lng: -0.3708, dept: '64' },
  { city: 'Perpignan', lat: 42.6986, lng: 2.8954, dept: '66' },
  { city: 'Besançon', lat: 47.2378, lng: 6.0241, dept: '25' },
  { city: 'Brest', lat: 48.3905, lng: -4.4860, dept: '29' },
  { city: 'Le Mans', lat: 48.0061, lng: 0.1996, dept: '72' },
  { city: 'Gap', lat: 44.5594, lng: 6.0798, dept: '05' },
  { city: 'Auxerre', lat: 47.7978, lng: 3.5736, dept: '89' },
  { city: 'Mâcon', lat: 46.3063, lng: 4.8327, dept: '71' },
  { city: 'Chartres', lat: 48.4469, lng: 1.4888, dept: '28' },
  { city: 'Évreux', lat: 49.0232, lng: 1.1511, dept: '27' },
  { city: 'Laon', lat: 49.5645, lng: 3.6242, dept: '02' },
  { city: 'Carcassonne', lat: 43.2130, lng: 2.3491, dept: '11' },
  { city: 'Nîmes', lat: 43.8367, lng: 4.3601, dept: '30' },
  { city: 'Vannes', lat: 47.6559, lng: -2.7604, dept: '56' },
  { city: 'Saint-Brieuc', lat: 48.5134, lng: -2.7667, dept: '22' },
  { city: 'Alençon', lat: 48.4313, lng: 0.0908, dept: '61' },
  { city: 'Saint-Lô', lat: 49.1148, lng: -1.0883, dept: '50' },
  { city: 'Cherbourg', lat: 49.6339, lng: -1.6220, dept: '50' },
  { city: 'Niort', lat: 46.3238, lng: -0.4586, dept: '79' },
  { city: 'Bourges', lat: 47.0810, lng: 2.3988, dept: '18' },
  { city: 'Nevers', lat: 46.9895, lng: 3.1596, dept: '58' },
  { city: 'Moulins', lat: 46.5652, lng: 3.3344, dept: '03' },
  { city: 'Privas', lat: 44.7354, lng: 4.5984, dept: '07' },
  { city: 'Valence', lat: 44.9334, lng: 4.8924, dept: '26' },
  { city: 'Digne-les-Bains', lat: 44.0919, lng: 6.2358, dept: '04' },
  { city: 'Foix', lat: 42.9652, lng: 1.6073, dept: '09' },
  { city: 'Auch', lat: 43.6460, lng: 0.5855, dept: '32' },
  { city: 'Cahors', lat: 44.4480, lng: 1.4405, dept: '46' },
  { city: 'Rodez', lat: 44.3490, lng: 2.5750, dept: '12' },
  { city: 'Albi', lat: 43.9292, lng: 2.1481, dept: '81' },
  { city: 'Mont-de-Marsan', lat: 43.8908, lng: -0.4990, dept: '40' },
  { city: 'Agen', lat: 44.2004, lng: 0.6211, dept: '47' },
  { city: 'Périgueux', lat: 45.1838, lng: 0.7211, dept: '24' },
  { city: 'Angoulême', lat: 45.6488, lng: 0.1560, dept: '16' },
  { city: 'Troyes', lat: 48.2973, lng: 4.0744, dept: '10' },
  { city: 'Châlons-en-Champagne', lat: 48.9573, lng: 4.3634, dept: '51' },
  { city: 'Colmar', lat: 48.0794, lng: 7.3580, dept: '68' },
  { city: 'Vesoul', lat: 47.6279, lng: 6.1569, dept: '70' },
  { city: 'Lons-le-Saunier', lat: 46.6732, lng: 5.5541, dept: '39' },
  { city: 'Bourg-en-Bresse', lat: 46.2052, lng: 5.2246, dept: '01' },
  { city: 'Chambéry', lat: 45.5646, lng: 5.9178, dept: '73' },
  { city: 'Annecy', lat: 45.8992, lng: 6.1294, dept: '74' },
  { city: 'Laval', lat: 48.0699, lng: -0.7700, dept: '53' },
  { city: 'Saint-Nazaire', lat: 47.2763, lng: -2.2130, dept: '44' },
  { city: 'Alès', lat: 44.1248, lng: 4.0817, dept: '30' },
  { city: 'Mende', lat: 44.5199, lng: 3.4997, dept: '48' },
  { city: 'Tulle', lat: 45.2683, lng: 1.7716, dept: '19' },
  { city: 'Guéret', lat: 46.1691, lng: 1.8699, dept: '23' },
  { city: 'La Roche-sur-Yon', lat: 46.6705, lng: -1.4264, dept: '85' },
  { city: 'Blois', lat: 47.5861, lng: 1.3359, dept: '41' },
  { city: 'Châteauroux', lat: 46.8133, lng: 1.6936, dept: '36' },
];

interface AgencyInteractiveMapProps {
  agencies: Agency[];
}

function starsHtml(rating: number) {
  const path = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';
  return Array.from({ length: 5 }).map((_, i) => {
    const filled = i < Math.floor(rating);
    const partial = !filled && i < rating;
    const pct = partial ? Math.round((rating % 1) * 100) : 0;
    const uid = `sg-${i}`;
    if (partial) {
      return `<svg width="11" height="11" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${uid}" x1="0" x2="1" y1="0" y2="0"><stop offset="${pct}%" stop-color="#FBBF24"/><stop offset="${pct}%" stop-color="#E5E7EB"/></linearGradient></defs><path d="${path}" fill="url(#${uid})"/></svg>`;
    }
    return `<svg width="11" height="11" viewBox="0 0 24 24" fill="${filled ? '#FBBF24' : '#E5E7EB'}" xmlns="http://www.w3.org/2000/svg"><path d="${path}"/></svg>`;
  }).join('');
}

export default function AgencyInteractiveMap({ agencies }: AgencyInteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<{ remove: () => void; scrollWheelZoom: { enable: () => void; disable: () => void }; dragging: { enable: () => void; disable: () => void }; doubleClickZoom: { enable: () => void; disable: () => void }; boxZoom: { enable: () => void; disable: () => void }; keyboard: { enable: () => void; disable: () => void }; touchZoom: { enable: () => void; disable: () => void } } | null>(null);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    let destroyed = false;

    const initMap = async () => {
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }
      const L = (await import('leaflet')).default;

      if (destroyed || !mapRef.current) return;

      if ((mapRef.current as unknown as { _leaflet_id?: number })._leaflet_id) return;

      const map = L.map(mapRef.current, {
        center: [46.8, 2.3],
        zoom: 6,
        minZoom: 5,
        maxZoom: 12,
        zoomControl: false,
        attributionControl: true,
        scrollWheelZoom: false,
        dragging: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        touchZoom: false,
        maxBounds: [[41.0, -5.5], [51.5, 10.0]],
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap France',
        maxZoom: 20,
        className: 'map-tiles',
      }).addTo(map);

      const showroomIcon = L.divIcon({
        html: `<div style="position:relative;width:44px;height:44px;">
          <div style="position:absolute;inset:0;background:linear-gradient(145deg,#1A3F6F,#0f2847);border-radius:50%;box-shadow:0 4px 16px rgba(26,63,111,0.55),0 0 0 3px rgba(255,255,255,0.9);display:flex;align-items:center;justify-content:center;">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="white" fill-opacity="0.95"/></svg>
          </div>
          <div style="position:absolute;bottom:-5px;left:50%;transform:translateX(-50%);width:8px;height:8px;background:linear-gradient(145deg,#1A3F6F,#0f2847);clip-path:polygon(0 0,100% 0,50% 100%);"></div>
        </div>`,
        className: '',
        iconSize: [44, 50],
        iconAnchor: [22, 50],
        popupAnchor: [0, -54],
      });

      const deliveryIcon = L.divIcon({
        html: `<div style="width:16px;height:16px;background:linear-gradient(145deg,#EA580C,#c2410c);border-radius:50%;border:2.5px solid white;box-shadow:0 2px 8px rgba(234,88,12,0.5);"></div>`,
        className: '',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, -12],
      });

      agencies.forEach((agency) => {
        const stars = starsHtml(agency.rating ?? 4.7);
        const popup = L.popup({
          maxWidth: 280,
          className: 'activ-popup',
        }).setContent(`
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:0;width:256px;">
            <div style="background:linear-gradient(135deg,#1A3F6F 0%,#0f2847 100%);border-radius:12px 12px 0 0;padding:14px 16px 12px;margin:-12px -12px 0 -12px;">
              <div style="display:flex;align-items:center;gap:10px;">
                <div style="width:34px;height:34px;background:rgba(255,255,255,0.15);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;border:1px solid rgba(255,255,255,0.2);">
                  <svg viewBox="0 0 24 24" fill="white" width="16" height="16"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                </div>
                <div>
                  <p style="font-weight:800;color:white;font-size:14px;margin:0;line-height:1.2;">${agency.city}</p>
                  <p style="color:rgba(255,255,255,0.65);font-size:10px;font-weight:600;margin:2px 0 0;text-transform:uppercase;letter-spacing:0.08em;">Agence Activ Automobiles</p>
                </div>
              </div>
            </div>
            <div style="padding:12px 16px 14px;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;">
                <div style="display:flex;align-items:center;gap:2px;">${stars}</div>
                <span style="font-size:12px;font-weight:800;color:#111827;">${agency.rating ?? 4.7}</span>
                <span style="font-size:11px;color:#6b7280;">(${agency.reviewCount ?? 0} avis Google)</span>
              </div>
              <div style="display:flex;align-items:flex-start;gap:6px;margin-bottom:6px;">
                <svg viewBox="0 0 24 24" fill="none" width="13" height="13" style="flex-shrink:0;margin-top:1px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#9ca3af" stroke-width="2"/><circle cx="12" cy="10" r="3" stroke="#9ca3af" stroke-width="2"/></svg>
                <p style="color:#6b7280;font-size:11px;margin:0;line-height:1.5;">${agency.address}, ${agency.zipCode}</p>
              </div>
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:14px;">
                <svg viewBox="0 0 24 24" fill="none" width="13" height="13" style="flex-shrink:0;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.36 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 5.5 5.5l.86-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" stroke="#9ca3af" stroke-width="2"/></svg>
                <a href="tel:${agency.phone.replace(/\s/g, '')}" style="color:#1A3F6F;font-size:12px;font-weight:700;text-decoration:none;">${agency.phone}</a>
              </div>
              <a href="/agences/${agency.slug}" style="display:flex;align-items:center;justify-content:center;gap:6px;background:linear-gradient(135deg,#1A3F6F,#0f2847);color:white;font-size:12px;font-weight:700;padding:9px 16px;border-radius:9px;text-decoration:none;letter-spacing:0.02em;">Voir l'agence <svg viewBox="0 0 24 24" fill="none" width="13" height="13"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
            </div>
          </div>
        `);

        L.marker([agency.lat, agency.lng], { icon: showroomIcon })
          .addTo(map)
          .bindPopup(popup);
      });

      DELIVERY_POINTS.forEach((point) => {
        const popup = L.popup({
          maxWidth: 220,
          className: 'activ-popup',
        }).setContent(`
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:0;width:200px;">
            <div style="background:linear-gradient(135deg,#EA580C,#c2410c);border-radius:12px 12px 0 0;padding:12px 14px 10px;margin:-12px -12px 0 -12px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="width:28px;height:28px;background:rgba(255,255,255,0.15);border-radius:8px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.2);">
                  <svg viewBox="0 0 24 24" fill="white" width="14" height="14"><path d="M1 3h15v13H1zm15 5h4l3 3v5h-7V8zM5.5 18a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/></svg>
                </div>
                <div>
                  <p style="font-weight:800;color:white;font-size:13px;margin:0;">${point.city}</p>
                  <p style="color:rgba(255,255,255,0.65);font-size:9px;font-weight:600;margin:1px 0 0;text-transform:uppercase;letter-spacing:0.08em;">Point de livraison</p>
                </div>
              </div>
            </div>
            <div style="padding:10px 14px 12px;">
              <p style="color:#6b7280;font-size:11px;margin:0 0 10px;line-height:1.5;">Livraison disponible sur demande dans ce secteur.</p>
              <a href="/contact" style="display:flex;align-items:center;justify-content:center;gap:5px;background:linear-gradient(135deg,#EA580C,#c2410c);color:white;font-size:11px;font-weight:700;padding:8px 12px;border-radius:8px;text-decoration:none;">Organiser ma livraison <svg viewBox="0 0 24 24" fill="none" width="11" height="11"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
            </div>
          </div>
        `);

        L.marker([point.lat, point.lng], { icon: deliveryIcon })
          .addTo(map)
          .bindPopup(popup);
      });

      const style = document.createElement('style');
      style.textContent = `
        .map-tiles {
          filter: grayscale(0.15) contrast(1.05) brightness(1.02);
        }
        .leaflet-tile-pane {
          position: relative;
        }
        .leaflet-tile-pane::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(26, 63, 111, 0.12) 0%, rgba(15, 40, 71, 0.06) 50%, rgba(26, 63, 111, 0.09) 100%);
          pointer-events: none;
          z-index: 1;
          mix-blend-mode: multiply;
        }
        .leaflet-container {
          background: #f8fafc !important;
        }
        .activ-popup .leaflet-popup-content-wrapper {
          border-radius: 14px;
          border: none;
          box-shadow: 0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.1);
          padding: 12px;
          overflow: hidden;
        }
        .activ-popup .leaflet-popup-content {
          margin: 0;
          line-height: 1.5;
        }
        .activ-popup .leaflet-popup-tip-container { display: none; }
        .leaflet-control-attribution {
          font-size: 9px !important;
          opacity: 0.5;
          background: rgba(255,255,255,0.85) !important;
          padding: 2px 6px !important;
          border-radius: 4px !important;
        }
        .leaflet-control-zoom a {
          width: 36px !important;
          height: 36px !important;
          line-height: 36px !important;
          border-radius: 10px !important;
          border: none !important;
          background: white !important;
          box-shadow: 0 4px 12px rgba(26, 63, 111, 0.18) !important;
          font-size: 20px !important;
          color: #1A3F6F !important;
          font-weight: 700 !important;
          transition: all 0.2s ease !important;
        }
        .leaflet-control-zoom a:hover {
          background: #1A3F6F !important;
          color: white !important;
          transform: scale(1.05);
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: none !important;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
      `;
      document.head.appendChild(style);

      mapInstanceRef.current = map;
    };

    initMap();

    return () => {
      destroyed = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [agencies]);

  const enableInteraction = () => {
    setInteractive(true);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.scrollWheelZoom.enable();
      mapInstanceRef.current.dragging.enable();
      mapInstanceRef.current.doubleClickZoom.enable();
      mapInstanceRef.current.boxZoom.enable();
      mapInstanceRef.current.keyboard.enable();
      mapInstanceRef.current.touchZoom.enable();
    }
  };

  const disableInteraction = () => {
    setInteractive(false);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.scrollWheelZoom.disable();
      mapInstanceRef.current.dragging.disable();
      mapInstanceRef.current.doubleClickZoom.disable();
      mapInstanceRef.current.boxZoom.disable();
      mapInstanceRef.current.keyboard.disable();
      mapInstanceRef.current.touchZoom.disable();
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3 mb-5">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-gray-100"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(145deg,#1A3F6F,#0f2847)', boxShadow: '0 3px 8px rgba(26,63,111,0.45)' }}
          >
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 leading-tight">Nos agences</p>
            <p className="text-xs text-gray-500 mt-0.5">Showrooms physiques avec conseillers sur place</p>
          </div>
        </div>
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-gray-100"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        >
          <div
            className="w-5 h-5 rounded-full flex-shrink-0"
            style={{ background: 'linear-gradient(145deg,#EA580C,#c2410c)', boxShadow: '0 2px 6px rgba(234,88,12,0.5)', border: '2.5px solid white', outline: '1px solid #e5e7eb' }}
          />
          <div>
            <p className="text-sm font-bold text-gray-900 leading-tight">Points de livraison</p>
            <p className="text-xs text-gray-500 mt-0.5">Livraison à domicile sur demande</p>
          </div>
        </div>
      </div>

      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ height: '500px', boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)' }}
        onMouseLeave={disableInteraction}
      >
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

        {!interactive && (
          <div
            className="absolute inset-0 z-[400] flex flex-col items-center justify-center cursor-pointer transition-all duration-300"
            style={{ background: 'rgba(15, 40, 71, 0.22)', backdropFilter: 'blur(1px)' }}
            onClick={enableInteraction}
          >
            <div
              className="flex flex-col items-center gap-3 px-7 py-5 rounded-2xl transition-transform duration-200 hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.92)', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', border: '1px solid rgba(255,255,255,0.8)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(145deg,#1A3F6F,#0f2847)' }}
              >
                <MousePointer2 className="w-5 h-5 text-white" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-gray-900 leading-tight">Cliquez pour interagir</p>
                <p className="text-xs text-gray-500 mt-1">Explorez la carte librement</p>
              </div>
            </div>
          </div>
        )}

        {interactive && (
          <button
            onClick={disableInteraction}
            className="absolute top-3 right-3 z-[500] flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:opacity-90"
            style={{ background: 'rgba(255,255,255,0.92)', boxShadow: '0 2px 12px rgba(0,0,0,0.15)', color: '#374151', border: '1px solid rgba(255,255,255,0.8)' }}
          >
            Quitter la carte
          </button>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {agencies.map((agency) => (
          <Link
            key={agency.id}
            href={`/agences/${agency.slug}`}
            className="group flex flex-col gap-1.5 p-3.5 rounded-xl border border-gray-200 hover:border-[#1A3F6F]/40 hover:shadow-md transition-all duration-200 bg-white"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(26,63,111,0.08)' }}
              >
                <Building2 className="w-3.5 h-3.5" style={{ color: '#1A3F6F' }} />
              </div>
              <span className="text-xs font-bold text-gray-900 leading-tight">{agency.city}</span>
            </div>
            <p className="text-[10px] font-medium" style={{ color: 'rgba(55,65,81,0.6)' }}>{agency.zipCode}</p>
            <span
              className="text-[10px] font-bold flex items-center gap-1 group-hover:text-[#1A3F6F] transition-colors"
              style={{ color: 'rgba(55,65,81,0.5)' }}
            >
              Voir l&apos;agence
              <ChevronRight className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
