import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {InvoicesServices} from '../../../../services/invoices.services';
import { exportElement } from '../../../../global/export-element';
declare var $;

@Component({
    selector: 'app-visibility-invoice',
    templateUrl: './visibility-invoice.component.html',
    styleUrls: ['./visibility-invoice.component.css']
})
export class VisibilityInvoiceComponent implements OnInit {

    public idInvoice;
    public user;
    public idUser;
    public product: any[] = [];
    public totalPayment = 0;
    public breakParagraphs = false;

    constructor(private ruta: ActivatedRoute, private _invoiceServices: InvoicesServices) {}

    public get keepTogether(): string {
        return this.breakParagraphs ? '' : 'p';
    }

    public onClick(element) {
        exportElement(element, {
            forcePageBreak: '.page-break'
        });
    }

    ngOnInit() {
        this.storage();
        this.getIdInvoice();
        this.getAllInvoiceId(this.idInvoice);
    }

    getIdInvoice(){
        this.ruta.params.subscribe((param:Params)=>{
            this.idInvoice = param.id;
        })
    }

    storage(){
        this.user = JSON.parse(localStorage.getItem('user')).usuario.properties;
        this.idUser = JSON.parse(localStorage.getItem('user')).usuario.identity.low;
    }

    getAllInvoiceId(id) {
        this.product = [];
        this._invoiceServices.getAllInvoicesId(id).then((data: any) => {
            for (let i = 0; i<data.answer.length; i++){
                this.product.push({
                    idClient: data.answer[i].segments[0].start.properties.idClient,
                    date: data.answer[i].segments[0].start.properties.date,
                    points: data.answer[i].segments[0].start.properties.points,
                    article: data.answer[i].segments[0].start.properties.title,
                    code: data.answer[i].segments[0].start.properties.refProduct,
                    units: data.answer[i].segments[0].start.properties.totalUnits,
                    valor: data.answer[i].segments[0].start.properties.value,
                    valorpunto: parseFloat(data.answer[i].segments[0].start.properties.valuePoint)
                });
                this.totalPayment = this.totalPayment + (data.answer[i].segments[0].start.properties.totalUnits * data.answer[i].segments[0].start.properties.value);
            }
        }, err => {
            console.log(err.answer);
        });
    }
}
