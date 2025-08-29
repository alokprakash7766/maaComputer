import { Injectable } from '@angular/core';
import { Billing } from '../../shared/models/billing/billing.model';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  getDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private billingCollection = collection(this.firestore, 'billings');

  constructor(private firestore: Firestore) {}

  // ✅ Save a billing record
  saveBilling(billing: Billing): Promise<any> {
    return addDoc(this.billingCollection, billing);
  }

  // ✅ Get all billing records (for admin or listing)
  getAllBillings(): Observable<Billing[]> {
    return collectionData(this.billingCollection, {
      idField: 'id',
    }) as Observable<Billing[]>;
  }

  // ✅ Get single billing by ID (if needed)
  async getBillingById(id: string): Promise<Billing | null> {
    const docRef = doc(this.firestore, 'billings', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as Billing) : null;
  }
}
