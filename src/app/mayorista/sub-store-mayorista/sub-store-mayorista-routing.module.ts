import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubStoreMayoristaComponent} from './component/sub-store-mayorista/sub-store-mayorista.component';

const routes: Routes = [{path: '', component: SubStoreMayoristaComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubStoreMayoristaRoutingModule { }
