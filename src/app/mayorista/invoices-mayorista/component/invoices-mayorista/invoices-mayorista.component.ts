import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {InvoicesServices} from '../../../../services/invoices.services';
import {UserService} from '../../../../services/users.services';

declare var $;

@Component({
    selector: 'app-invoices-mayorista',
    templateUrl: './invoices-mayorista.component.html',
    styleUrls: ['./invoices-mayorista.component.css']
})

export class InvoicesMayoristaComponent implements OnInit {

    public idInvoice;
    public idMayorista;
    public mayorista: any = {};
    public product: any[] = [];
    public totalPayment = 0;
    public breakParagraphs = false;
    private place: string;

    constructor(private rutaActiva: ActivatedRoute,
                private _router: Router,
                private _userServices: UserService,
                private _invoiceServices: InvoicesServices) {
    }

    ngOnInit() {
        localStorage.setItem('role', 'visibilityInvoiceMayorista');
        this.getParams();
        this.getAllInvoiceId(this.idInvoice);
    }

    public get keepTogether(): string {
        return this.breakParagraphs ? '' : 'p';
    }

    getParams() {
        this.rutaActiva.params.subscribe((params: Params) => {
            this.idInvoice = params.idInvoice;
            this.place = params.place;
        });
    }

    getAllInvoiceId(id) {
        this._invoiceServices.getAllInvoicesMayoristaId(id).then((data: any) => {
            this.mayorista = data.answer[0].segments[1].end.properties;
            this.idMayorista = data.answer[0].segments[1].end.identity.low;
            for (let i = 0; i < data.answer.length; i++) {
                this.product.push({
                    idMayorista: data.answer[i].segments[0].start.properties.idMayorista,
                    date: data.answer[i].segments[0].start.properties.date,
                    article: data.answer[i].segments[0].start.properties.title,
                    code: data.answer[i].segments[0].start.properties.refProduct,
                    units: data.answer[i].segments[0].start.properties.totalUnits,
                    valor: data.answer[i].segments[0].start.properties.value,
                });
                this.totalPayment = this.totalPayment + (data.answer[i].segments[0].start.properties.totalUnits * data.answer[i].segments[0].start.properties.value);
            }
        }, err => {
            console.log(err.answer);
        });
    }

    back() {
        if (this.place === 'back-office') {
            return this._router.navigate(['backoffice']);
        }
        return this._router.navigate(['storeMayorista']);
    }
}
