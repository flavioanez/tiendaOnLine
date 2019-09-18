import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InvitedRoutingModule} from './invited-routing.module';
import {StoreInvitedComponent} from './component/store-invited/store-invited.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {FormsModule} from '@angular/forms';
import {PipeProductModule} from '../pipe/pipe-product/pipe-product.module';

// pipes.

@NgModule({
    declarations: [
        StoreInvitedComponent
    ],
    imports: [
        CommonModule,
        InvitedRoutingModule,
        InfiniteScrollModule,
        FormsModule,
        PipeProductModule.forRoot()
    ]
})
export class InvitedModule {
}
