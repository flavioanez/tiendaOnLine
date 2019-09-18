import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListConsolidatedOnlyRoutingModule } from './list-consolidated-only-routing.module';
import { ListConsolidatedOnlyComponent } from './component/list-consolidated-only/list-consolidated-only.component';
import {FormsModule} from '@angular/forms';
import {PipeInvoiceModule} from '../../pipe/pipe-invoice/pipe-invoice.module';

@NgModule({
  declarations: [ListConsolidatedOnlyComponent],
  imports: [
    CommonModule,
    ListConsolidatedOnlyRoutingModule,
      FormsModule,
      PipeInvoiceModule.forRoot()
  ],
    exports: [ListConsolidatedOnlyComponent]
})
export class ListConsolidatedOnlyModule { }
