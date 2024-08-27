import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ICart, ICartTotals } from '../../model/cart';
import { CartService } from '../../services/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface DeliveryOption {
  id: number;
  name: string;
  deliveryTime: string;
  price: number;
}


@Component({
  selector: 'app-shipment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule, MatSnackBarModule],
  templateUrl: './shipment.component.html',
  styleUrl: './shipment.component.scss'
})
export class ShipmentComponent implements OnInit{


  deliveryOptions: DeliveryOption[] = [
    { id: 1, name: 'Sedex', deliveryTime: '2 dias', price: 100 },
    { id: 2, name: 'JadLog', deliveryTime: '7 dias', price: 50 },
    { id: 3, name: 'Braspress', deliveryTime: '10 dias', price: 20 },
    { id: 4, name: 'Total Express', deliveryTime: '20 dias', price: 15 }
  ];

  
  selectedOption: number;
  shipmentForm: FormGroup;
  cart$: Observable<ICart | null> | undefined;
  cartTotals$: Observable<ICartTotals | null> | undefined;
  totalWithShipping: number = 0;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.selectedOption = this.deliveryOptions[0].id;
    this.shipmentForm = this.fb.group({
      selectedOption: [this.selectedOption, Validators.required]
    });
  }

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    this.cartTotals$ = this.cartService.cartTotals$;
    this.updateShipmentPrice();
  }

  updateShipmentPrice(): void {
    this.cartTotals$?.subscribe(cartTotals => {
      if (cartTotals) {
        const selectedOptionPrice = this.getSelectedOptionPrice();
        this.totalWithShipping = cartTotals.subtotal + selectedOptionPrice;
        console.log(`Total com envio: R$ ${this.totalWithShipping}`);
      }
    });
  }

  private getSelectedOptionPrice(): number {
    const selectedOption = this.deliveryOptions.find(option => option.id === this.selectedOption);
    return selectedOption ? selectedOption.price : 0;
  }

  goToNextStep(): void {
    this.snackBar.open('Projeto finalizado com sucesso!', 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    }).afterDismissed().subscribe(() => {
      this.router.navigate(['/']);
      this.cartService.clearCart();
    });
  }
}

