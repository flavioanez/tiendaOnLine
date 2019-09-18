import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {InvoicesServices} from '../../../../services/invoices.services';
declare var $;

@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {


    private userId;
    public invoices = [];
    private date;
    billVoid = false;

    constructor(private router: Router, private _invoiceServices: InvoicesServices) {
    }

    ngOnInit() {
        localStorage.setItem('role', 'invoices');
        $('.tabs').tabs();
        $('.datepicker').datepicker({
            format: 'yyyy/m/dd'
        });
        this.userId = JSON.parse(localStorage.getItem('user')).usuario.identity.low;
        const fecha: Date = new Date();
        this.date = `${fecha.getFullYear()}/${fecha.getMonth() + 1}/${fecha.getDate() + 1 < 10 ? '0' + fecha.getDate() : fecha.getDate()}`;
        this.getAllInvoices();
    }

    getAllInvoices() {
        this._invoiceServices.getInvoicesId(this.userId)
            .then((data: any) => {
                this.invoices = [];
                if (data.state) {
                    for (const i of data.answer) {
                        this.invoices.push({
                            idInvoice: i.identity.low,
                            date: i.properties.date,
                            idClient: i.properties.idClient,
                            stateDetail: i.properties.stateDetail,
                            totalPoints: i.properties.totalPoints,
                            totalPurchase: i.properties.totalPurchase
                        });
                    }
                } else {
                    this.billVoid = true;
                    console.log(data.answer);
                }
            }, err => {
                console.log(err.answer);
            });
    }

    getAllInvoicesPyment() {
        this.invoices = [];
        this._invoiceServices.getInvoicesPaymentId(this.userId, this.date)
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
                } else {
                    this.invoices = [];
                }
            }, err => {
                console.log(err.answer);
            });
    }

    visibilityInvoice(id) {
        localStorage.setItem('invoiceId', JSON.stringify(id));
    }

    // eliminar la factura.
    deleteInvoiceId(id) {
        this._invoiceServices.deleteInvoiceId(id, false)
            .then((data: any) => {
                this.invoices = [];
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

    // pagar la factura.}
    paymentInvoice(id) {
        this.invoices = [];
        this._invoiceServices.payBillId(id, true).then((data: any) => {
            this.getAllInvoices();
        }, err => {
            console.log(err);
        });
    }

}

