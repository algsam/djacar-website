'use client';

import { useEffect, useState } from 'react';
import { getCars, addCar, updateCar, deleteCar, toggleMaintenance, initializeCars } from '@/lib/cars';
import { AdminCarForm } from '@/components/AdminCarForm';
import { AdminCarGrid } from '@/components/AdminCarGrid';
import { AdminLocationManager } from '@/components/AdminLocationManager';
import { AdminSettings } from '@/components/AdminSettings';
import { Car } from '@/types/car';
import { ADMIN_PASSWORD } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { LayoutGrid, MapPin, LogOut, Car as CarIcon, Plus, Loader2, Settings } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [cars, setCars] = useState<Car[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'fleet' | 'locations' | 'settings'>('fleet');

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadCars();
    }
  }, []);

  const loadCars = async () => {
    try {
      setLoading(true);
      await initializeCars();
      const data = await getCars();
      setCars(data);
    } catch (error) {
      console.error('[v0] Error loading cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      setPassword('');
      loadCars();
    } else {
      alert('Mot de passe incorrect');
      setPassword('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    setPassword('');
    setCars([]);
  };

  const handleAddCar = async (newCar: Omit<Car, 'id'>) => {
    try {
      await addCar(newCar);
      await loadCars();
    } catch (error) {
      console.error('[v0] Error adding car:', error);
      throw error;
    }
  };

  const handleToggleMaintenance = async (id: string, inMaintenance: boolean) => {
    try {
      await toggleMaintenance(id, inMaintenance);
      await loadCars();
    } catch (error) {
      console.error('[v0] Error toggling maintenance:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  const handleDeleteCar = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      try {
        await deleteCar(id);
        await loadCars();
      } catch (error) {
        console.error('[v0] Error deleting car:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-10 border border-gray-100">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-200">
              <CarIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">Administration</h1>
          <p className="text-gray-500 text-center mb-8">Veuillez vous connecter pour gérer DjaCar.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Mot de Passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                autoFocus
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 py-7 rounded-xl font-bold text-lg shadow-lg shadow-blue-100 transition-all"
            >
              Se Connecter
            </Button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-8">
            Mot de passe démo: <code className="bg-gray-100 px-2 py-1 rounded text-gray-600">admin2024</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center py-4 md:h-20 gap-4">
            <div className="flex justify-between items-center w-full md:w-auto">
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                  <CarIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-gray-900">DjaCar <span className="text-blue-600">Admin</span></span>
              </div>
              
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-500"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
            
            <nav className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
              <button
                onClick={() => setActiveTab('fleet')}
                className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                  activeTab === 'fleet' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                Gestion Flotte
              </button>
              <button
                onClick={() => setActiveTab('locations')}
                className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                  activeTab === 'locations' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <MapPin className="w-4 h-4" />
                Lieux / Adresses
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                  activeTab === 'settings' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-4 h-4" />
                Configuration
              </button>
            </nav>
            
            <Button
              onClick={handleLogout}
              variant="outline"
              className="hidden md:flex items-center gap-2 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeTab === 'fleet' ? (
          <>
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Ma Flotte</h2>
                <p className="text-gray-500 mt-1 text-sm md:text-base">
                  Vous avez <span className="font-bold text-gray-900">{cars.length}</span> véhicule{cars.length > 1 ? 's' : ''} dans votre inventaire.
                </p>
              </div>
              <Button
                onClick={() => setShowForm(true)}
                className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 rounded-xl px-6 py-6 font-bold shadow-lg shadow-blue-100"
              >
                <Plus className="w-5 h-5 mr-2" />
                Ajouter un Véhicule
              </Button>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-500 font-medium text-lg">Chargement de la flotte...</p>
              </div>
            ) : cars.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CarIcon className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun véhicule</h3>
                <p className="text-gray-500 mb-8 max-w-xs mx-auto text-balance">Votre flotte est actuellement vide. Commencez par ajouter votre premier véhicule.</p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-6 rounded-xl font-bold"
                >
                  Ajouter mon premier véhicule
                </Button>
              </div>
            ) : (
              <AdminCarGrid
                cars={cars}
                onToggleMaintenance={handleToggleMaintenance}
                onDelete={handleDeleteCar}
                loading={loading}
              />
            )}
          </>
        ) : activeTab === 'locations' ? (
          <div className="max-w-3xl mx-auto">
            <AdminLocationManager />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <AdminSettings />
          </div>
        )}
      </div>


      {/* Add Car Modal */}
      {showForm && (
        <AdminCarForm
          onSubmit={handleAddCar}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
