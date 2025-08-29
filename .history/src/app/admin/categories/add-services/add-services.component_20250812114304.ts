import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-services',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css']
})
export class AddServicesComponent {

  service = {
    name: '',
    description: '',
    price: null
  };

  constructor(private firestore: Firestore) {}

  async addService() {
    try {
      const servicesRef = collection(this.firestore, 'services');
      await addDoc(servicesRef, this.service);
      alert('✅ Service added successfully!');
      this.service = { name: '', description: '', price: null };
    } catch (error) {
      console.error('Error adding service:', error);
      alert('❌ Failed to add service');
    }
  }
}
