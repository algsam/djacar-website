import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  setDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { Location } from '@/types/location';

const LOCATIONS_COLLECTION = 'locations';

export const getLocations = async (): Promise<Location[]> => {
  const q = query(collection(db, LOCATIONS_COLLECTION), orderBy('name'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Location));
};

export const addLocation = async (location: Omit<Location, 'id'>) => {
  return await addDoc(collection(db, LOCATIONS_COLLECTION), location);
};

export const deleteLocation = async (id: string) => {
  await deleteDoc(doc(db, LOCATIONS_COLLECTION, id));
};

export const initializeLocations = async () => {
  const locations = await getLocations();
  if (locations.length === 0) {
    const defaultLocations = [
      { name: "Aéroport d'Alger", address: "Houari Boumédiène" },
      { name: "Centre Ville Alger", address: "Place Audin" },
      { name: "Dely Ibrahim", address: "Cité 1200 Logements" },
    ];
    
    for (const loc of defaultLocations) {
      await addLocation(loc);
    }
  }
};
