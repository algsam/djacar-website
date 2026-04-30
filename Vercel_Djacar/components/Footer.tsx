'use client';

import { useEffect, useState } from 'react';
import { Car, Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { getAgencySettings, AgencySettings } from '@/lib/settings';

export function Footer() {
  const [settings, setSettings] = useState<AgencySettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getAgencySettings();
      setSettings(data);
    };
    fetchSettings();
  }, []);

  // Format phone number for display if it's like 213555...
  const formatPhone = (num: string) => {
    if (num.startsWith('213')) {
      return `+213 ${num.slice(3, 4)} ${num.slice(4, 6)} ${num.slice(6, 8)} ${num.slice(8, 10)} ${num.slice(10)}`;
    }
    return num.startsWith('+') ? num : `+${num}`;
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center space-x-2 text-white mb-4">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Car className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">{settings?.agencyName || 'DjaCar'}</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              Services de location de voitures premium à Alger. Offrant confort, sécurité et fiabilité pour tous vos déplacements depuis 2024.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="hover:text-blue-500 transition-colors"><Facebook size={20} /></Link>
              <Link href="#" className="hover:text-blue-500 transition-colors"><Twitter size={20} /></Link>
              <Link href="#" className="hover:text-blue-500 transition-colors"><Instagram size={20} /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Liens Rapides</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-blue-500 transition-colors">Accueil</Link></li>
              <li><Link href="/#fleet" className="hover:text-blue-500 transition-colors">Notre Flotte</Link></li>
              <li><Link href="/#conditions" className="hover:text-blue-500 transition-colors">Conditions</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">À Propos</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contactez-nous</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 text-blue-500 shrink-0" />
                <span>123 Avenue de l'ALN, Alger, Algérie</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-blue-500 shrink-0" />
                <span>{settings ? formatPhone(settings.whatsappNumber) : '+213 555 12 34 56'}</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-blue-500 shrink-0" />
                <span>contact@djacar.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-sm text-center">
          <p>© {new Date().getFullYear()} {settings?.agencyName || 'DjaCar'} Rental. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
