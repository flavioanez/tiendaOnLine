import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WholesalerComponent} from './component/wholesaler/wholesaler.component';

const routes: Routes = [{path: '', component: WholesalerComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WholesalerRoutingModule { }
