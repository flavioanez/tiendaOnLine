import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubStoreInvitedComponent} from './component/sub-store-invited/sub-store-invited.component';

const routes: Routes = [
    { path: '', component: SubStoreInvitedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubStoreInvitedRoutingModule { }
