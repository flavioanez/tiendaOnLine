import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DetailListConsolidateOnlyRoutingModule} from './detail-list-consolidate-only-routing.module';
import {DetailListConsolidateOnlyComponent} from './component/detail-list-consolidate-only/detail-list-consolidate-only.component';
import {PDFExportModule} from '@progress/kendo-angular-pdf-export';

@NgModule({
    declarations: [DetailListConsolidateOnlyComponent],
    imports: [
        CommonModule,
        DetailListConsolidateOnlyRoutingModule,
        PDFExportModule
    ],
    exports: [DetailListConsolidateOnlyComponent]
})
export class DetailListConsolidateOnlyModule {
}
