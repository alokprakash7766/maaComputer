import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
})
export class OrdersComponent{

  private cloudName = 'druradiv9';
  private uploadPreset = 'maaCompturePress';

  constructor(private firestore: Firestore, private http: HttpClient) {}

  // ✅ Order place
  async placeOrder(order: any, file?: File) {
    try {
      let imageUrl = '';

      // If file is uploaded
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', this.uploadPreset);

        const upload$ = this.http.post(
          `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
          formData
        );

        const uploadRes: any = await lastValueFrom(upload$);
        imageUrl = uploadRes.secure_url;
      }

      // ✅ Save to Firestore
      const ordersRef = collection(this.firestore, 'orders');
      const newOrder = {
        ...order,
        imageUrl,
        createdAt: new Date()
      };

      await addDoc(ordersRef, newOrder);

      return { success: true };
    } catch (err) {
      console.error('Order save error:', err);
      return { success: false, error: err };
    }
  }
}
