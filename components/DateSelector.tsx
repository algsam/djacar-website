'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getLocations, initializeLocations } from '@/lib/locations';
import { Location } from '@/types/location';
import { getAgencySettings, AgencySettings } from '@/lib/settings';
import { differenceInDays } from 'date-fns';

interface DateSelectorProps {
  onDatesChange: (startDate: Date, endDate: Date, location: string) => void;
}

export function DateSelector({ onDatesChange }: DateSelectorProps) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayAfter = new Date(tomorrow);
  dayAfter.setDate(dayAfter.getDate() + 1);

  const [startDate, setStartDate] = useState<string>(format(tomorrow, 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState<string>(format(dayAfter, 'yyyy-MM-dd'));
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [agencySettings, setAgencySettings] = useState<AgencySettings | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch locations
      await initializeLocations();
      const locData = await getLocations();
      setLocations(locData);
      if (locData.length > 0) {
        setSelectedLocation(locData[0].name);
      }

      // Fetch agency settings
      const settingsData = await getAgencySettings();
      setAgencySettings(settingsData);
    };
    fetchData();
  }, []);

  const handleDatesChange = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Validate minimum rental days
    if (agencySettings?.minRentalDays) {
      const diffDays = differenceInDays(end, start);
      
      if (diffDays < agencySettings.minRentalDays) {
        alert(`Désolé, la durée minimum de location pour notre agence est de ${agencySettings.minRentalDays} jours. Votre sélection actuelle est de ${diffDays} jour(s). Veuillez choisir une période plus longue.`);
        return;
      }
    }

    onDatesChange(start, end, selectedLocation);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row gap-2 items-stretch md:items-center">
        {/* Location Dropdown */}
        <div className="flex-[2.2] min-w-[200px] px-3 py-2 border-b md:border-b-0 md:border-r border-gray-100">
          <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-0.5">
            Lieu de prise en charge
          </label>
          <div className="flex items-center text-gray-900 font-medium relative">
            <MapPin className="w-4 h-4 text-blue-500 mr-1.5 shrink-0" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full outline-none bg-transparent cursor-pointer appearance-none pr-6 text-sm"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
            <div className="absolute right-0 pointer-events-none">
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>


        {/* Start Date */}
        <div className="flex-1 px-3 py-2 border-b md:border-b-0 md:border-r border-gray-100 min-w-[140px]">
          <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-0.5">
            Date de début
          </label>
          <div className="flex items-center">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full outline-none text-gray-900 font-medium bg-transparent cursor-pointer text-sm"
            />
          </div>
        </div>

        {/* End Date */}
        <div className="flex-1 px-3 py-2 border-b md:border-b-0 md:border-r border-gray-100 min-w-[140px]">
          <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-0.5">
            Date de fin
          </label>
          <div className="flex items-center">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full outline-none text-gray-900 font-medium bg-transparent cursor-pointer text-sm"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="p-1">
          <Button
            onClick={handleDatesChange}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 px-6 font-bold transition-all hover:shadow-lg hover:shadow-blue-200"
          >
            Rechercher
          </Button>
        </div>


      </div>
    </div>
  );
}

