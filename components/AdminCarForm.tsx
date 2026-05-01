'use client';

import { useState } from 'react';
import { Car } from '@/types/car';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface AdminCarFormProps {
  onSubmit: (car: Omit<Car, 'id'>) => Promise<void>;
  onClose: () => void;
}

export function AdminCarForm({ onSubmit, onClose }: AdminCarFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    year: new Date().getFullYear(),
    pricePerDay: 50,
    image: '',
    seats: 5,
    transmission: 'Automatic',
    inMaintenance: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.model || !formData.image) {
      alert('Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({
        name: '',
        model: '',
        year: new Date().getFullYear(),
        pricePerDay: 50,
        image: '',
        seats: 5,
        transmission: 'Automatic',
        inMaintenance: false,
      });
      onClose();
    } catch (error) {
      console.error('[v0] Error submitting form:', error);
      alert('Error adding car. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 z-50">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto mt-auto sm:mt-0">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-900">Ajouter un Véhicule</h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-50 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
...
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Nom du Véhicule *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="ex: Toyota Camry"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Modèle *
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                placeholder="ex: SE Luxury"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Année
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Prix par Jour (DA)
              </label>
              <input
                type="number"
                name="pricePerDay"
                value={formData.pricePerDay}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Places
              </label>
              <input
                type="number"
                name="seats"
                value={formData.seats}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Transmission
              </label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
              >
                <option value="Automatic">Automatique</option>
                <option value="Manual">Manuelle</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              URL de l'image *
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <input
              type="checkbox"
              name="inMaintenance"
              id="inMaintenance"
              checked={formData.inMaintenance}
              onChange={handleInputChange}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="inMaintenance" className="text-sm font-bold text-gray-700 cursor-pointer">
              Marquer en maintenance
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 py-6 rounded-xl border-gray-200 text-gray-600 order-2 sm:order-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white hover:bg-blue-700 py-6 rounded-xl font-bold shadow-lg shadow-blue-100 order-1 sm:order-2"
            >
              {loading ? 'Ajout en cours...' : 'Ajouter le Véhicule'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
