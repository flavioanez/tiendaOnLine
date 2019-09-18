import { NgModule, ModuleWithProviders } from '@angular/core';

import { PipeProductPipe } from './pipe-product.pipe';
import {ProductService} from '../../services/product.services';

@NgModule({
  declarations: [PipeProductPipe],
    exports: [PipeProductPipe]
})
export class PipeProductModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PipeProductModule
        };
    }

}
