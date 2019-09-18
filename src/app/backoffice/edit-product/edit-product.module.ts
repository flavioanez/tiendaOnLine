import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EditProductRoutingModule} from './edit-product-routing.module';
import {EditProductComponent} from './component/edit-product/edit-product.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [EditProductComponent],
    exports: [EditProductComponent],
    imports: [
        CommonModule,
        EditProductRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class EditProductModule {
}
