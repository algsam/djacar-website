'use client';

import Link from 'next/link';
import { Car, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getAgencySettings, AgencySettings } from '@/lib/settings';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AgencySettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getAgencySettings();
      setSettings(data);
    };
    fetchSettings();
  }, []);

  const handleWhatsAppContact = () => {
    const phone = settings?.whatsappNumber || '213555555555';
    const message = encodeURIComponent("Bonjour! Je souhaite réserver un véhicule.");
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                {settings?.agencyName || 'DjaCar'}
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Accueil</Link>
            <Link href="/#fleet" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Notre Flotte</Link>
            <Link href="/#conditions" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Conditions</Link>
            
            {settings?.whatsappNumber && (
              <button 
                onClick={handleWhatsAppContact}
                className="flex items-center space-x-3 bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.589.943 3.385 1.44 5.216 1.441 5.44 0 9.865-4.427 9.867-9.866 0-2.639-1.027-5.118-2.892-6.984s-4.345-2.891-6.986-2.891c-5.44 0-9.865 4.426-9.867 9.866 0 1.907.531 3.77 1.534 5.396l-1.004 3.67 3.76-.986zm11.367-5.413c-.309-.154-1.829-.903-2.112-1.004-.282-.102-.487-.154-.691.154-.205.308-.795 1.001-.974 1.205-.18.206-.359.231-.668.077-.309-.155-1.305-.481-2.486-1.534-.919-.82-1.54-1.832-1.72-2.139-.18-.309-.019-.475.135-.629.139-.139.309-.359.462-.538.154-.18.205-.308.308-.513.102-.206.051-.385-.026-.539-.077-.154-.691-1.667-.948-2.283-.25-.601-.504-.519-.691-.529l-.59-.01c-.205 0-.539.077-.82.385-.282.308-1.077 1.051-1.077 2.564 0 1.513 1.102 2.974 1.256 3.18.154.205 2.167 3.31 5.248 4.637.734.315 1.307.504 1.753.644.737.234 1.407.201 1.937.122.59-.088 1.829-.747 2.086-1.466.257-.719.257-1.334.18-1.466-.077-.132-.282-.205-.591-.359z"/>
                </svg>
                <span className="text-xl font-black tracking-tight">+{settings.whatsappNumber}</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            {settings?.whatsappNumber && (
              <button 
                onClick={handleWhatsAppContact}
                className="flex items-center bg-green-500 text-white p-2 rounded-full shadow-md"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.589.943 3.385 1.44 5.216 1.441 5.44 0 9.865-4.427 9.867-9.866 0-2.639-1.027-5.118-2.892-6.984s-4.345-2.891-6.986-2.891c-5.44 0-9.865 4.426-9.867 9.866 0 1.907.531 3.77 1.534 5.396l-1.004 3.67 3.76-.986zm11.367-5.413c-.309-.154-1.829-.903-2.112-1.004-.282-.102-.487-.154-.691.154-.205.308-.795 1.001-.974 1.205-.18.206-.359.231-.668.077-.309-.155-1.305-.481-2.486-1.534-.919-.82-1.54-1.832-1.72-2.139-.18-.309-.019-.475.135-.629.139-.139.309-.359.462-.538.154-.18.205-.308.308-.513.102-.206.051-.385-.026-.539-.077-.154-.691-1.667-.948-2.283-.25-.601-.504-.519-.691-.529l-.59-.01c-.205 0-.539.077-.82.385-.282.308-1.077 1.051-1.077 2.564 0 1.513 1.102 2.974 1.256 3.18.154.205 2.167 3.31 5.248 4.637.734.315 1.307.504 1.753.644.737.234 1.407.201 1.937.122.59-.088 1.829-.747 2.086-1.466.257-.719.257-1.334.18-1.466-.077-.132-.282-.205-.591-.359z"/>
                </svg>
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b animate-in slide-in-from-top duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">Accueil</Link>
            <Link href="/#fleet" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">Notre Flotte</Link>
            <Link href="/#conditions" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">Conditions</Link>
            {settings?.whatsappNumber && (
              <button 
                onClick={handleWhatsAppContact}
                className="w-full mt-2 flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-3 rounded-xl font-bold"
              >
                <span>+{settings.whatsappNumber}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
