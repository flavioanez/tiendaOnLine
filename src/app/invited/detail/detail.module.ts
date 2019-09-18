import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DetailRoutingModule} from './detail-routing.module';
import {DetailComponent} from './component/detail/detail.component';
import {FormsModule} from '@angular/forms';
import {PipeProductModule} from '../../pipe/pipe-product/pipe-product.module';

@NgModule({
    declarations: [DetailComponent],
    imports: [
        CommonModule,
        DetailRoutingModule,
        FormsModule,
        PipeProductModule.forRoot()
    ]
})
export class DetailModule {}
