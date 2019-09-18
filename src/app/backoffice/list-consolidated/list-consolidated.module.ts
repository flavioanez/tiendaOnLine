import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ListConsolidatedRoutingModule} from './list-consolidated-routing.module';
import {ListConsolidatedComponent} from './component/list-consolidated/list-consolidated.component';
import {FormsModule} from '@angular/forms';
import {PipeProductModule} from '../../pipe/pipe-product/pipe-product.module';
import {PDFExportModule} from '@progress/kendo-angular-pdf-export';

@NgModule({
    declarations: [ListConsolidatedComponent],
    imports: [
        CommonModule,
        ListConsolidatedRoutingModule,
        FormsModule,
        PipeProductModule.forRoot(),
        PDFExportModule
    ],
    exports: [ListConsolidatedComponent]
})
export class ListConsolidatedModule {
}
