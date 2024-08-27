import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICartItem } from '../../model/cart';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.scss'
})
export class CartDetailsComponent {
  @Input() items: ICartItem[] = [];
  @Output() increment: EventEmitter<ICartItem> = new EventEmitter<ICartItem>();
  @Output() decrement: EventEmitter<ICartItem> = new EventEmitter<ICartItem>();
  @Output() remove: EventEmitter<ICartItem> = new EventEmitter<ICartItem>();

  incrementItemQuantity(item: ICartItem) {
    this.increment.emit(item);
  }

  decrementItemQuantity(item: ICartItem) {
    this.decrement.emit(item);
  }

  removeCartItem(item: ICartItem) {
    this.remove.emit(item);
  }
}
