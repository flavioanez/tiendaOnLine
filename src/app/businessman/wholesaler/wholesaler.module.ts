import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WholesalerRoutingModule} from './wholesaler-routing.module';
import {WholesalerComponent} from './component/wholesaler/wholesaler.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderOfficeModule} from '../../header/header-office/header-office.module';

@NgModule({
    declarations: [WholesalerComponent],
    imports: [
        CommonModule,
        WholesalerRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HeaderOfficeModule
    ]
})
export class WholesalerModule {
}
