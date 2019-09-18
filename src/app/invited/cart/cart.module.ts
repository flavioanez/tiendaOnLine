import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CartRoutingModule} from './cart-routing.module';
import {CartComponent} from './component/cart/cart.component';
import {FormsModule} from '@angular/forms';
import {PipeProductModule} from '../../pipe/pipe-product/pipe-product.module';

@NgModule({
    declarations: [CartComponent],
    imports: [
        CommonModule,
        CartRoutingModule,
        FormsModule,
        PipeProductModule.forRoot()
    ]
})
export class CartModule {
}
