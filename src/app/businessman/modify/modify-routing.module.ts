import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ModifyComponent} from './component/modify/modify.component';

const routes: Routes = [{path: '', component: ModifyComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyRoutingModule { }
