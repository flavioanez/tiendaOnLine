import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ModifyProfileRoutingModule} from './modify-profile-routing.module';
import {ModifyProfileComponent} from './component/modify-profile/modify-profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderOfficeModule} from '../../header/header-office/header-office.module';

@NgModule({
    declarations: [ModifyProfileComponent],
    imports: [
        CommonModule,
        ModifyProfileRoutingModule,
        FormsModule,
        HeaderOfficeModule,
        ReactiveFormsModule
    ]
})
export class ModifyProfileModule {
}
