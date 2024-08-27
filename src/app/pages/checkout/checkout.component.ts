import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICart, ICartTotals } from '../../model/cart';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cart$: Observable<ICart | null> | undefined;
  cartTotals$: Observable<ICartTotals | null> | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) {
    this.checkoutForm = this.formBuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]]
    });
  }

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    this.cartTotals$ = this.cartService.cartTotals$;
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      console.log(this.checkoutForm.value);
    }
  }
}