import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CartWholesalerComponent} from './component/cart-wholesaler/cart-wholesaler.component';

const routes: Routes = [{path: '', component: CartWholesalerComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartWholesalerRoutingModule { }
