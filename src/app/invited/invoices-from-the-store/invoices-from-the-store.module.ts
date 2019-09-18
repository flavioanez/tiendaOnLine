import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InvoicesFromTheStoreRoutingModule} from './invoices-from-the-store-routing.module';
import {InvoicesFromTheStoreComponent} from './component/invoices-from-the-store/invoices-from-the-store.component';
import {FormsModule} from '@angular/forms';
import {PipeProductModule} from '../../pipe/pipe-product/pipe-product.module';

@NgModule({
    declarations: [InvoicesFromTheStoreComponent],
    imports: [
        CommonModule,
        InvoicesFromTheStoreRoutingModule,
        FormsModule,
        PipeProductModule.forRoot()
    ]
})
export class InvoicesFromTheStoreModule {
}
