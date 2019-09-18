import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchProduct'
})

export class PipeProductPipe implements PipeTransform {

    transform(items: any, term: any): any {
        if (term === undefined) {
            return items;
        }

        return items.filter(function (item) {
            return item.title.toLowerCase().includes(term.toLowerCase());
        });

    }
}