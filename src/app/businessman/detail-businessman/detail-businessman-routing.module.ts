import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailBusinessmanComponent} from './component/detail-businessman/detail-businessman.component';

const routes: Routes = [{path: '', component: DetailBusinessmanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailBusinessmanRoutingModule { }
