import { Component, OnInit } from '@angular/core';
import {InvoicesServices} from '../../../../services/invoices.services';
import {StoreInvitedService} from '../../../../services/storeInvited.services';
import {StoreService} from '../../../../services/store.services';
import {StoreMayoristaService} from '../../../../services/storeMayorista.services';
declare var $;

@Component({
    selector: 'app-invoices-store-wholesaler',
    templateUrl: './invoices-store-wholesaler.component.html',
    styleUrls: ['./invoices-store-wholesaler.component.css']
})
export class InvoicesFromTheStoreWholesalerComponent implements OnInit {

    public invoices = [];
    public pngInvoices: boolean;
    public totalInvoice;
    public totalPurchase;
    public cartContent: any[] = [];
    private cart = new Map<number, any>();
    public listaprodAux: any[] = [];
    public unitSmall: any[] = [];
    public buttons;
    public totalUnits;
    public interruptorsearch;
    public buscador;
    public message;

    private idUser;

    constructor(private _storeServiceMayoristas: StoreMayoristaService,
                private _invoiceServices: InvoicesServices,
                private _invitedService: StoreInvitedService,
                private _storeService: StoreService) {
        this.interruptorsearch = 'off';
        this.pngInvoices = false;
    }

    ngOnInit() {
        this.storage();
        this.plugin();
        this.getSearchProductos();
        this.getAllCart(this.idUser);
        this.getAllInvoices();
    }

    // Traer todas las facturas pendientes.
    getAllInvoices() {
        this._invoiceServices.getInvoicesIdMayorista(this.idUser)
            .then((data: any) => {
                if (data.state) {
                    for (const i of data.answer) {
                        this.invoices.push({
                            idInvoice: i.identity,
                            date: i.properties.date,
                            idClient: i.propertiesidClient,
                            stateDetail: i.properties.stateDetail,
                            totalPoints: i.properties.totalPoints,
                            totalPurchase: i.properties.totalPurchase
                        });
                        this.pngInvoices = false;
                        this.totalInvoice = this.invoices.length;
                    }
                } else {
                    this.pngInvoices = true;
                    this.totalInvoice = 0;

                }
            }, err => {

            });
    }

    getAllCart(id) {

        this._storeServiceMayoristas.getCart(id).subscribe((datacart) => {

            if (datacart.state) {
                this.totalPurchase = 0;
                this.cartContent = [];
                // console.log(datacart.cart[0].properties);
                for (const i of datacart.cart) {
                    this.cart.set(i.identity.low, i.properties);
                    this.cartContent.push({
                        idProduct: i.identity.low,
                        date: i.properties.date,
                        idClient: i.properties.idClient,
                        idInvited: i.properties.idInvited,
                        points: i.properties.points,
                        refProduct: i.properties.refProduct,
                        state: i.properties.state,
                        title: i.properties.title,
                        totalUnits: i.properties.totalUnits,
                        value: i.properties.value,
                        valuePoint: i.properties.valuePoint
                    });
                    this.cartContent.length > 0 ? this.buttons = false : this.buttons = true;
                    this.unitSmall[i.properties.refProduct] = i.properties.totalUnits;
                    this.totalPurchase = Number((this.totalPurchase + i.properties.totalUnits * i.properties.value).toFixed());
                }
                this.totalUnits = this.cartContent.length;
            }
        }, err => {

        });
    }

    // cargar los productos de la barra en un array auxiliar.
    getSearchProductos() {
        this._storeService.getProduct().subscribe((data) => {
            this.listaprodAux = [];
            console.log(data);
            for (let i = 0; i < (data.products.length); i++) {
                this.listaprodAux.push(data.products[i].properties);
            }
        });
    }

    // pagar la factura.}
    paymentInvoice(id) {
        this.invoices = [];
        this._invoiceServices.payBillId(id, false).then((data: any) => {
            this.getAllInvoices();
        }, err => {
            console.log(err);
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

    // metodos para el response.
    // abrir el buscador.
    openSearchMovil() {
        const searchtMenu = '#searchProMovil';
        switch (this.interruptorsearch) {
            case 'off':
                this.mostrarMenuSearch(searchtMenu);
                break;
            case 'on':
                this.esconderMenuSearch(searchtMenu);
                break;
            default:
            // console.log('Interruptor incorrecto');
        }
    }

    mostrarMenuSearch(menu) {
        $(menu).removeClass('bounceOutRight');
        $(menu).addClass('animated bounceInRight');
        $(menu).css('display', 'block');
        this.interruptorsearch = 'on';
    }

    esconderMenuSearch(menu) {
        $(menu).removeClass('bounceInRight');
        $(menu).addClass('animated bounceOutRight');
        this.interruptorsearch = 'off';
    }

    storage() {
        this.idUser = Number(JSON.parse(localStorage.getItem('idMayorista')).identity.low);
        localStorage.setItem('role', 'InvoicesFromTheStoreWholesaler');
    }

    plugin() {
        $('.sidenav').sidenav();
        $('#img-invoice').hide();
    }
}
