import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersService } from '../../services/orders/orders.service';
import { CloudinaryService } from '../../services/cloudinary/cloudinary.service';
import { Orders } from '../../shared/models/orders/orders.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
})
export class OrdersComponent {
  order: Orders = {
    customerName: '',
    productName: '',
    quantity: 1,
    price: 0
  };

  file: File | null = null;
  orders: Orders[] = [];

  constructor(
    private ordersService: OrdersService,
    private cloudinaryService: CloudinaryService,
    private toastr: ToastrService
  ) {}

  // Handle file input
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  // Save order with image
  async saveOrder() {
    try {
      if (this.file) {
        // ✅ Upload image to Cloudinary
        const res: any = await this.cloudinaryService.uploadImage(this.file).toPromise();
        this.order.imageUrl = res.secure_url;
      }

      // ✅ Save order in Firestore
      await this.ordersService.addOrder(this.order);
      this.toastr.success('Order added successfully!');
      this.resetForm();
    } catch (error) {
      console.error(error);
      this.toastr.error('Error saving order');
    }
  }

  // resetForm() {
  //   this.order = { customerName: '', productName: '', quantity: 1, price: 0 };
  //   this.file = null;
  // }
}
