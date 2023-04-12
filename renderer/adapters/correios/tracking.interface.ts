export interface TrackingShipment {
  code: string;
  dueDate: Date;
  /**
   * Order by creation date
   */
  events: TrackingEvent[];
  /**
   * when has locker or block from the object
   */
  isLocked: boolean;
}

interface TrackingEvent {
  code: string; // id
  description: string;
  createdAt: Date;
  origin: Unit;
  destination?: Unit;
}

interface Unit {
  city: string;
  brazilFederalUnit: string;
}
