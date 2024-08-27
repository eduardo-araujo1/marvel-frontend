import { createId } from '@paralleldrive/cuid2';

export interface ICart {
  id: string;
  items: ICartItem[];
  shippingPrice: number;
}

export interface ICartItem {
  productId: number;
  productName: string;
  image: string;         
  price: number;    
  quantity: number;     
}

export class Cart implements ICart {
  id= createId();
  items: ICartItem[] = [];
  shippingPrice= 0;

}

export interface ICartTotals {
  subtotal : number;
  shipping: number;
  total: number;
}
