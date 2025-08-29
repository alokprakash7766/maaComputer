import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { serverTimestamp } from 'firebase/firestore';
import { CloudinaryService } from '../../../services/cloudinary/cloudinary.service';
import { WeddingCardService } from '../../../services/weddingCard/wedding-card.service';
import { WeddingCard } from '../../../shared/models/weddingCard/wedding-card.model';

@Component({
  selector: 'app-add-wedding-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-wedding-card.component.html',
  styleUrls: ['./add-wedding-card.component.css']
})
export class AddWeddingCardComponent {
  weddingCardForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private cloudinaryService: CloudinaryService,
    private weddingCardService: WeddingCardService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.weddingCardForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  // File select
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  //  Submit form
  submitWeddingCard() {
    if (this.weddingCardForm.invalid || !this.selectedFile) {
      this.toastr.warning('Please fill all fields and select an image.');
      return;
    }

    this.spinner.show();

    // Step 1: Upload image to Cloudinary
    this.cloudinaryService.uploadImage(this.selectedFile).subscribe({
      next: (res: any) => {
        const card: WeddingCard = {
          ...this.weddingCardForm.value,
          imageUrl: res.secure_url,
          createdAt: serverTimestamp()
        };

        // Step 2: Save to Firestore
        this.weddingCardService.addWeddingCard(card)
          .then(() => {
            this.spinner.hide();
            this.toastr.success('Wedding card added successfully!');
            this.weddingCardForm.reset();
            this.router.navigateByUrl('/admin/update/category');
          })
          .catch((error) => {
            this.spinner.hide();
            this.toastr.error('Error saving wedding card!');
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
