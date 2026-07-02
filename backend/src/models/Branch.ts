import mongoose from 'mongoose';

export interface IBranch extends mongoose.Document {
  branchId: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: {
    monday?: { open: string; close: string };
    tuesday?: { open: string; close: string };
    wednesday?: { open: string; close: string };
    thursday?: { open: string; close: string };
    friday?: { open: string; close: string };
    saturday?: { open: string; close: string };
    sunday?: { open: string; close: string };
  };
  services: string[];
  phone?: string;
  isActive: boolean;
}

const branchSchema = new mongoose.Schema<IBranch>({
  branchId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  hours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String },
  },
  services: [{ type: String }],
  phone: { type: String },
  isActive: { type: Boolean, default: true },
});

branchSchema.index({ branchId: 1 }, { unique: true });
branchSchema.index({ 'coordinates.lat': 1, 'coordinates.lng': 1 });

export const Branch = mongoose.model<IBranch>('Branch', branchSchema);