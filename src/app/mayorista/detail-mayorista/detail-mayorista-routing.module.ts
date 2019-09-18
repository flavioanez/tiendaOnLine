import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailMayoristaComponent} from './component/detail-mayorista/detail-mayorista.component';

const routes: Routes = [{path: '', component: DetailMayoristaComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailMayoristaRoutingModule { }
