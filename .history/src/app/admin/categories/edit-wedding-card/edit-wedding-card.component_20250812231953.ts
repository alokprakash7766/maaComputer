import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { WeddingCardService } from '../../../services/weddingCard/wedding-card.service';
import { WeddingCard } from '../../../shared/models/weddingCard/wedding-card.model';

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

  selectedFile?: File;
  previewImageUrl: string | ArrayBuffer | null = null;

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
          this.loading = false;
        });
    } else {
     
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImageUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async onUpdateCard(): Promise<void> {
    if (!this.cardId) return;
    try {
      // If a new file is selected, upload it and get the image URL
      if (this.selectedFile) {
        const uploadedImageUrl = await this.weddingCardService.uploadImage(this.selectedFile);
        this.cardData.imageUrl = uploadedImageUrl;
      }

      await this.weddingCardService.updateWeddingCard(this.cardId, this.cardData);

      Swal.fire('Success!', 'Wedding card updated successfully.', 'success');
      this.router.navigate(['/admin/update-category']);
    } catch (err) {
      console.error(err);
      Swal.fire('Error!', 'Failed to update wedding card.', 'error');
    } finally {
    
    }
  }
}
