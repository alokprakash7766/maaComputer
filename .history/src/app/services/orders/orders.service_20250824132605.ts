import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from '@angular/fire/firestore';
import { Orders } from '../../shared/models/orders/orders.model';
import { Observable } from 'rxjs';
import { CollectionReference, DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private dbPath = '/orders';
  private ordersRef: CollectionReference<DocumentData>;

  constructor(private db: Firestore) {
    this.ordersRef = collection(this.db, this.dbPath);
  }

  // ✅ Add Order
  addOrder(order: Orders): Promise<any> {
    order.createdAt = Date.now();
    return addDoc(this.ordersRef, { ...order });
  }

  // ✅ Get All Orders
  getAllOrders(): Observable<Orders[]> {
    return collectionData(this.ordersRef, { idField: "id" }) as Observable<Orders[]>;
  }

  // ✅ Delete Order
  deleteOrder(id: string) {
    return deleteDoc(doc(this.ordersRef, id));
  }

  // ✅ Get Single Order
  getSingleOrder(id: string): Observable<any> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return new Observable((observer) => {
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          observer.next({ id: docSnap.id, ...docSnap.data() });
        } else {
          observer.error("Order not found");
        }
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  // ✅ Update Order
  updateOrder(id: string, data: any): Promise<void> {
    const docRef = doc(this.db, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data);
  }
}
