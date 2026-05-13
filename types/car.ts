export interface Car {
  id: string;
  name: string;
  model: string;
  year: number;
  pricePerDay: number;
  image: string;
  seats: number;
  transmission: string;
  fuelType?: 'Diesel' | 'Essence';
  inMaintenance: boolean;
}

export interface Booking {
  id?: string;
  name: string;
  phone: string;
  email: string;
  carId: string;
  carName: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  createdAt?: number;
}
