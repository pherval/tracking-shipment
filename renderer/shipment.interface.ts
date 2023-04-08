export interface Shipment {
  id: string | number;
  trackingNumber: string;
  description?: string;
  destination?: string;
  origin?: string;
  status?: string;
  startDate?: Date;
}
