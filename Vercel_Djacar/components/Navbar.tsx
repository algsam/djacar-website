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
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
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
          </div>
        </div>
      )}
    </nav>
  );
}
