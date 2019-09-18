import {Component, OnInit} from '@angular/core';
import {BackOfficeReportServices} from '../../../../services/backoffice.services';
import {ActivatedRoute, Params} from '@angular/router';
import {InvoicesServices} from '../../../../services/invoices.services';
declare var $;

@Component({
    selector: 'app-detail-list-consolidate-only',
    templateUrl: './detail-list-consolidate-only.component.html',
    styleUrls: ['./detail-list-consolidate-only.component.css']
})
export class DetailListConsolidateOnlyComponent implements OnInit {

    public message: string;
    public buscar;
    public totalpurchase;
    public totalpoints;
    public products: any[] = [];
    public idInvoice;
    public user: any = {};
    public idUser;
    public breakParagraphs = false;

    constructor(private _purchaseServices: BackOfficeReportServices,
                private _invoiceServices: InvoicesServices,
                private _ruta: ActivatedRoute) {
    }

    ngOnInit() {
        this.storage();
        this.plugin();
        this.getIdInvoiceParams();
        this.getInvoices(this.idInvoice);
    }

    public get keepTogether(): string {
        return this.breakParagraphs ? '' : 'p';
    }

    getIdInvoiceParams() {
        this._ruta.params.subscribe((params: Params) => {
            this.idInvoice = params.id;
        });
    }

    getInvoices(id) {
        this._invoiceServices.getAllInvoicesId(id).then((data: any) => {
            this.user = data.answer[0].segments[1].end.properties.password = '';
            this.user = data.answer[0].segments[1].end.properties.passAlt = '';
            this.user = data.answer[0].segments[1].end.properties;

            for (let i = 0; i < data.answer.length; i++) {

                if (typeof data.answer[i].segments[0].start.properties.idClient != 'undefined') {
                    this.idUser = data.answer[i].segments[0].start.properties.idClient;
                }
                else if (typeof data.answer[i].segments[0].start.properties.idInvited != 'undefined') {
                    this.idUser = data.answer[i].segments[0].start.properties.idInvited;
                }
                else {
                    this.idUser = data.answer[i].segments[0].start.properties.idMayorista;
                }
                this.products.push({
                    idProduct: data.answer[i].segments[0].start.identity.low,
                    date: data.answer[i].segments[0].start.properties.date,
                    points: data.answer[i].segments[0].start.properties.points,
                    code: data.answer[i].segments[0].start.properties.refProduct,
                    state: data.answer[i].segments[0].start.properties.state,
                    title: data.answer[i].segments[0].start.properties.title,
                    units: data.answer[i].segments[0].start.properties.totalUnits,
                    value: data.answer[i].segments[0].start.properties.value,
                    valuePoints: data.answer[i].segments[0].start.properties.valuePoints
                });
            }
        }, err => {
            console.log(err);
        });
    }

    plugin() {
        $('.collapsible').collapsible();
    }

    storage() {
        localStorage.setItem('role', 'listConsolidated');
    }

}