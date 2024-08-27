import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard.service';

export const routes: Routes = [
  { path: '', redirectTo: 'store', pathMatch: 'full' },
  { path: 'store', loadChildren: () => import('./pages/store/store.routes').then(r => r.STORE_ROUTES) },
  {path: 'cart', loadChildren: () => import('./pages/cart/cart.routes').then(r => r.CART_ROUTES)},
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.routes').then(r => r.CHECKOUT_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'shipment',
    loadChildren: () => import('./pages/shipment/shipment.routes').then(r => r.CHECKOUT_ROUTES),
    canActivate: [authGuard]
  },
  {path: 'login', loadChildren: () => import('./pages/login/login.routes').then(r => r.LOGIN_ROUTES)},
  {path: 'register', loadChildren: () => import('./pages/register/register.routes').then(r => r.REGISTER_ROUTES)}
];


