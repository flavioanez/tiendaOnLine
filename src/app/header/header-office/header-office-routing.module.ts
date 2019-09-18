import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HeaderOfficeComponent} from './component/header-office/header-office.component';

const routes: Routes = [{path: '', component: HeaderOfficeComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderOfficeRoutingModule { }
