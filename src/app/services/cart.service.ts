import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart,ICart, ICartItem, ICartTotals } from '../model/cart';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { HQ } from '../model/hq';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:8080/cart';

  private cartSource = new BehaviorSubject<ICart | null>(null);
  cart$ = this.cartSource.asObservable();
  private cartTotalsSource = new BehaviorSubject<ICartTotals | null>(null);
  cartTotals$ = this.cartTotalsSource.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  private loadCart() {
    const cartId = localStorage.getItem('angular_cart_id');
    if (cartId) {
      this.getCart(cartId).subscribe();
    }
  }

  createCart(): Cart {
    const cart = new Cart();
    localStorage.setItem("angular_cart_id", cart.id);
    return cart;
  }

  getCurrentCart() {
    return this.cartSource.value;
  }

  private calculateTotals() {
    const cart = this.getCurrentCart();
    if (!cart) return;
    const shipping = cart.shippingPrice;
    const subtotal = cart.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    this.cartTotalsSource.next({shipping: shipping, total, subtotal});
  }

  //get cart from the backend
  getCart(id: string) {
    return this.http.get<ICart>(this.apiUrl + "/" + id)
      .pipe(
        map((cart: ICart) => {
          this.cartSource.next(cart);
          this.calculateTotals();
          return cart;
        })
      );
  }

  setCart(cart: ICart) {
    const { id, shippingPrice, ...cartToSend } = cart;
    return this.http.post<ICart>(this.apiUrl, cartToSend)
      .subscribe({
        next: (response: ICart) => {
          this.cartSource.next(response);
          this.calculateTotals();
          localStorage.setItem('angular_cart_id', response.id);
        },
        error: (error) => {
          console.log('Erro ao enviar o carrinho:', error.error);
        }
      });
  }

  addItemToCart(product: HQ, quantity: number) {
    const itemToAdd = this.mapProductToCartItem(product);
    const cart = this.getCurrentCart() ?? this.createCart();
    cart.items = this.addOrUpdateItem(cart.items, itemToAdd, quantity);
    this.setCart(cart);
  }

  addOrUpdateItem(items: ICartItem[], item: ICartItem, quantity: number): ICartItem[] {
    const itemFound = items.find(i => i.productId == item.productId);
    if (itemFound) {
      itemFound.quantity += quantity;
    } else {
      item.quantity = quantity;
      items.push(item);
    }
    return items;
  }

  mapProductToCartItem(product: HQ): ICartItem {
    return {
      productId: product.id,
      productName: product.name,  
      price: product.price,      
      quantity: 0,
      image: product.image,
    };
  }
  incrementItemQuantity(item: ICartItem) {
    const cart = this.getCurrentCart();
    if (cart) {
      const foundItemIndex = cart.items.findIndex(i => i.productId == item.productId);
      cart.items[foundItemIndex].quantity++;
      this.setCart(cart);
    }
  }

  decrementItemQuantity(item: ICartItem) {
    const cart = this.getCurrentCart();
    if (cart) {
      const foundItemIndex = cart.items.findIndex(i => i.productId == item.productId);
      if (cart.items[foundItemIndex].quantity > 1) {
        cart.items[foundItemIndex].quantity--;
        this.setCart(cart);
      } else {
        this.removeItemFromCart(item);
      }
    }
  }

  removeItemFromCart(item: ICartItem) {
    const cart = this.getCurrentCart();
    if (cart && cart.items.some(i => i.productId == item.productId)) {
      cart.items = cart.items.filter(i => i.productId != item.productId);
      if (cart.items.length > 0) {
        this.setCart(cart);
      } else {
        this.deleteCart(cart);
      }
    }
  }

  deleteCart(cart: ICart) {
    return this.http.delete(this.apiUrl + '/' + cart.id, {responseType: 'text'}).subscribe({
      next: () => {
        this.cartSource.next(null);
        this.cartTotalsSource.next(null);
        localStorage.removeItem('angular_cart_id');
      }
    })
  }

  clearCart() {
    const cart = this.getCurrentCart();
    if (cart) {
      this.deleteCart(cart);
    }
  }

}