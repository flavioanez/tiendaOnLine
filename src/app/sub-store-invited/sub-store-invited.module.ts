import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SubStoreInvitedRoutingModule} from './sub-store-invited-routing.module';
import {SubStoreInvitedComponent} from './component/sub-store-invited/sub-store-invited.component';
import {FormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {PipeProductModule} from '../pipe/pipe-product/pipe-product.module';

@NgModule({
    declarations: [
        SubStoreInvitedComponent,
    ],
    imports: [
        CommonModule,
        SubStoreInvitedRoutingModule,
        FormsModule,
        InfiniteScrollModule,
        PipeProductModule.forRoot()
    ]
})
export class SubStoreInvitedModule {
}
