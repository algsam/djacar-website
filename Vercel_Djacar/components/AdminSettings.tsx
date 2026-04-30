'use client';

import { useState, useEffect } from 'react';
import { getAgencySettings, updateAgencySettings, AgencySettings } from '@/lib/settings';
import { Button } from '@/components/ui/button';
import { Phone, Save, Loader2, Info } from 'lucide-react';

export function AdminSettings() {
  const [settings, setSettings] = useState<AgencySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getAgencySettings();
      setSettings(data);
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      setSaving(true);
      await updateAgencySettings(settings);
      alert('Paramètres enregistrés avec succès !');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Erreur lors de l\'enregistrement.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center py-12">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500">Chargement des paramètres...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-8 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <Save className="w-5 h-5 mr-3 text-blue-600" />
          Configuration de l'Agence
        </h3>
        <p className="text-sm text-gray-500 mt-1">Gérez les informations globales de votre plateforme.</p>
      </div>

      <form onSubmit={handleSave} className="p-8 space-y-8">
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">
              Numéro WhatsApp de l'Agence
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <input
                type="text"
                value={settings?.whatsappNumber || ''}
                onChange={(e) => setSettings(prev => prev ? {...prev, whatsappNumber: e.target.value} : null)}
                placeholder="ex: 213555123456"
                className="w-full pl-16 pr-5 py-5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono text-lg"
                required
              />
            </div>
            <div className="mt-3 flex items-start gap-2 text-xs text-gray-500 ml-1">
              <Info className="w-4 h-4 text-blue-500 shrink-0" />
              <p>Format international recommandé (ex: 213 pour l'Algérie). C'est ce numéro qui recevra les demandes de réservation.</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">
              Nom de l'Agence
            </label>
            <input
              type="text"
              value={settings?.agencyName || ''}
              onChange={(e) => setSettings(prev => prev ? {...prev, agencyName: e.target.value} : null)}
              placeholder="ex: DjaCar Rental"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
              required
            />
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 text-white hover:bg-blue-700 py-7 rounded-2xl font-bold text-lg shadow-lg shadow-blue-100 flex items-center justify-center gap-3 transition-all"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Enregistrer les Modifications
          </Button>
        </div>
      </form>
    </div>
  );
}
