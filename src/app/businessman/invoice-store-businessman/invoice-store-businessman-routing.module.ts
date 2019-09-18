import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InvoiceStoreBusinessmanComponent} from './component/invoice-store-businessman/invoice-store-businessman.component';

const routes: Routes = [{path: '', component: InvoiceStoreBusinessmanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceStoreBusinessmanRoutingModule { }
