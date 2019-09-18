import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SubStoreMayoristaRoutingModule} from './sub-store-mayorista-routing.module';
import {SubStoreMayoristaComponent} from './component/sub-store-mayorista/sub-store-mayorista.component';
import {FormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {PipeProductModule} from '../../pipe/pipe-product/pipe-product.module';

@NgModule({
    declarations: [SubStoreMayoristaComponent],
    imports: [
        CommonModule,
        SubStoreMayoristaRoutingModule,
        FormsModule,
        InfiniteScrollModule,
        PipeProductModule.forRoot()
    ]
})
export class SubStoreMayoristaModule {
}
