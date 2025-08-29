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

// ✅ Service Model
export interface Service {
  id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AddServicesService {
  private dbPath = 'services'; // 🔹 Firestore collection name
  private servicesRef: CollectionReference<DocumentData>;

  constructor(private db: Firestore) {
    this.servicesRef = collection(this.db, this.dbPath);
  }

  // ✅ Add Service
  addService(service: Service): Promise<any> {
    return addDoc(this.servicesRef, service);
  }

  // ✅ Get All Services
  getAllServices(): Observable<Service[]> {
    return collectionData(this.servicesRef, { idField: 'id' }) as Observable<Service[]>;
  }

  // ✅ Delete Service by ID
  deleteService(id: string): Promise<void> {
    const serviceDoc = doc(this.db, `${this.dbPath}/${id}`);
    return deleteDoc(serviceDoc);
  }

  // ✅ Get Single Service by ID
  getSingleService(id: string): Promise<Service> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return getDoc(docRef).then(snapshot => {
      if (!snapshot.exists()) {
        throw new Error("Service not found");
      }
      return { ...(snapshot.data() as Service), id: snapshot.id };
    });
  }

  // ✅ Update Service by ID
  updateService(id: string, data: Partial<Service>): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data);
  }
}
