import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InvoicesInvitedRoutingModule} from './invoices-invited-routing.module';
import {InvoicesInvitedComponent} from './component/invoices-invited/invoices-invited.component';
import {PDFExportModule} from '@progress/kendo-angular-pdf-export';

@NgModule({
    declarations: [InvoicesInvitedComponent],
    imports: [
        CommonModule,
        InvoicesInvitedRoutingModule,
        PDFExportModule
    ]
})
export class InvoicesInvitedModule {
}
