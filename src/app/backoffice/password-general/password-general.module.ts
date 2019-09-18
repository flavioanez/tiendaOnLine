import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PasswordGeneralRoutingModule} from './password-general-routing.module';
import {PasswordGeneralComponent} from './component/password-general/password-general.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [PasswordGeneralComponent],
    exports: [PasswordGeneralComponent],
    imports: [
        CommonModule,
        PasswordGeneralRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class PasswordGeneralModule {
}
