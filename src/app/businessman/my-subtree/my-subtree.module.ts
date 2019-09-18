import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MySubtreeRoutingModule} from './my-subtree-routing.module';
import {MySubtreeComponent} from './component/my-subtree/my-subtree.component';
import {HeaderOfficeModule} from '../../header/header-office/header-office.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
    declarations: [MySubtreeComponent],
    imports: [
        CommonModule,
        MySubtreeRoutingModule,
        HeaderOfficeModule,
        InfiniteScrollModule
    ]
})
export class MySubtreeModule {
}
