import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { WeddingCardService } from '../../../services/weddingCard/wedding-card.service';
import { WeddingCard } from '../../../shared/models/weddingCard/wedding-card.model';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

@Component({
  selector: 'app-edit-wedding-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-wedding-card.component.html',
  styleUrls: ['./edit-wedding-card.component.css']
})
export class EditWeddingCardComponent implements OnInit {
  cardId!: string;
  cardData: WeddingCard = {
    name: '',
    description: '',
    price: 0,
    imageUrl: ''
  };
  loading = true;
  uploadProgress = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weddingCardService: WeddingCardService
  ) {}

  ngOnInit(): void {
    this.cardId = this.route.snapshot.paramMap.get('id') || '';

    if (this.cardId) {
      this.weddingCardService.getSingleWeddingCard(this.cardId)
        .then(data => {
          this.cardData = data;
        
        })
        .catch(err => {
          console.error('Error fetching card:', err);
         
        });
    } else {
    
    }
  }

  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;

    this.loading = true;
    const storage = getStorage();
    const storageRef = ref(storage, `weddingCards/${file.name}_${Date.now()}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // Optional: update progress bar here
      },
      (error) => {
        console.error('Upload failed:', error);
        Swal.fire('Error', 'Image upload failed!', 'error');
        this.loading = false;
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          this.cardData.imageUrl = downloadURL;
          Swal.fire('Success', 'Image uploaded successfully!', 'success');
        });
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/admin/update/category']);
  }

  onUpdateCard(): void {
    if (!this.cardId) return;

    this.weddingCardService.updateWeddingCard(this.cardId, this.cardData)
      .then(() => {
        Swal.fire('Success!', 'Wedding card updated successfully.', 'success');
        this.router.navigate(['/admin/update/category']);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire('Error!', 'Failed to update wedding card.', 'error');
      });
  }
}
