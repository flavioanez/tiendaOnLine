import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {InvoicesServices} from '../../../../services/invoices.services';

declare var $;

@Component({
    selector: 'app-invoices-invited',
    templateUrl: './invoices-invited.component.html',
    styleUrls: ['./invoices-invited.component.css']
})

export class InvoicesInvitedComponent implements OnInit {

    public idInvoice;
    public idInvited;
    public invited: any = {};
    public product: any[] = [];
    public totalPayment = 0;
    private place;
    public breakParagraphs = false;

    constructor(private _ruta: ActivatedRoute,
                private _router: Router,
                private _invoiceServices: InvoicesServices) {
    }

    ngOnInit() {
        this.storage();
        this.getParams();
        this.getAllInvoiceId(this.idInvoice);
    }

    getParams() {
        this._ruta.params.subscribe((param: Params) => {
            this.idInvoice = param.idInvoice;
            this.place = param.place;
        });
    }

    public get keepTogether(): string {
        return this.breakParagraphs ? '' : 'p';
    }

    getAllInvoiceId(id) {
        this._invoiceServices.getAllInvoicesInvitadId(id).then((data: any) => {
            this.invited = data.answer[0].segments[1].end.properties;
            this.idInvited = data.answer[0].segments[1].end.identity.low;
            for (let i = 0; i < data.answer.length; i++) {
                this.product.push({
                    idInvited: data.answer[i].segments[0].start.properties.idInvited,
                    date: data.answer[i].segments[0].start.properties.date,
                    article: data.answer[i].segments[0].start.properties.title,
                    code: data.answer[i].segments[0].start.properties.refProduct,
                    units: data.answer[i].segments[0].start.properties.totalUnits,
                    valor: data.answer[i].segments[0].start.properties.value,
                });
                this.totalPayment = this.totalPayment +
                    (data.answer[i].segments[0].start.properties.totalUnits * data.answer[i].segments[0].start.properties.value);
            }
        }, err => {
            console.log(err.answer);
        });
    }

    storage() {
        localStorage.setItem('role', 'visibilityInvoiceInvited');
    }

    back() {
        if (this.place === 'back-office') {
           return this._router.navigate(['backoffice']);
        }
        return this._router.navigate(['invited']);
    }
}
