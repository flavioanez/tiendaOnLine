import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddBusinessmanRoutingModule} from './add-businessman-routing.module';
import {AddBusinessmanComponent} from './component/add-businessman/add-businessman.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderOfficeModule} from '../../header/header-office/header-office.module';

@NgModule({
    declarations: [AddBusinessmanComponent],
    imports: [
        CommonModule,
        AddBusinessmanRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HeaderOfficeModule
    ]
})
export class AddBusinessmanModule {
}
