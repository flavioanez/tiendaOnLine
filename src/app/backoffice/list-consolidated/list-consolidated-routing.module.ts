import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListConsolidatedComponent} from './component/list-consolidated/list-consolidated.component';

const routes: Routes = [{path: '', component: ListConsolidatedComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListConsolidatedRoutingModule { }
