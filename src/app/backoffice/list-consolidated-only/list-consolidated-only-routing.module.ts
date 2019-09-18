import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListConsolidatedOnlyComponent} from './component/list-consolidated-only/list-consolidated-only.component';

const routes: Routes = [{path: '', component: ListConsolidatedOnlyComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListConsolidatedOnlyRoutingModule { }
