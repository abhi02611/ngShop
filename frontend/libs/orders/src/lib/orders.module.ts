import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { BadgeModule } from 'primeng/badge';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { CartIconComponent } from './component/cart-icon/cart-icon.component';
import { OrderSummaryComponent } from './component/order-summary/order-summary.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { AuthGuard } from '@frontend/user';


const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    component: CheckoutPageComponent,
  },
  {
    path: 'success',
    component: ThankYouComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    BadgeModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
  ],
  declarations: [
    CartIconComponent,
    OrderSummaryComponent,
    CartPageComponent,
    CheckoutPageComponent,
    ThankYouComponent,
  ],
  exports: [
    CartIconComponent,
    OrderSummaryComponent,
    CartPageComponent,
    CheckoutPageComponent,
    ThankYouComponent
  ],
})
export class OrdersModule {
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}
