import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../../../services/store.services';
import { ProductService } from '../../../../services/product.services';
declare var $;

@Component({
    selector: 'app-cart-businessman',
    templateUrl: './cart-businessman.component.html',
    styleUrls: ['./cart-businessman.component.css']
})
export class CartBusinessmanComponent implements OnInit {

    private idUser;

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


    constructor(private _productService: ProductService,
                private _storeService: StoreService) {
        this.interruptorsearch = 'off';
        this.buttons = true;
    }

    ngOnInit() {
        this.storage();
        this.plugin();
        this.getSearchProductos();
        this.getAllCart(this.idUser);
    }

    getAllCart(id) {

        this._storeService.getCart(id).subscribe((datacart) => {

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
            for (let i = 0; i < (data.products.length); i++) {
                this.listaprodAux.push(data.products[i].properties);
            }
        });
    }

    removeUnits(code: string) {

        if (this.unitSmall[code] > 1) {
            this.unitSmall[code]--;
            this.totalPurchase = 0;

            for (const i of this.cartContent) {
                if (i.refProduct === code) {
                    i.totalUnits--;
                    i.points = (i.totalUnits * i.valuePoint).toFixed(1);
                }
                this.totalPurchase = this.totalPurchase + (i.value * i.totalUnits);
            }
        }
    }

    addUnits(code: string) {
        this.unitSmall[code]++;
        this.totalPurchase = 0;

        for (const i of this.cartContent) {
            if (i.refProduct === code) {
                i.totalUnits++;
                i.points = (i.totalUnits * i.valuePoint).toFixed(1);
            }
            this.totalPurchase = this.totalPurchase + (i.value * i.totalUnits);
        }

    }

    deleteProduct(code: string) {

        this.cartContent = this.cartContent.filter((producto) => producto.refProduct !== code);
        this.cartContent.length > 0 ? this.buttons = false : this.buttons = true;
        this.totalUnits = this.cartContent.length;
        this.totalPurchase = 0;
        for (const i of this.cartContent) {
            this.totalPurchase = this.totalPurchase + i.totalUnits * i.value;
            if (i.points !== 0 && (i.refProduct === code)) {
                i.points = Number(((i.totalUnits * i.value) / 2850).toFixed(2));
            }
        }
        this._storeService.deleteProduct(code, this.idUser).then(data => {
        }, err => {
            console.log(err);
        });

    }

    performPurchase() {
        this.message = '';
        this.buttons = true;
        this._storeService.updateCart(this.cartContent, this.idUser);
        this._storeService.performPurchase(this.cartContent, this.idUser)
            .then((data: any) => {
                if (data.state) {
                    this.cartContent = [];
                    this.totalUnits = 0;
                    this.totalPurchase = 0;
                    this.message = data.answer;
                    // this.getAllInvoices();
                    // plugin jquery.
                    $('#img-invoice').show('slow');
                    setTimeout(() => {
                        this.message = '';
                    }, 4000);
                } else {
                    this.message = data.answer;
                    setTimeout(() => {
                        this.message = '';
                        this.buttons = false;
                    }, 4000);
                }
            }, err => {
                this.message = err.answer;
            });
    }

    canceledPurchase() {
        this.cartContent = [];
        this.buttons = true;
        this.totalUnits = 0;
        this.totalPurchase = 0;
        this._productService.deleteCart(this.idUser)
            .subscribe(data => {
                // console.log(data.message);
            }, err => {
                console.log(err.message);
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
        this.idUser = parseInt(JSON.parse(localStorage.getItem('user')).usuario.identity.low);
        localStorage.setItem('role', 'cartBusinessman');
    }

    plugin() {
        $('.sidenav').sidenav();
    }

}
