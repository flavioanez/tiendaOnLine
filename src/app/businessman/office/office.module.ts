import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OfficeRoutingModule} from './office-routing.module';
import {OfficeComponent} from './component/office/office.component';
import {HeaderOfficeModule} from '../../header/header-office/header-office.module';

@NgModule({
    declarations: [OfficeComponent],
    imports: [
        CommonModule,
        OfficeRoutingModule,
        HeaderOfficeModule
    ]
})
export class OfficeModule {
}
