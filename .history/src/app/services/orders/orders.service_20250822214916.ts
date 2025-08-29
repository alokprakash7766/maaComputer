import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private dbPath = 'orders';
  private orderRef = collection(this.firestore, this.dbPath);

  constructor(private firestore: Firestore) {}

  createOrder(order: Orders): Promise<any> {
    return addDoc(this.orderRef, {
      ...order,
      createdAt: new Date()
    });
  }

  getOrders(): Observable<Orders[]> {
    return collectionData(this.orderRef, { idField: 'id' }) as Observable<Orders[]>;
  }

  deleteOrder(id: string) {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    return deleteDoc(docRef);
  }
}
