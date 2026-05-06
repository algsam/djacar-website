'use client';

import { DateSelector } from './DateSelector';
import { Plane, ShieldCheck, MapPin, CheckCircle, Percent } from 'lucide-react';

import { getAgencySettings, AgencySettings } from '@/lib/settings';
import { useEffect, useState } from 'react';

interface HeroProps {
  onDatesChange: (startDate: Date, endDate: Date, location: string) => void;
}

export function Hero({ onDatesChange }: HeroProps) {
  const [settings, setSettings] = useState<AgencySettings | null>(null);

  useEffect(() => {
    getAgencySettings().then(setSettings);
  }, []);
  return (
    <div className="relative min-h-[650px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-right bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: 'url("/hero-car-new.png")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-left w-full">
        <div className="max-w-4xl">
          {/* Top Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6 animate-in slide-in-from-top duration-700">
            <Plane className="w-4 h-4 text-blue-400" />
            <span className="text-white text-sm font-medium">Livraison à l'Aéroport d'Alger</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 animate-in slide-in-from-left duration-700 delay-100">
            Louez votre <span className="text-blue-500">citadine</span> à Alger <br className="hidden md:block" />
            en quelques clics.
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-8 animate-in slide-in-from-left duration-700 delay-200">
            Réservation instantanée via WhatsApp. Tarifs transparents en DZD, 
            livraison gratuite à l'aéroport, assistance 7j/7.
          </p>

          {/* Bottom Badges */}
          <div className="flex flex-wrap gap-4 mb-8 animate-in fade-in duration-1000 delay-500">
            {[
              { icon: ShieldCheck, text: "Permis +2 ans" },
              { icon: MapPin, text: "Aéroport d'Alger" },
              { icon: CheckCircle, text: "Caution obligatoire" }
            ].map((badge, i) => (
              <div key={i} className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 px-5 py-2.5 rounded-2xl hover:bg-white/10 transition-colors">
                <badge.icon className="w-4 h-4 text-blue-400" />
                <span className="text-white text-sm font-bold tracking-wide">{badge.text}</span>
              </div>
            ))}
          </div>

          {/* High-Impact Discount Section */}
          {settings?.discounts && settings.discounts.length > 0 && (
            <div className="mb-12 pt-8 animate-in fade-in zoom-in duration-1000 delay-700">
              <div className="inline-block bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-1.5 shadow-2xl relative">
                <div className="flex flex-col lg:flex-row items-stretch overflow-hidden rounded-[1.8rem]">
                  {/* Left Label with Pulsing Icon */}
                  <div className="bg-blue-600 px-8 py-6 flex items-center justify-center gap-4 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <div className="relative">
                      <Percent className="w-8 h-8 text-white animate-pulse" />
                      <div className="absolute -inset-2 bg-white/30 rounded-full blur-md animate-ping" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-black uppercase tracking-tighter text-2xl leading-none">Offres</span>
                      <span className="text-blue-100 font-bold uppercase tracking-widest text-[10px]">Exclusives</span>
                    </div>
                  </div>

                  {/* Tiered Discounts */}
                  <div className="px-8 py-6 flex flex-wrap items-center gap-x-12 gap-y-6">
                    {settings.discounts.sort((a, b) => a.days - b.days).map((tier, i) => {
                      const isBestDeal = i === settings.discounts!.length - 1;
                      const tierColor = i === 0 ? 'text-amber-400' : isBestDeal ? 'text-emerald-400' : 'text-blue-400';
                      const glowColor = i === 0 ? 'shadow-amber-500/20' : isBestDeal ? 'shadow-emerald-500/30' : 'shadow-blue-500/20';

                      return (
                        <div key={i} className="flex flex-col relative group">
                          <span className="text-gray-300 text-lg font-black uppercase tracking-tight mb-1">{tier.days}+ jours</span>
                          <div className={`relative ${tierColor} text-6xl font-[900] tracking-tighter leading-none transition-transform group-hover:scale-110 duration-300 drop-shadow-2xl flex items-center gap-2`}>
                            -{tier.discount}%
                            {isBestDeal && <span className="animate-bounce">🔥</span>}
                            {/* Subtle Glow */}
                            <div className={`absolute inset-0 blur-2xl opacity-40 rounded-full ${glowColor} -z-10`} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Search Bar */}
        <div className="max-w-6xl animate-in slide-in-from-bottom duration-1000 delay-300">
          <DateSelector onDatesChange={onDatesChange} />
        </div>
      </div>
    </div>
  );
}
