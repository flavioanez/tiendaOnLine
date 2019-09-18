import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DetailBusinessmanRoutingModule} from './detail-businessman-routing.module';
import {DetailBusinessmanComponent} from './component/detail-businessman/detail-businessman.component';
import {FormsModule} from '@angular/forms';
import {PipeProductModule} from '../../pipe/pipe-product/pipe-product.module';

@NgModule({
    declarations: [DetailBusinessmanComponent],
    imports: [
        CommonModule,
        DetailBusinessmanRoutingModule,
        FormsModule,
        PipeProductModule.forRoot()
    ]
})
export class DetailBusinessmanModule {
}
