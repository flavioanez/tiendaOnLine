import {Component, OnInit} from '@angular/core';
import {BackOfficeReportServices} from '../../../../services/backoffice.services';

@Component({
    selector: 'app-list-consolidated',
    templateUrl: './list-consolidated.component.html',
    styleUrls: ['./list-consolidated.component.css']
})
export class ListConsolidatedComponent implements OnInit {

    public buscar: string;
    public products: any[] = [];
    public breakParagraphs = false;

    constructor(private _backOffice: BackOfficeReportServices) {
    }

    ngOnInit() {
        this.consolidatedListProducts('paidOut');
    }

    public get keepTogether(): string {
        return this.breakParagraphs ? '' : 'p';
    }

    consolidatedListProducts(state) {
        this._backOffice.getProductsConsolidated(state).subscribe((data: any) => {
            if (data.state) {
                this.products = [];
                for (const i of data.list) {
                    this.products.push(i);
                }
            } else {
                console.log('lista consolidada vacia');
            }
        });
    }
}
