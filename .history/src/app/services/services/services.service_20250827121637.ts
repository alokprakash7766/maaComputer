import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  docData,
  CollectionReference,
  DocumentData,
  query,
  where
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Services } from '../../shared/models/services/services.model';

@Injectable({
  providedIn: 'root'
})
export class AddServicesService {
  private dbPath = '/services';
  private serviceRef: CollectionReference<DocumentData>;

  constructor(private db: Firestore) {
    this.serviceRef = collection(this.db, this.dbPath);
  }

  // ✅ Add Service
  addService(serviceObj: Services) {
    serviceObj.status = true;
    // serviceObj.createdAt = Date.now();
    return addDoc(this.serviceRef, { ...serviceObj });
  }

  // ✅ Get All Active Services
  getAllServices(): Observable<Services[]> {
    const q = query(this.serviceRef, where('status', '==', true));
    return collectionData(q, { idField: 'id' }) as Observable<Services[]>;
  }

  // ✅ Get Single Service by ID
  getSingleService(id: string) {
    return docData(doc(this.serviceRef, id), { idField: 'id' });
  }

  // ✅ Update Service by ID
  updateService(id: string, data: Partial<Services>) {
    return updateDoc(doc(this.serviceRef, id), data);
  }

  // ✅ Delete Service by ID
  deleteService(id: string) {
    return deleteDoc(doc(this.serviceRef, id));
  }
}
