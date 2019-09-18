import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CreateProductRoutingModule} from './create-product-routing.module';
import {CreateProductComponent} from './component/create-product/create-product.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [CreateProductComponent],
    exports: [CreateProductComponent],
    imports: [
        CommonModule,
        CreateProductRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class CreateProductModule {
}
