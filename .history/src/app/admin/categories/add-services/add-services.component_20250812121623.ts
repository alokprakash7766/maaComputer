import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { serverTimestamp } from 'firebase/firestore';
import { CloudinaryService } from '../../../services/cloudinary/cloudinary.service';
import { AddServicesService } from '../../../services/services/services.service';
import { Services } from '../../../shared/models/services/services.model';


@Component({
  selector: 'app-add-services',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css']
})
export class AddServicesComponent {
  serviceForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private cloudinaryService: CloudinaryService,
    private serviceService: AddServicesService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  // 📌 File select
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // 📌 Submit form
  submitService() {
    if (this.serviceForm.invalid || !this.selectedFile) {
      this.toastr.warning('Please fill all fields and select an image.');
      return;
    }

    this.spinner.show();

    // Step 1: Upload image to Cloudinary
    this.cloudinaryService.uploadImage(this.selectedFile).subscribe({
      next: (res: any) => {
        const service: Services = {
          ...this.serviceForm.value,
          imageUrl: res.secure_url,
          createdAt: serverTimestamp()
        };

        // Step 2: Save service to Firestore
        this.serviceService.addService(service)
          .then(() => {
            this.spinner.hide();
            this.toastr.success('Service saved successfully!');
            this.serviceForm.reset();
            this.router.navigateByUrl('/admin/update/services');
          })
          .catch((error) => {
            this.spinner.hide();
            this.toastr.error('Error saving service!');
            console.error(error);
          });
      },
      error: (err) => {
        this.spinner.hide();
        this.toastr.error('Image upload failed!');
        console.error(err);
      }
    });
  }
}
