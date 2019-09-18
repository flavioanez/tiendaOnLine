import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TopePurchaseRoutingModule} from './tope-purchase-routing.module';
import {TopePurchaseComponent} from './component/tope-purchase/tope-purchase.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [TopePurchaseComponent],
    exports: [TopePurchaseComponent],
    imports: [
        CommonModule,
        TopePurchaseRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class TopePurchaseModule {
}
