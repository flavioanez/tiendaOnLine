import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MySubtreeComponent} from './component/my-subtree/my-subtree.component';

const routes: Routes = [{path: '', component: MySubtreeComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MySubtreeRoutingModule { }
