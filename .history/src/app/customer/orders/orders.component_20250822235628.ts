import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private cloudName = 'druradiv9';
  private uploadPreset = 'maaCompturePress';

  constructor(private firestore: Firestore, private http: HttpClient) {}

  // ✅ Upload image to Cloudinary
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    const upload$ = this.http.post(
      `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
      formData
    );

    const uploadRes: any = await lastValueFrom(upload$);
    return uploadRes.secure_url;
  }

  // ✅ Place order in Firestore
  async placeOrder(order: any): Promise<{ success: boolean; error?: any }> {
    try {
      const ordersRef = collection(this.firestore, 'orders');
      await addDoc(ordersRef, {
        ...order,
        createdAt: new Date()
      });
      return { success: true };
    } catch (err) {
      console.error('Order save error:', err);
      return { success: false, error: err };
    }
  }
}
