
import { Routes } from '@angular/router';
import { StoreComponent } from './store.component';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';

export const STORE_ROUTES : Routes = [
  {path :'', component : StoreComponent},
  {path: ':id', component: ProductDetailsComponent}
];
