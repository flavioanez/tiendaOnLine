import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ModifyRoutingModule} from './modify-routing.module';
import {ModifyComponent} from './component/modify/modify.component';
import {HeaderOfficeModule} from '../../header/header-office/header-office.module';

@NgModule({
    declarations: [ModifyComponent],
    imports: [
        CommonModule,
        ModifyRoutingModule,
        HeaderOfficeModule
    ]
})
export class ModifyModule {
}
