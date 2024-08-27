import { Routes } from "@angular/router";
import { CheckoutComponent } from "./checkout.component";
import { authGuard } from "../../services/auth.guard.service";

export const CHECKOUT_ROUTES: Routes = [
  { path: '',
    component: CheckoutComponent,
    canActivate: [authGuard] },
];