import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InvoicesInvitedComponent} from './component/invoices-invited/invoices-invited.component';

const routes: Routes = [{path: '', component: InvoicesInvitedComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesInvitedRoutingModule { }
