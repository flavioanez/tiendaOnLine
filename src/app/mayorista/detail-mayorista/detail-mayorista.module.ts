import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DetailMayoristaRoutingModule} from './detail-mayorista-routing.module';
import {DetailMayoristaComponent} from './component/detail-mayorista/detail-mayorista.component';
import {FormsModule} from '@angular/forms';
import {PipeProductModule} from '../../pipe/pipe-product/pipe-product.module';

@NgModule({
    declarations: [DetailMayoristaComponent],
    imports: [
        CommonModule,
        DetailMayoristaRoutingModule,
        FormsModule,
        PipeProductModule.forRoot()
    ]
})
export class DetailMayoristaModule {
}
