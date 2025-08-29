import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private cloudName = "druradiv9";
  private uploadPreset = "maaCompturePress";
  private uploadUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

  constructor(private firestore: Firestore, private http: HttpClient) {}

  // ✅ Image Upload to Cloudinary
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    const upload$ = this.http.post<any>(this.uploadUrl, formData); // ✅ सही variable name
    const result = await lastValueFrom(upload$);
    return result.secure_url; // return uploaded image url
  }

  // ✅ Save Order to Firestore
  async placeOrder(orderData: any) {
    const ordersRef = collection(this.firestore, 'orders');
    return await addDoc(ordersRef, orderData);
  }
}
