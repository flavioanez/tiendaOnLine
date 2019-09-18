import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoreMayoristaRoutingModule} from './store-mayorista-routing.module';
import {StoreMayoristaComponent} from './component/store-mayorista/store-mayorista.component';
import {FormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {PipeProductModule} from '../../pipe/pipe-product/pipe-product.module';

@NgModule({
    declarations: [StoreMayoristaComponent],
    imports: [
        CommonModule,
        StoreMayoristaRoutingModule,
        FormsModule,
        InfiniteScrollModule,
        PipeProductModule.forRoot()
    ]
})
export class StoreMayoristaModule {
}
