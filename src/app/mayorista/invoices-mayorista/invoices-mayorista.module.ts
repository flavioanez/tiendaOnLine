import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InvoicesMayoristaRoutingModule} from './invoices-mayorista-routing.module';
import {InvoicesMayoristaComponent} from './component/invoices-mayorista/invoices-mayorista.component';
import {PDFExportModule} from '@progress/kendo-angular-pdf-export';

@NgModule({
    declarations: [InvoicesMayoristaComponent],
    imports: [
        CommonModule,
        InvoicesMayoristaRoutingModule,
        PDFExportModule
    ]
})
export class InvoicesMayoristaModule {
}
