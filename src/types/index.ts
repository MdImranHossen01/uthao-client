export type TUser = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: 'sender' | 'receiver' | 'admin';
  status: 'active' | 'blocked';
};

// Add StatusLog type
export type TStatusLog = {
  status: 'pending' | 'picked-up' | 'in-transit' | 'delivered' | 'cancelled';
  timestamp: string;
  notes?: string;
};

export type TParcel = {
  _id: string;
  senderId: string;
  receiverName: string;
  receiverPhoneNumber: string;
  receiverAddress: string;
  pickupAddress: string;
  parcelDescription: string;
  parcelWeight: number;
  trackingId: string;
  status: 'pending' | 'picked-up' | 'in-transit' | 'delivered' | 'cancelled';
  statusHistory: TStatusLog[]; // <-- Add this property
  createdAt: string;
  updatedAt: string;
};