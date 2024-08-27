import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ICart } from '../../model/cart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent  {
  cart$: Observable<ICart | null>;
  
  constructor(public cartService: CartService) {
    this.cart$ = this.cartService.cart$;
  }
}
  
  