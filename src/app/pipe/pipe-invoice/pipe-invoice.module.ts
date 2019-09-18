import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeInvoicePipe } from './pipe-invoice.pipe';

@NgModule({
  declarations: [PipeInvoicePipe],
    exports: [PipeInvoicePipe],
  imports: [
    CommonModule
  ]
})
export class PipeInvoiceModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PipeInvoiceModule
        };
    }

}
