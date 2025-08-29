import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { serverTimestamp } from 'firebase/firestore';
import { CloudinaryService } from '../../../services/cloudinary/cloudinary.service';
import { AddServicesService } from '../../../services/services/services.service';
import { Services } from '../../../shared/models/services/services.model';

@Component({
  selector: 'app-edit-services',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-services.component.html',
  styleUrls: ['./edit-services.component.css']
})
export class EditServicesComponent implements OnInit {
  serviceForm!: FormGroup;
  selectedFile: File | null = null;
  serviceId!: string;
  oldImageUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cloudinaryService: CloudinaryService,
    private serviceService: AddServicesService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });

    this.serviceId = this.route.snapshot.paramMap.get('id') as string;

    if (this.serviceId) {
      this.loadServiceData();
    }
  }

  loadServiceData() {
    this.spinner.show();
    this.serviceService.getSingleService(this.serviceId)
      .then((service: Services) => {
        this.serviceForm.patchValue({
          name: service.name,
          description: service.description,
          price: service.price
        });
        this.oldImageUrl = service.imageUrl || '';
        this.spinner.hide();
      })
      .catch(err => {
        this.toastr.error('Failed to load service details');
        console.error(err);
        this.spinner.hide();
      });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateService() {
    if (this.serviceForm.invalid) {
      this.toastr.warning('Please fill all fields.');
      return;
    }

    this.spinner.show();

    const updateData = (imageUrl: string) => {
      const updatedService: Partial<Services> = {
        ...this.serviceForm.value,
        imageUrl: imageUrl,
        updatedAt: serverTimestamp()
      };

      this.serviceService.updateService(this.serviceId, updatedService)
        .then(() => {
          this.spinner.hide();
          this.toastr.success('Service updated successfully!');
          this.router.navigateByUrl('/admin/update/services');
        })
        .catch(err => {
          this.spinner.hide();
          this.toastr.error('Error updating service!');
          console.error(err);
        });
    };

    if (this.selectedFile) {
      // Upload new image first
      this.cloudinaryService.uploadImage(this.selectedFile).subscribe({
        next: (res: any) => updateData(res.secure_url),
        error: (err) => {
          this.spinner.hide();
          this.toastr.error('Image upload failed!');
          console.error(err);
        }
      });
    } else {
      // Keep old image
      updateData(this.oldImageUrl);
    }
  }
}
