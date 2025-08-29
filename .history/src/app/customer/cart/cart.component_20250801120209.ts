import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import {
  collection,
  collectionData,
  Firestore
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems$: Observable<any[]>;

  constructor(private firestore: Firestore) {
    const cartRef = collection(this.firestore, 'cart');
    this.cartItems$ = collectionData(cartRef, { idField: 'id' });
  }

  ngOnInit(): void {}
}
