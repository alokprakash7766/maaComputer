export class ServicesBook {
  id?: string;           // Firestore document ID
  name!: string;         // Customer name
  phone!: string;        // Customer phone
  email!: string;        // Customer email
  serviceType!: string;  // Service type (ex: Printing, Lamination, etc.)
  date!: string;         // Booking date (yyyy-mm-dd)
  time!: string;         // Booking time (hh:mm)
  message?: string;      // Optional message
  createdAt?: any;       // Firestore server timestamp
}
