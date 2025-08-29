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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weddingCardService: WeddingCardService
  ) {}

  ngOnInit(): void {
    this.cardId = this.route.snapshot.paramMap.get('id') || '';

    if (this.cardId) {
      this.weddingCardService.getWeddingCardById(this.cardId).subscribe({
        next: (data) => {
          if (data) {
            this.cardData = data;
          }
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching card:', err);
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }

  onUpdateCard(): void {
    if (!this.cardId) return;

    this.weddingCardService.updateWeddingCard(this.cardId, this.cardData)
      .then(() => {
        Swal.fire('Success!', 'Wedding card updated successfully.', 'success');
        this.router.navigate(['/admin/update-category']);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire('Error!', 'Failed to update wedding card.', 'error');
      });
  }
}
