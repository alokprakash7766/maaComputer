import { Injectable } from '@angular/core';
import { Billing } from '../../shared/models/billing/billing.model';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  getDoc,
  CollectionReference
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private billingCollection!: CollectionReference;

  constructor(private firestore: Firestore) {
    this.billingCollection = collection(this.firestore, 'billings');
  }

  saveBilling(billing: Billing): Promise<any> {
    return addDoc(this.billingCollection, billing);
  }

  getAllBillings(): Observable<Billing[]> {
    return collectionData(this.billingCollection, {
      idField: 'id',
    }) as Observable<Billing[]>;
  }

  async getBillingById(id: string): Promise<Billing | null> {
    const docRef = doc(this.firestore, 'billings', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as Billing) : null;
  }
}
