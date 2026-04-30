'use client';

import { useEffect, useState } from 'react';
import { CarCard } from '@/components/CarCard';
import { BookingModal } from '@/components/BookingModal';
import { Hero } from '@/components/Hero';
import { getCars, initializeCars } from '@/lib/cars';
import { Car } from '@/types/car';
import { format, differenceInDays } from 'date-fns';
import { Plane, BadgeCheck, Clock, ShieldCheck, MapPin } from 'lucide-react';

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCars = async () => {
      try {
        await initializeCars();
        const data = await getCars();
        setCars(data);
      } catch (error) {
        console.error('[v0] Error loading cars:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCars();
  }, []);

  const handleDatesChange = (start: Date, end: Date, location: string) => {
    setStartDate(start);
    setEndDate(end);
    document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getDaysCount = (): number => {
    if (!startDate || !endDate) return 1;
    const days = differenceInDays(endDate, startDate);
    return Math.max(1, days);
  };

  const handleBookCar = (car: Car) => {
    if (!startDate || !endDate) {
      alert("Veuillez d'abord sélectionner vos dates de location dans la barre de recherche en haut de la page.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSelectedCar(car);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement de la flotte...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white">
      <Hero onDatesChange={handleDatesChange} />

      {/* Trust strip - Localized to Algiers */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Plane, t: "Livraison Aéroport", s: "Alger Houari Boumédiène" },
              { icon: BadgeCheck, t: "Tarifs en DZD", s: "Sans frais cachés" },
              { icon: Clock, t: "Réponse rapide", s: "Confirmation WhatsApp" },
              { icon: ShieldCheck, t: "Conditions claires", s: "Permis +2 ans, caution" },
            ].map(({ icon: Icon, t, s }) => (
              <div key={t} className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2.5 rounded-lg text-blue-600 shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{t}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="fleet" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="max-w-2xl">
              <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Notre Flotte</p>
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                {cars.length} Véhicules <span className="text-blue-600">Disponibles</span>
              </h2>
              <p className="text-gray-500 mt-4 text-lg">
                Sélectionnez vos dates pour voir les disponibilités en temps réel.
              </p>
            </div>
            {startDate && endDate && (
              <div className="bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
                <span className="text-blue-700 font-semibold text-sm">
                  {cars.filter(c => !c.inMaintenance).length} disponibles pour vos dates
                </span>
              </div>
            )}
          </div>

          {cars.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500 text-lg">Aucun véhicule ne correspond à votre recherche.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  daysCount={getDaysCount()}
                  onBook={handleBookCar}
                  isAvailable={!car.inMaintenance}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Conditions Section - Inspired by the reference */}
      <section id="conditions" className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <p className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-2 text-center">Conditions de location</p>
            <h2 className="text-4xl font-extrabold mb-12 tracking-tight text-center">Simple, transparent, sans surprise.</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { t: "Permis de conduire +2 ans", s: "Le conducteur doit présenter un permis valide depuis au moins 2 ans." },
                { t: "Caution obligatoire", s: "Une caution est demandée à la livraison, restituée intégralement au retour." },
                { t: "Livraison Aéroport d'Alger", s: "Service gratuit de livraison et reprise à l'aéroport Houari Boumédiène." },
                { t: "Pièce d'identité", s: "Carte d'identité nationale ou passeport requis pour finaliser la location." },
              ].map((c) => (
                <div key={c.t} className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <h4 className="font-bold text-white mb-2">{c.t}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{c.s}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-gray-400 text-lg">
                Toutes nos réservations se font directement via WhatsApp pour une réponse rapide et personnalisée.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Booking Modal */}
      {selectedCar && startDate && endDate && (
        <BookingModal
          car={selectedCar}
          startDate={format(startDate, 'MMM dd, yyyy')}
          endDate={format(endDate, 'MMM dd, yyyy')}
          totalPrice={selectedCar.pricePerDay * getDaysCount()}
          onClose={() => setSelectedCar(null)}
        />
      )}
    </main>
  );
}
