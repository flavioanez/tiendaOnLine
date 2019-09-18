import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SubStoreBusinessmanRoutingModule} from './sub-store-businessman-routing.module';
import {SubStoreBusinessmanComponent} from './component/sub-store-businessman/sub-store-businessman.component';
import {FormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {PipeProductModule} from '../../pipe/pipe-product/pipe-product.module';
import {PipeInvoiceModule} from '../../pipe/pipe-invoice/pipe-invoice.module';

@NgModule({
    declarations: [SubStoreBusinessmanComponent],
    imports: [
        CommonModule,
        SubStoreBusinessmanRoutingModule,
        FormsModule,
        InfiniteScrollModule,
        PipeProductModule.forRoot(),
        PipeInvoiceModule.forRoot()
    ]
})
export class SubStoreBusinessmanModule {
}
