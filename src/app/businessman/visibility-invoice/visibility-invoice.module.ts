import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VisibilityInvoiceRoutingModule} from './visibility-invoice-routing.module';
import {VisibilityInvoiceComponent} from './component/visibility-invoice/visibility-invoice.component';
import {PDFExportModule} from '@progress/kendo-angular-pdf-export';
import {HeaderOfficeModule} from '../../header/header-office/header-office.module';

@NgModule({
    declarations: [VisibilityInvoiceComponent],
    imports: [
        CommonModule,
        VisibilityInvoiceRoutingModule,
        PDFExportModule,
        HeaderOfficeModule
    ]
})
export class VisibilityInvoiceModule {
}
