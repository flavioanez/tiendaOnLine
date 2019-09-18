import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NetworkRoutingModule} from './network-routing.module';
import {NetworkComponent} from './component/network/network.component';
import {HeaderOfficeModule} from '../../header/header-office/header-office.module';

@NgModule({
    declarations: [NetworkComponent],
    imports: [
        CommonModule,
        NetworkRoutingModule,
        HeaderOfficeModule
    ]
})
export class NetworkModule {
}
