import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { HQ } from '../../model/hq';
import { ActivatedRoute } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  product: HQ | null = null;
  quantity: number = 1;


  hqService = inject(ProductsService);
  activateRoute = inject(ActivatedRoute);
  cartService = inject(CartService)

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct(){
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if(id){
      this.hqService.findById(+id).subscribe({
        next: product=> {
          this.product = product
        },
        error: error => console.log(error)
      });
    }
  }

  addItemToCart() {
    if (this.product) {
      this.cartService.addItemToCart(this.product, this.quantity);
    }
  }

  incrementQuantity(){
    this.quantity++;
  }
  decrementQuantity(){
    if(this.quantity>1){
      this.quantity--;
    }
  }
}