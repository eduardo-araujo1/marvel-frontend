import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartDetailsComponent } from '../../components/cart-details/cart-details.component';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ICart, ICartItem, ICartTotals } from '../../model/cart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartDetailsComponent, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cart$!: Observable<ICart | null>;
  cartTotals$!: Observable<ICartTotals | null>;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    this.cartTotals$ = this.cartService.cartTotals$;
  }

  incrementItemQuantity(item: ICartItem) {
    this.cartService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: ICartItem) {
    this.cartService.decrementItemQuantity(item);
  }

  removeCartItem(item: ICartItem) {
    this.cartService.removeItemFromCart(item);
  }
}
