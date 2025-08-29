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
import { HttpClient } from '@angular/common/http';
import { Services } from '../../shared/models/services/services.model';

@Injectable({
  providedIn: 'root'
})
export class AddServicesService {
  private dbPath = 'services';
  private servicesRef: CollectionReference<DocumentData>;

  private cloudName = 'YOUR_CLOUD_NAME';
  private uploadPreset = 'YOUR_UPLOAD_PRESET';

  constructor(private db: Firestore, private http: HttpClient) {
    this.servicesRef = collection(this.db, this.dbPath);
  }

  // ✅ Upload Image to Cloudinary
  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);
    return this.http.post(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, formData);
  }

  // ✅ Add Service
  addService(service: Services): Promise<any> {
    return addDoc(this.servicesRef, service);
  }

  // ✅ Get All Services
  getAllServices(): Observable<Services[]> {
    return collectionData(this.servicesRef, { idField: 'id' }) as Observable<Services[]>;
  }

  // ✅ Delete Service
  deleteService(id: string): Promise<void> {
    const serviceDoc = doc(this.db, `${this.dbPath}/${id}`);
    return deleteDoc(serviceDoc);
  }

  // ✅ Get Single Service
  getSingleService(id: string): Promise<Services> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return getDoc(docRef).then(snapshot => {
      if (!snapshot.exists()) throw new Error('Service not found');
      return { ...(snapshot.data() as Services), id: snapshot.id };
    });
  }

  // ✅ Update Service
  updateService(id: string, data: Partial<Services>): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data);
  }
}
