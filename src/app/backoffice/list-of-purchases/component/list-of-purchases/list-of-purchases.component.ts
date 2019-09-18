import {Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { InvoicesServices } from '../../../../services/invoices.services';
declare var $;

@Component({
    selector: 'app-list-of-purchases',
    templateUrl: './list-of-purchases.component.html',
    styleUrls: ['./list-of-purchases.component.css']
})
export class ListOfPurchasesComponent implements OnInit {

    @Input() idUsuario: number;
    public id;
    public purchases: any[] = [];
    public invoices = [];
    private date;
    billVoid = false;

    constructor(private rutaActiva: ActivatedRoute,
                private _invoiceServices: InvoicesServices) {}

    ngOnInit() {
        $('.collapsible').collapsible();
        localStorage.setItem('role', 'listOfPurchases');
        $('.tabs').tabs();
        $('.datepicker').datepicker({
            format: 'yyyy/m/dd'
        });
        this.getAllInvoices();
        const fecha = new Date();
        this.date = this.date = `${fecha.getFullYear()}/${fecha.getMonth() + 1}/${fecha.getDate() + 1 < 10 ? '0' + fecha.getDate() : fecha.getDate()}`;
    }

    getAllInvoices() {
        this.invoices = [];
        this._invoiceServices.getInvoicesIdMayorista(this.idUsuario)
            .then((data: any) => {
                if (data.state) {
                    for (const i of data.answer) {
                        this.invoices.push({
                            idInvoice: i.identity,
                            date: i.properties.date,
                            idMayorista: i.properties.idMayorista,
                            stateDetail: i.properties.stateDetail,
                            totalPoints: i.properties.totalPoints,
                            totalPurchase: i.properties.totalPurchase
                        });
                    }
                } else {
                    this.billVoid = true;
                }
            }, err => {
                console.log(err.answer);
            });
    }

    getAllInvoicesPyment() {
        this.invoices = [];
        this._invoiceServices.getInvoicesPaymentMayoristaId(this.idUsuario, this.date)
            .then((data: any) => {
                if (data.state) {
                    for (const i of data.answer) {
                        this.invoices.push({
                            idInvoice: i.identity,
                            date: i.properties.date,
                            idClient: i.properties.idClient,
                            stateDetail: i.properties.stateDetail,
                            totalPoints: i.properties.totalPoints,
                            totalPurchase: i.properties.totalPurchase
                        });
                    }
                }
            }, err => {
                console.log(err.answer);
            });
    }

    // eliminar la factura.
    deleteInvoiceId(id) {
        this.invoices = [];
        this._invoiceServices.deleteInvoiceId(id)
            .then((data: any) => {
                this.getAllInvoices();
            }, err => {
                console.log(err.answer);
            });
    }

    searchDate(date) {
        this.date = date.target.value;
        setTimeout(() => {
            this.getAllInvoicesPyment();
        }, 177);

    }

}

