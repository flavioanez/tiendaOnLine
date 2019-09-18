import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InvoicesMayoristaComponent} from './component/invoices-mayorista/invoices-mayorista.component';

const routes: Routes = [{path: '', component: InvoicesMayoristaComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesMayoristaRoutingModule { }
