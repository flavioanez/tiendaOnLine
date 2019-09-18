import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchWholesalerRoutingModule} from './search-wholesaler-routing.module';
import {SearchWholesalerComponent} from './component/search-wholesaler/search-wholesaler.component';
import {FormsModule} from '@angular/forms';
import {PipeMayoristaModule} from '../../pipe/pipe-mayorista/pipe-mayorista.module';
import {ListPurchasesWholesalerModule} from '../list-purchases-wholesaler/list-purchases-wholesaler.module';
import {ListOfPurchasesModule} from '../list-of-purchases/list-of-purchases.module';

@NgModule({
    declarations: [SearchWholesalerComponent],
    exports: [SearchWholesalerComponent],
    imports: [
        CommonModule,
        SearchWholesalerRoutingModule,
        FormsModule,
        PipeMayoristaModule.forRoot(),
        ListPurchasesWholesalerModule,
        ListOfPurchasesModule
    ]
})
export class SearchWholesalerModule {
}
