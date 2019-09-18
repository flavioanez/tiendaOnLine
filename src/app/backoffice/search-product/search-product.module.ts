import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchProductRoutingModule} from './search-product-routing.module';
import {SearchProductComponent} from './component/search-product/search-product.component';
import {FormsModule} from '@angular/forms';
import {PipeProductModule} from '../../pipe/pipe-product/pipe-product.module';
import {EditProductModule} from '../edit-product/edit-product.module';

@NgModule({
    declarations: [SearchProductComponent],
    exports: [SearchProductComponent],
    imports: [
        CommonModule,
        SearchProductRoutingModule,
        FormsModule,
        EditProductModule,
        PipeProductModule.forRoot()
    ]
})
export class SearchProductModule {
}
