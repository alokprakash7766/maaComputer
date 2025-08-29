import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  CollectionReference,
  DocumentData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddServicesService {
  private dbPath = 'services';
  private serviceRef: CollectionReference<DocumentData>;

  constructor(private db: Firestore) {
    this.serviceRef = collection(this.db, this.dbPath);
  }

  // ✅ Add Service
  addService(service: Services): Promise<any> {
    return addDoc(this.serviceRef, service);
  }

  // ✅ Get All Services
  getAllServices(): Observable<Services[]> {
    return collectionData(this.serviceRef, { idField: 'id' }) as Observable<Services[]>;
  }

  // ✅ Delete Service by ID
  deleteService(id: string): Promise<void> {
    const serviceDoc = doc(this.db, `${this.dbPath}/${id}`);
    return deleteDoc(serviceDoc);
  }

  // ✅ Get Single Service by ID
  getSingleService(id: string): Promise<Services> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return getDoc(docRef).then(snapshot => {
      if (!snapshot.exists()) {
        throw new Error("Service not found");
      }
      return { ...(snapshot.data() as Services), id: snapshot.id };
    });
  }

  // ✅ Update Service by ID
  updateService(id: string, data: Partial<Services>): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data);
  }
}
