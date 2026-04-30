import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  setDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { Car, Booking } from '@/types/car';
import { SAMPLE_CARS } from './constants';

const CARS_COLLECTION = 'cars';
const BOOKINGS_COLLECTION = 'bookings';

export async function initializeCars() {
  try {
    const snapshot = await getDocs(collection(db, CARS_COLLECTION));
    if (snapshot.empty) {
      for (const car of SAMPLE_CARS) {
        await addDoc(collection(db, CARS_COLLECTION), car);
      }
      console.log('[v0] Cars initialized with sample data');
    }
  } catch (error) {
    console.error('[v0] Error initializing cars:', error);
  }
}

export async function getCars(): Promise<Car[]> {
  try {
    const snapshot = await getDocs(collection(db, CARS_COLLECTION));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Car[];
  } catch (error) {
    console.error('[v0] Error fetching cars:', error);
    return [];
  }
}

export async function addCar(car: Omit<Car, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, CARS_COLLECTION), car);
    return docRef.id;
  } catch (error) {
    console.error('[v0] Error adding car:', error);
    throw error;
  }
}

export async function updateCar(id: string, updates: Partial<Car>): Promise<void> {
  try {
    await updateDoc(doc(db, CARS_COLLECTION, id), updates);
  } catch (error) {
    console.error('[v0] Error updating car:', error);
    throw error;
  }
}

export async function deleteCar(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, CARS_COLLECTION, id));
  } catch (error) {
    console.error('[v0] Error deleting car:', error);
    throw error;
  }
}

export async function toggleMaintenance(id: string, inMaintenance: boolean): Promise<void> {
  try {
    await updateDoc(doc(db, CARS_COLLECTION, id), { inMaintenance });
  } catch (error) {
    console.error('[v0] Error toggling maintenance:', error);
    throw error;
  }
}

export async function addBooking(booking: Booking): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), {
      ...booking,
      createdAt: Date.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('[v0] Error adding booking:', error);
    throw error;
  }
}
