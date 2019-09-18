import {Component, OnInit} from '@angular/core';
import {BackOfficeReportServices} from '../../../../services/backoffice.services';

declare var $;

@Component({
    selector: 'app-list-consolidated-only',
    templateUrl: './list-consolidated-only.component.html',
    styleUrls: ['./list-consolidated-only.component.css']
})
export class ListConsolidatedOnlyComponent implements OnInit {

    public message: string;
    public buscar;
    public quantitypurchase;
    public totalpurchase;
    public totalpoints;
    public purchases: any[] = [];

    constructor(private _purchaseServices: BackOfficeReportServices) {
    }

    ngOnInit() {
        this.plugin();
        this.storage();
        this.getTotalPurchases('paidOut');
    }

    getTotalPurchases(state) {

        this.quantitypurchase = 0;
        this.totalpurchase = 0;
        this.totalpoints = 0;
        this.purchases = [];
        this.message = '';

        this._purchaseServices.getAllListConsolidated(state).then((data: any) => {

            if (data.state) {
                this.quantitypurchase = data.list.length;
                for (const i of data.list) {
                    this.purchases.push({
                        idInvoice: i.identity.low,
                        date: i.properties.date,
                        totalPoints: i.properties.totalPoints,
                        totalPurchase: i.properties.totalPurchase
                    });
                    this.totalpurchase += i.properties.totalPurchase;
                    if (typeof i.properties.idClient !== 'undefined') {
                        this.totalpoints += i.properties.totalPoints;
                    }
                }
            } else {
                this.message = 'Aun no hay compras registradas el dia de hoy';
            }
        });
    }

    plugin() {
        $('.collapsible').collapsible();
    }

    storage() {
        localStorage.setItem('role', 'listConsolidated');
    }

}
