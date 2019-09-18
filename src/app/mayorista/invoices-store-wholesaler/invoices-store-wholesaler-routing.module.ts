import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoicesFromTheStoreWholesalerComponent } from './component/invoices-store-wholesaler/invoices-store-wholesaler.component';

const routes: Routes = [{path: '', component: InvoicesFromTheStoreWholesalerComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesStoreWholesalerRoutingModule { }
