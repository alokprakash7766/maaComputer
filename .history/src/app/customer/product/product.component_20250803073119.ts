import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  ngOnInit(): void {
    console.log('✅ ProductComponent loaded');
  }
}
