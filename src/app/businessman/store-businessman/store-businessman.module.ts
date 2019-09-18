import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoreBusinessmanRoutingModule} from './store-businessman-routing.module';
import {StoreBusinessmanComponent} from './component/store-businessman/store-businessman.component';
import {FormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {PipeProductModule} from '../../pipe/pipe-product/pipe-product.module';

@NgModule({
    declarations: [StoreBusinessmanComponent],
    imports: [
        CommonModule,
        StoreBusinessmanRoutingModule,
        FormsModule,
        InfiniteScrollModule,
        PipeProductModule.forRoot()
    ]
})
export class StoreBusinessmanModule {
}
