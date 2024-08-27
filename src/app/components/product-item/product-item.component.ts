import { Component, Input } from '@angular/core';
import { HQ } from '../../model/hq';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() hq! : HQ;
  constructor(private cartService: CartService) { }

  addItemToCart() {
    if (this.hq) {
      this.cartService.addItemToCart(this.hq, 1);
    }
  }
}

