export type TUser = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: 'sender' | 'receiver' | 'admin';
  status: 'active' | 'blocked';
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
  createdAt: string;
  updatedAt: string;
};