import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubStoreBusinessmanComponent} from './component/sub-store-businessman/sub-store-businessman.component';

const routes: Routes = [{path: '', component: SubStoreBusinessmanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubStoreBusinessmanRoutingModule { }
