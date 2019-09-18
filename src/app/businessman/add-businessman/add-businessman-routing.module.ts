import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddBusinessmanComponent} from './component/add-businessman/add-businessman.component';

const routes: Routes = [{path: '', component: AddBusinessmanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddBusinessmanRoutingModule { }
