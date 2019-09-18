import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchMayorista'
})

export class PipePipe implements PipeTransform {

    transform(items: any, term: any): any {
        if (term === undefined) {
            return items;
        }

        return items.filter(function (item) {
            return item.identificationcard.toString().includes(term);
        });

    }
}