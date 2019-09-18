import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StoreMayoristaComponent} from './component/store-mayorista/store-mayorista.component';

const routes: Routes = [
    { path: '', component: StoreMayoristaComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StoreMayoristaRoutingModule { }
