import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CartBusinessmanRoutingModule} from './cart-businessman-routing.module';
import {CartBusinessmanComponent} from './component/cart-businessman/cart-businessman.component';
import {FormsModule} from '@angular/forms';
import {PipeProductModule} from '../../pipe/pipe-product/pipe-product.module';

@NgModule({
    declarations: [CartBusinessmanComponent],
    imports: [
        CommonModule,
        CartBusinessmanRoutingModule,
        FormsModule,
        PipeProductModule.forRoot()
    ]
})
export class CartBusinessmanModule {
}
