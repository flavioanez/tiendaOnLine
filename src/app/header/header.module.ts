import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderRoutingModule} from './header-routing.module';

import {HeaderHomeComponent} from './component/header-home/header-home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [HeaderHomeComponent],
    imports: [
        CommonModule,
        HeaderRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [HeaderHomeComponent]
})
export class HeaderModule {
}
