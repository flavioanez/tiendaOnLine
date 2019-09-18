import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HistoryCommissionRoutingModule} from './history-commission-routing.module';
import {HistoryCommissionComponent} from './component/history-commission/history-commission.component';

@NgModule({
    declarations: [HistoryCommissionComponent],
    exports: [HistoryCommissionComponent],
    imports: [
        CommonModule,
        HistoryCommissionRoutingModule
    ]
})
export class HistoryCommissionModule {
}
