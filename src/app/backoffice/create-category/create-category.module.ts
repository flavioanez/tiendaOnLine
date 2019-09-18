import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CreateCategoryRoutingModule} from './create-category-routing.module';
import {CreateCategoryComponent} from './component/create-category/create-category.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [CreateCategoryComponent],
    exports: [CreateCategoryComponent],
    imports: [
        CommonModule,
        CreateCategoryRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class CreateCategoryModule {
}
