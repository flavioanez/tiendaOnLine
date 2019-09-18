import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VisibilityInvoiceComponent} from './component/visibility-invoice/visibility-invoice.component';

const routes: Routes = [{path: '', component: VisibilityInvoiceComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisibilityInvoiceRoutingModule { }
