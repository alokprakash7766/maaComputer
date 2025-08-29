import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, serverTimestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ServicesBook } from '../../shared/models/servicesBook/services-book.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesBookService {
  private collectionName = 'serviceBookings';

  constructor(private firestore: Firestore) {}

  // ✅ Add new booking with timestamp
  addBooking(booking: ServicesBook) {
    const ref = collection(this.firestore, this.collectionName);
    return addDoc(ref, {
      ...booking,
      createdAt: serverTimestamp()   // auto Firestore timestamp
    });
  }

  // ✅ Get all bookings
  getBookings(): Observable<ServicesBook[]> {
    const ref = collection(this.firestore, this.collectionName);
    return collectionData(ref, { idField: 'id' }) as Observable<ServicesBook[]>;
  }

  // ✅ Update booking
  updateBooking(id: string, booking: Partial<ServicesBook>) {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return updateDoc(docRef, { ...booking });
  }

  // ✅ Delete booking
  deleteBooking(id: string) {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(docRef);
  }
}
