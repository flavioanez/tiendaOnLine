import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CartBusinessmanComponent} from './component/cart-businessman/cart-businessman.component';

const routes: Routes = [{path: '', component: CartBusinessmanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartBusinessmanRoutingModule { }
