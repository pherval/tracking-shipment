export interface Shipment {
  trackingNumber: string;
  description?: string;
  destination: string;
  origin: string;
  status: string;
}
