'use client';

import Image from 'next/image';
import { Car } from '@/types/car';
import { Button } from '@/components/ui/button';
import { Users, Gauge, Fuel, Calendar as CalendarIcon, ShieldCheck } from 'lucide-react';

interface CarCardProps {
  car: Car;
  daysCount: number;
  onBook: (car: Car, days: number) => void;
  isAvailable: boolean;
}

export function CarCard({ car, daysCount, onBook, isAvailable }: CarCardProps) {
  const totalPrice = car.pricePerDay * daysCount;

  return (
    <div className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-56 bg-gray-50 overflow-hidden">
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Availability Badge */}
        <div className="absolute top-4 right-4">
          {isAvailable ? (
            <span className="bg-green-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
              Disponible
            </span>
          ) : (
            <span className="bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
              Maintenance
            </span>
          )}
        </div>

        {/* Year Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-lg">
            {car.year}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {car.name}
            </h3>
            <p className="text-sm text-gray-500 font-medium">{car.model}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400 font-medium">Par jour</p>
            <p className="text-xl font-black text-blue-600">{car.pricePerDay} DZD</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-xl">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-semibold text-gray-600">{car.seats} Places</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-xl">
            <Gauge className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-semibold text-gray-600">{car.transmission}</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-xl">
            <Fuel className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-semibold text-gray-600">Diesel</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-semibold text-gray-600">Assuré</span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between items-center mb-4 py-3 border-t border-gray-50">
            <div className="flex items-center text-gray-500 text-xs font-medium">
              <CalendarIcon className="w-3.5 h-3.5 mr-1.5" />
              {daysCount} Jours au total
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-gray-900">{totalPrice} DZD</span>
            </div>
          </div>

          <Button
            onClick={() => onBook(car, daysCount)}
            disabled={!isAvailable}
            className={`w-full py-6 rounded-2xl font-bold tracking-wide transition-all ${
              isAvailable
                ? 'bg-gray-900 text-white hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-100'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isAvailable ? 'Réserver via WhatsApp' : 'Non disponible'}
          </Button>
        </div>

      </div>
    </div>
  );
}
