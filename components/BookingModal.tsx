'use client';

import { useEffect, useState } from 'react';
import { Car } from '@/types/car';
import { Button } from '@/components/ui/button';
import { X, CheckCircle2, MessageSquare, ArrowRight, User, Phone, Mail } from 'lucide-react';
import { getAgencySettings, AgencySettings } from '@/lib/settings';

interface BookingModalProps {
  car: Car;
  startDate: string;
  endDate: string;
  totalPrice: number;
  onClose: () => void;
}

export function BookingModal({
  car,
  startDate,
  endDate,
  totalPrice,
  onClose,
}: BookingModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [agencySettings, setAgencySettings] = useState<AgencySettings | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getAgencySettings();
      setAgencySettings(data);
    };
    fetchSettings();
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToWhatsApp = () => {
    if (!formData.name || !formData.phone) {
      alert('Veuillez remplir au moins votre nom et votre numéro de téléphone.');
      return;
    }

    // Check minimum rental days
    if (agencySettings?.minRentalDays && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; // At least 1 day

      if (diffDays < agencySettings.minRentalDays) {
        alert(`Désolé, la durée minimum de location pour notre agence est de ${agencySettings.minRentalDays} jours. Votre sélection actuelle est de ${diffDays} jour(s). Veuillez choisir une période plus longue.`);
        return;
      }
    }

    setStep(2);
  };

  const handleWhatsAppBooking = () => {
    const agencyPhone = agencySettings?.whatsappNumber || '971529854885';
    const agencyName = agencySettings?.agencyName || 'DjaCar';

    const message = `Bonjour ${agencyName}! Je souhaite réserver un véhicule:
    
🚗 Véhicule: ${car.name} ${car.model}
👤 Client: ${formData.name}
📱 Tél: ${formData.phone}
📧 Email: ${formData.email || 'Non précisé'}
📅 Début: ${startDate}
📅 Fin: ${endDate}
💰 Prix Total: ${totalPrice} DZD

Merci de me confirmer la disponibilité.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${agencyPhone}?text=${encodedMessage}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 animate-in fade-in duration-300 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden border border-gray-100 my-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-100 bg-gray-50/50 flex-none">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              {step === 1 ? 'Détails de réservation' : 'Confirmation'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {step === 1 ? 'Veuillez remplir vos informations' : 'Vérifiez vos informations avant l\'envoi'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 custom-scrollbar">
          {step === 1 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-5">
                <div className="relative">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                    Nom Complet
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Votre nom"
                      className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                    Numéro de Téléphone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+213 --- -- -- --"
                      className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                    Email (Optionnel)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="votre@email.com"
                      className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-100">
                <div className="flex items-center justify-between mb-4 border-b border-blue-500/30 pb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-3">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-100 font-medium">Véhicule choisi</p>
                      <h4 className="font-bold">{car.name}</h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-blue-100 font-medium">Prix Total</p>
                    <p className="text-xl font-black">{totalPrice} DZD</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs font-medium text-blue-100">
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="mb-1 uppercase tracking-wider">Début</p>
                    <p className="text-white font-bold">{startDate}</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="mb-1 uppercase tracking-wider">Fin</p>
                    <p className="text-white font-bold">{endDate}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Presque prêt !
              </h3>
              <p className="text-gray-500 max-w-xs mx-auto mb-8">
                Cliquez sur le bouton ci-dessous pour envoyer votre demande de réservation sur WhatsApp.
              </p>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-left mb-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Récapitulatif</h4>
                <div className="space-y-2">
                  <p className="text-sm font-bold text-gray-800 flex justify-between">
                    <span>Client:</span> <span className="text-blue-600">{formData.name}</span>
                  </p>
                  <p className="text-sm font-bold text-gray-800 flex justify-between">
                    <span>Véhicule:</span> <span>{car.name} {car.model}</span>
                  </p>
                  <p className="text-sm font-bold text-gray-800 flex justify-between border-t border-gray-200 pt-2 mt-2">
                    <span>Total:</span> <span className="text-xl text-blue-600">{totalPrice} DZD</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 md:p-8 border-t border-gray-100 bg-gray-50/50 flex gap-4 flex-none">
          {step === 2 ? (
            <button
              onClick={() => setStep(1)}
              className="flex-1 px-6 py-4 bg-white border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all"
            >
              Retour
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-white border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all md:hidden"
            >
              Annuler
            </button>
          )}
          <button
            onClick={step === 1 ? handleProceedToWhatsApp : handleWhatsAppBooking}
            className="flex-[2] px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-100 transition-all flex items-center justify-center gap-3"
          >
            {step === 1 ? (
              <>
                Continuer <ArrowRight className="w-5 h-5" />
              </>
            ) : (
              <>
                Envoyer sur WhatsApp <MessageSquare className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
