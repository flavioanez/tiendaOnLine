import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailListConsolidateOnlyComponent} from './component/detail-list-consolidate-only/detail-list-consolidate-only.component';

const routes: Routes = [{path: '', component: DetailListConsolidateOnlyComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailListConsolidateOnlyRoutingModule { }
