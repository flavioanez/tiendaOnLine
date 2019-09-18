import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CartWholesalerRoutingModule} from './cart-wholesaler-routing.module';
import {FormsModule} from '@angular/forms';
import {PipeProductModule} from '../../pipe/pipe-product/pipe-product.module';
import {CartWholesalerComponent} from './component/cart-wholesaler/cart-wholesaler.component';

@NgModule({
    declarations: [CartWholesalerComponent],
    imports: [
        CommonModule,
        CartWholesalerRoutingModule,
        FormsModule,
        PipeProductModule.forRoot()
    ]
})
export class CartWholesalerModule {
}
