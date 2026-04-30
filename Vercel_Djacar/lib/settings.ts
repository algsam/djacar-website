import { 
  doc, 
  getDoc, 
  setDoc 
} from 'firebase/firestore';
import { db } from './firebase';

export interface AgencySettings {
  whatsappNumber: string;
  agencyName: string;
}

const SETTINGS_COLLECTION = 'settings';
const AGENCY_SETTINGS_DOC = 'agency';

export const getAgencySettings = async (): Promise<AgencySettings> => {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, AGENCY_SETTINGS_DOC);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as AgencySettings;
    } else {
      // Default settings
      const defaultSettings: AgencySettings = {
        whatsappNumber: '213555123456',
        agencyName: 'DjaCar'
      };
      await setDoc(docRef, defaultSettings);
      return defaultSettings;
    }
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {
      whatsappNumber: '213555123456',
      agencyName: 'DjaCar'
    };
  }
};

export const updateAgencySettings = async (settings: AgencySettings) => {
  const docRef = doc(db, SETTINGS_COLLECTION, AGENCY_SETTINGS_DOC);
  await setDoc(docRef, settings);
};
