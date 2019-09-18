import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchBusinessmanRoutingModule} from './search-businessman-routing.module';
import {SearchBusinessmanComponent} from './component/search-businessman/search-businessman.component';
import {FormsModule} from '@angular/forms';
import {PipeMayoristaModule} from '../../pipe/pipe-mayorista/pipe-mayorista.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
    declarations: [SearchBusinessmanComponent],
    exports: [SearchBusinessmanComponent],
    imports: [
        CommonModule,
        SearchBusinessmanRoutingModule,
        FormsModule,
        PipeMayoristaModule.forRoot(),
        InfiniteScrollModule
    ]
})
export class SearchBusinessmanModule {
}
