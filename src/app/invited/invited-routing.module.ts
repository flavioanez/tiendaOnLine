import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StoreInvitedComponent} from './component/store-invited/store-invited.component';

const routes: Routes = [
    { path: '', component: StoreInvitedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvitedRoutingModule { }
