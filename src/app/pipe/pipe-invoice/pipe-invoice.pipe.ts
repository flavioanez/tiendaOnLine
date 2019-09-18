import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeInvoice'
})
export class PipeInvoicePipe implements PipeTransform {

    transform(items: any, term: any): any {
        if (term === undefined) {
            return items;
        }

        return items.filter(function (item) {
            return item.idInvoice.toString().includes(term);
        });

    }

}
