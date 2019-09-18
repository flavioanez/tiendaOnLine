import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InvoicesRoutingModule} from './invoices-routing.module';
import {InvoicesComponent} from './component/invoices/invoices.component';
import {HeaderOfficeModule} from '../../header/header-office/header-office.module';

@NgModule({
    declarations: [InvoicesComponent],
    imports: [
        CommonModule,
        InvoicesRoutingModule,
        HeaderOfficeModule
    ]
})
export class InvoicesModule {
}
