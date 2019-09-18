import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommissionRoutingModule} from './commission-routing.module';
import {CommissionComponent} from './component/commission/commission.component';
import {HeaderOfficeModule} from '../../header/header-office/header-office.module';

@NgModule({
    declarations: [CommissionComponent],
    exports: [CommissionComponent],
    imports: [
        CommonModule,
        CommissionRoutingModule
    ]
})
export class CommissionModule {
}
