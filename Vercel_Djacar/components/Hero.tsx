'use client';

import { DateSelector } from './DateSelector';
import { Plane, ShieldCheck, MapPin, CheckCircle } from 'lucide-react';

interface HeroProps {
  onDatesChange: (startDate: Date, endDate: Date, location: string) => void;
}

export function Hero({ onDatesChange }: HeroProps) {
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
          <div className="flex flex-wrap gap-4 mb-10 animate-in fade-in duration-1000 delay-500">
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
        </div>
        
        {/* Search Bar */}
        <div className="max-w-6xl animate-in slide-in-from-bottom duration-1000 delay-300">
          <DateSelector onDatesChange={onDatesChange} />
        </div>
      </div>
    </div>
  );
}
