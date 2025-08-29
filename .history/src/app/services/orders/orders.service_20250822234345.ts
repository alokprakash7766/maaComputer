import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Orders } from '../shared/models/orders/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private cloudName = "druradiv9";
  private uploadPreset = "maaCompturePress";
  private uploadUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

  constructor(private firestore: Firestore, private http: HttpClient) {}

  // ✅ Upload Image to Cloudinary
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    const upload$ = this.http.post<any>(this.uploadUrl, formData);
    const result = await lastValueFrom(upload$);
    return result.secure_url;
  }

  // ✅ Save Order to Firestore
  async placeOrder(orderData: Orders) {
    const ordersRef = collection(this.firestore, 'orders');
    return await addDoc(ordersRef, orderData);
  }
}
