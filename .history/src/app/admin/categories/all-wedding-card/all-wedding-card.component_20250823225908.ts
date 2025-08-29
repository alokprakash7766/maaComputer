import { Component } from '@angular/core';
import { WeddingCard } from '../../../shared/models/weddingCard/wedding-card.model';

@Component({
  selector: 'app-all-wedding-card',
  imports: [],
  templateUrl: './all-wedding-card.component.html',
  styleUrl: './all-wedding-card.component.css'
})
export class AllWeddingCardComponent implements OnInit{
         weddingCardsList: WeddingCard[] = [];
         

}
