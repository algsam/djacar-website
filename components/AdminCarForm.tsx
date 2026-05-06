'use client';

import { useState, useRef } from 'react';
import { Car } from '@/types/car';
import { Button } from '@/components/ui/button';
import { X, Upload, Camera, Loader2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface AdminCarFormProps {
  onSubmit: (car: Omit<Car, 'id'>) => Promise<void>;
  onClose: () => void;
  initialData?: Car | null;
}

export function AdminCarForm({ onSubmit, onClose, initialData }: AdminCarFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    model: initialData?.model || '',
    year: initialData?.year || new Date().getFullYear(),
    pricePerDay: initialData?.pricePerDay || 50,
    image: initialData?.image || '',
    seats: initialData?.seats || 5,
    transmission: initialData?.transmission || 'Automatic',
    inMaintenance: initialData?.inMaintenance || false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : type === 'number' ? Number(value) : value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to ImgBB
    setUploading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || 'YOUR_IMGBB_API_KEY';
      const body = new FormData();
      body.append('image', file);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: body,
      });

      const data = await response.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, image: data.data.url }));
        console.log('Image uploaded successfully to ImgBB:', data.data.url);
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading to ImgBB:', error);
      alert('Erreur lors de l\'envoi de l\'image vers ImgBB. Vérifiez votre clé API.');
    } finally {
      setUploading(false);
    }
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
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? 'Modifier le Véhicule' : 'Ajouter un Véhicule'}
          </h2>
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

          <div className="space-y-4">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Photo du Véhicule *
            </label>
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`relative h-64 w-full rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden ${
                imagePreview ? 'border-blue-500 bg-blue-50/10' : 'border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-gray-100/50'
              }`}
            >
              {imagePreview ? (
                <>
                  <Image 
                    src={imagePreview} 
                    alt="Preview" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  {uploading && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                      <Loader2 className="w-10 h-10 text-white animate-spin mb-2" />
                      <span className="text-white font-bold text-sm">Téléchargement...</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center text-center p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                    <Upload className="w-8 h-8" />
                  </div>
                  <h3 className="text-gray-900 font-bold mb-1">Prendre une photo ou choisir un fichier</h3>
                  <p className="text-gray-500 text-sm">PNG, JPG ou WEBP (Max. 5MB)</p>
                  
                  {uploading && (
                    <div className="mt-4 flex items-center gap-2 text-blue-600 font-bold">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Envoi en cours...</span>
                    </div>
                  )}
                </div>
              )}
              
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-100"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-400">Ou via URL</span>
              </div>
            </div>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm text-gray-500"
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
              disabled={loading || uploading}
              className="flex-1 bg-blue-600 text-white hover:bg-blue-700 py-6 rounded-xl font-bold shadow-lg shadow-blue-100 order-1 sm:order-2"
            >
              {loading ? (initialData ? 'Mise à jour...' : 'Ajout en cours...') : (initialData ? 'Enregistrer les modifications' : 'Ajouter le Véhicule')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
