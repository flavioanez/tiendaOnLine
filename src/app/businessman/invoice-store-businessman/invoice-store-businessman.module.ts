import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InvoiceStoreBusinessmanRoutingModule} from './invoice-store-businessman-routing.module';
import {InvoiceStoreBusinessmanComponent} from './component/invoice-store-businessman/invoice-store-businessman.component';
import {FormsModule} from '@angular/forms';
import {PipeProductModule} from '../../pipe/pipe-product/pipe-product.module';

@NgModule({
    declarations: [InvoiceStoreBusinessmanComponent],
    imports: [
        CommonModule,
        InvoiceStoreBusinessmanRoutingModule,
        FormsModule,
        PipeProductModule.forRoot()
    ]
})
export class InvoiceStoreBusinessmanModule {
}
