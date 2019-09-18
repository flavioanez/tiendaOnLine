import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ListOfPurchasesRoutingModule} from './list-of-purchases-routing.module';
import {ListOfPurchasesComponent} from './component/list-of-purchases/list-of-purchases.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [ListOfPurchasesComponent],
    exports: [ListOfPurchasesComponent],
    imports: [
        CommonModule,
        ListOfPurchasesRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ListOfPurchasesModule {
}
