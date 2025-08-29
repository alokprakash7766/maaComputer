import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Services } from '../../../shared/models/services/services.model';


@Component({
  selector: 'app-add-services',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css']
})
export class AddServicesComponent {

  service: Services = new Services({
    name: '',
    description: '',
    price: 0,
    imageUrl: ''
  });

  selectedImage: File | null = null;
  isUploading = false;

  constructor(private addServicesService: AddServicesService) {}

  // 📌 Select Image
  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  // 📌 Add Service
  async addService() {
    if (!this.selectedImage) {
      alert('Please select an image');
      return;
    }

    this.isUploading = true;

    // Step 1: Upload to Cloudinary
    this.addServicesService.uploadImage(this.selectedImage).subscribe({
      next: async (res: any) => {
        this.service.imageUrl = res.secure_url;

        // Step 2: Save in Firestore
        await this.addServicesService.addService(this.service);
        alert('✅ Service added successfully!');

        // Reset form
        this.service = new Services({ name: '', description: '', price: 0, imageUrl: '' });
        this.selectedImage = null;
        this.isUploading = false;
      },
      error: () => {
        alert('❌ Image upload failed!');
        this.isUploading = false;
      }
    });
  }
}
