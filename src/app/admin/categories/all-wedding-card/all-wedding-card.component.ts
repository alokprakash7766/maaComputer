import { Component, OnInit } from '@angular/core';
import { WeddingCard } from '../../../shared/models/weddingCard/wedding-card.model';
import { Router, RouterLink } from '@angular/router';
import { WeddingCardService } from '../../../services/weddingCard/wedding-card.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-wedding-card',
  imports: [CommonModule],
  templateUrl: './all-wedding-card.component.html',
  styleUrl: './all-wedding-card.component.css'
})
export class AllWeddingCardComponent implements OnInit {
  weddingCardsList: WeddingCard[] = [];
  constructor(
    private router: Router,
    private weddingCardService: WeddingCardService
  ) { }
  ngOnInit(): void {
    // Wedding Cards
    this.weddingCardService.getAllWeddingCards().subscribe({
      next: (data) => this.weddingCardsList = data,
      error: (err) => console.error('Error fetching wedding cards:', err)
    });
  }


  // Wedding Card actions
  editWeddingCard(id?: string) {
    if (!id) return;
    this.router.navigate(['/admin/edit-wedding/card', id]);
  }

  deleteWeddingCard(id?: string) {
    if (!id) return;
    Swal.fire({
      title: 'Are you sure?',
      text: 'This wedding card will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.weddingCardService.deleteWeddingCard(id).then(() => {
          Swal.fire('Deleted!', 'Wedding card has been deleted.', 'success');
        }).catch((err) => {
          console.error(err);
          Swal.fire('Error!', 'Failed to delete wedding card.', 'error');
        });
      }
    });
  }
}
