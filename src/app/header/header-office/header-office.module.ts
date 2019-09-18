import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeaderOfficeRoutingModule} from './header-office-routing.module';
import {HeaderOfficeComponent} from './component/header-office/header-office.component';

@NgModule({
    declarations: [HeaderOfficeComponent],
    imports: [
        CommonModule,
        HeaderOfficeRoutingModule
    ],
    exports: [HeaderOfficeComponent]
})
export class HeaderOfficeModule {
}
