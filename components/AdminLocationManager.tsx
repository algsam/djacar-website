'use client';

import { useState, useEffect } from 'react';
import { getLocations, addLocation, deleteLocation } from '@/lib/locations';
import { Location } from '@/types/location';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, MapPin, Loader2 } from 'lucide-react';

export function AdminLocationManager() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [newLocationName, setNewLocationName] = useState('');
  const [newLocationAddress, setNewLocationAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      setLoading(true);
      const data = await getLocations();
      setLocations(data);
    } catch (error) {
      console.error('Error loading locations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocationName || !newLocationAddress) return;

    try {
      setSubmitting(true);
      await addLocation({ name: newLocationName, address: newLocationAddress });
      setNewLocationName('');
      setNewLocationAddress('');
      await loadLocations();
    } catch (error) {
      console.error('Error adding location:', error);
      alert('Failed to add location');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteLocation = async (id: string) => {
    if (!confirm('Are you sure you want to delete this location?')) return;

    try {
      await deleteLocation(id);
      await loadLocations();
    } catch (error) {
      console.error('Error deleting location:', error);
      alert('Failed to delete location');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-blue-600" />
          Gérer les Lieux de Prise en Charge
        </h3>
        <p className="text-sm text-gray-500 mt-1">Ajoutez ou supprimez les adresses disponibles pour vos clients.</p>
      </div>

      <div className="p-6">
        {/* Add Location Form */}
        <form onSubmit={handleAddLocation} className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">Nom du Lieu</label>
              <input
                type="text"
                value={newLocationName}
                onChange={(e) => setNewLocationName(e.target.value)}
                placeholder="ex: Aéroport d'Alger"
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">Adresse / Précision</label>
              <input
                type="text"
                value={newLocationAddress}
                onChange={(e) => setNewLocationAddress(e.target.value)}
                placeholder="ex: Terminal International"
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                required
              />
            </div>
          </div>
          <Button 
            type="submit" 
            disabled={submitting}
            className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg flex items-center justify-center gap-2"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Ajouter le Lieu
          </Button>
        </form>

        {/* Locations List */}
        {loading ? (
          <div className="flex flex-col items-center py-12">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-500">Chargement des lieux...</p>
          </div>
        ) : locations.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
            <p className="text-gray-400">Aucun lieu configuré.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {locations.map((loc) => (
              <div key={loc.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all group">
                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 mr-4">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{loc.name}</h4>
                    <p className="text-sm text-gray-500">{loc.address}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteLocation(loc.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
