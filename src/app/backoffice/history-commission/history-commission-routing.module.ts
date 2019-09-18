import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HistoryCommissionComponent} from './component/history-commission/history-commission.component';

const routes: Routes = [{ path: '', component: HistoryCommissionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryCommissionRoutingModule { }
