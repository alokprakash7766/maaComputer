import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  cloudinaryUrl = 'https://api.cloudinary.com/v1_1/<your_cloud_name>/image/upload';
  uploadPreset = '<your_upload_preset>';

  constructor(private firestore: Firestore, private http: HttpClient) {}

  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    const upload$ = this.http.post<any>(this.cloudinaryUrl, formData);
    const result = await lastValueFrom(upload$);
    return result.secure_url; // return uploaded image url
  }

  async placeOrder(orderData: any) {
    const ordersRef = collection(this.firestore, 'orders');
    return await addDoc(ordersRef, orderData);
  }
}
