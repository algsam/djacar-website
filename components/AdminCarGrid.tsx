'use client';

import Image from 'next/image';
import { Car } from '@/types/car';
import { Button } from '@/components/ui/button';
import { Trash2, AlertCircle } from 'lucide-react';

interface AdminCarGridProps {
  cars: Car[];
  onToggleMaintenance: (id: string, inMaintenance: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  loading: boolean;
}

export function AdminCarGrid({
  cars,
  onToggleMaintenance,
  onDelete,
  loading,
}: AdminCarGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-40 bg-gray-200">
            <Image
              src={car.image}
              alt={car.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-900">
              {car.name} <span className="text-gray-600 font-normal text-sm">{car.model}</span>
            </h3>

            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <p>Year: {car.year}</p>
              <p>Price per Day: ${car.pricePerDay}</p>
              <p>Seats: {car.seats}</p>
              <p>Transmission: {car.transmission}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <button
                onClick={() => onToggleMaintenance(car.id, !car.inMaintenance)}
                disabled={loading}
                className={`w-full py-2 px-3 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
                  car.inMaintenance
                    ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                <AlertCircle className="w-4 h-4" />
                {car.inMaintenance ? 'In Maintenance' : 'Available'}
              </button>

              <Button
                onClick={() => onDelete(car.id)}
                disabled={loading}
                variant="destructive"
                className="w-full flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
