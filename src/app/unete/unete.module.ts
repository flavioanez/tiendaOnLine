import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UneteRoutingModule} from './unete-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {UneteComponent} from './component/unete/unete.component';
import {HeaderModule} from '../header/header.module';

@NgModule({
    declarations: [UneteComponent],
    imports: [
        CommonModule,
        UneteRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HeaderModule
    ]
})
export class UneteModule {
}
