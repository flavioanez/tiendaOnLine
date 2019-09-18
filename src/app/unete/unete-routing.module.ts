import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UneteComponent} from './component/unete/unete.component';

const routes: Routes = [
    { path: '', component: UneteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UneteRoutingModule { }
