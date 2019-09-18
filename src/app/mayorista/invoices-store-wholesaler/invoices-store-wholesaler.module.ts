import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InvoicesStoreWholesalerRoutingModule} from './invoices-store-wholesaler-routing.module';
import {InvoicesFromTheStoreWholesalerComponent} from './component/invoices-store-wholesaler/invoices-store-wholesaler.component';
import {FormsModule} from '@angular/forms';
import {PipeProductModule} from '../../pipe/pipe-product/pipe-product.module';

@NgModule({
    declarations: [InvoicesFromTheStoreWholesalerComponent],
    imports: [
        CommonModule,
        InvoicesStoreWholesalerRoutingModule,
        FormsModule,
        PipeProductModule.forRoot()
    ]
})
export class InvoicesStoreWholesalerModule {
}
