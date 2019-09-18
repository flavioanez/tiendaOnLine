import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ListPurchasesWholesalerRoutingModule} from './list-purchases-wholesaler-routing.module';
import {ListPurchasesWholesalerComponent} from './component/list-purchases-wholesaler/list-purchases-wholesaler.component';
import {FormsModule} from '@angular/forms';
import {PipeProductModule} from '../../pipe/pipe-product/pipe-product.module';

@NgModule({
    declarations: [ListPurchasesWholesalerComponent],
    exports: [ListPurchasesWholesalerComponent],
    imports: [
        CommonModule,
        ListPurchasesWholesalerRoutingModule,
        FormsModule,
        PipeProductModule.forRoot()
    ]
})
export class ListPurchasesWholesalerModule {
}
