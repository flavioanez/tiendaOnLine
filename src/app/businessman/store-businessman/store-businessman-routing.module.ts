import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StoreBusinessmanComponent} from './component/store-businessman/store-businessman.component';

const routes: Routes = [{path: '', component: StoreBusinessmanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreBusinessmanRoutingModule { }
