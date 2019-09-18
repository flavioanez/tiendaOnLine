import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InvoicesFromTheStoreComponent} from './component/invoices-from-the-store/invoices-from-the-store.component';

const routes: Routes = [{path: '', component: InvoicesFromTheStoreComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesFromTheStoreRoutingModule { }
