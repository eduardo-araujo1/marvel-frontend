import { Routes } from "@angular/router";
import { ShipmentComponent } from "./shipment.component";
import { authGuard } from "../../services/auth.guard.service";

export const CHECKOUT_ROUTES: Routes = [
  { path: '',
    component: ShipmentComponent,
    canActivate: [authGuard] },
];