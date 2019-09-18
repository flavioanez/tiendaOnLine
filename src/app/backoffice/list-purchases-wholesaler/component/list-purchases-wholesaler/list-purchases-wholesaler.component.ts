import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StoreService} from '../../../../services/store.services';
import {StoreMayoristaService} from '../../../../services/storeMayorista.services';
import {ProductService} from '../../../../services/product.services';
declare var $;

@Component({
    selector: 'app-list-purchases-wholesaler',
    templateUrl: './list-purchases-wholesaler.component.html',
    styleUrls: ['./list-purchases-wholesaler.component.css']
})
export class ListPurchasesWholesalerComponent implements OnInit {

    @Input() idMayorista: number;

    public buscar;
    public purchases: any[] = [];
    public products: any[] = [];
    public totalUnits = 0;
    public totalPurchase: number;
    public totalPoints: any;
    public quantity = [];
    public cartContent: any[] = [];
    public unitSmall: any[] = [];
    public buttons;
    public interruptor = 'off';
    public message;

    constructor(private _storeService: StoreService,
                private _mayoristaServices: StoreMayoristaService,
                private _productoServices: ProductService,
                private rutaActiva: ActivatedRoute) {
    }

    ngOnInit() {
        console.log('id mayorista:', this.idMayorista);
        localStorage.setItem('role', 'listPurchaseMayorista');
        $('.collapsible').collapsible();
        this.getProductos();
        this.getAllCart(this.idMayorista);
    }

    getProductos() {
        this.products = [];
        this._storeService.getProduct().subscribe((data) => {
            this.products = [];
            for (let i = 0; i < data.products.length; i++) {
                this.products.push(data.products[i].properties);
                this.quantity[data.products[i].properties.code] = 1;
            }
        });
    }

    removeQuantity(code: string) {
        if (this.quantity[code] > 1) {
            this.quantity[code]--;
        }
    }

// 3017813145
    addQuantity(code: string) {
        this.quantity[code]++;
    }

    addUnits(code: string) {

        this.unitSmall[code]++;
        this.totalPurchase = 0;
        this.totalPoints = 0;

        for (const i of this.cartContent) {
            if (i.refProduct === code) {
                i.totalUnits++;
                i.points = (i.totalUnits * i.valuePoint).toFixed(1);
            }
            this.totalPurchase = this.totalPurchase + (i.value * i.totalUnits);
            if (i.valuePoint !== 0) {
                this.totalPoints = this.totalPoints + (i.totalUnits * i.valuePoint);
            }
        }

    }

    removeUnits(code: string) {

        if (this.unitSmall[code] > 1) {
            this.unitSmall[code]--;
            this.totalPurchase = 0;
            this.totalPoints = 0;

            for (const i of this.cartContent) {
                if (i.refProduct === code) {
                    i.totalUnits--;
                    i.points = (i.totalUnits * i.valuePoint).toFixed(1);
                }
                this.totalPurchase = this.totalPurchase + (i.value * i.totalUnits);
                if (i.valuePoint !== 0) {
                    this.totalPoints = this.totalPoints + (i.totalUnits * i.valuePoint);
                }
            }
        }
    }

    addCart(code: string) {
        this._mayoristaServices.addProductMayorista(code, this.quantity[code], false, this.idMayorista).then(
            data => {
                console.log(data);
                if (data) {
                    this.getAllCart(this.idMayorista);
                    // console.log(data);
                }
                // console.log(data);
            },
            err => {
                console.log(err);
            });
    }

    getAllCart(id) {
        this._mayoristaServices.getCart(id).subscribe((datacart) => {

            if (datacart.state) {
                this.totalPurchase = 0;
                this.cartContent = [];

                for (const i of datacart.cart) {
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
                    this.quantity[i.properties.refProduct] = i.properties.totalUnits;
                    this.totalPurchase = Number((this.totalPurchase + i.properties.totalUnits * i.properties.value).toFixed());
                }

                this.totalUnits = this.cartContent.length;
            }
        }, err => {

        });

    }

    deleteProduct(code: string) {

        this.cartContent = this.cartContent.filter((producto) => producto.refProduct !== code);
        this.cartContent.length > 0 ? this.buttons = false : this.buttons = true;
        this.totalUnits = this.cartContent.length;
        this.totalPurchase = 0;
        this.totalPoints = 0;
        for (const i of this.cartContent) {
            this.totalPurchase = this.totalPurchase + i.totalUnits * i.value;
            if (i.points !== 0 && (i.refProduct === code)) {
                i.points = Number(((i.totalUnits * i.value) / 2850).toFixed(2));
            }
            this.totalPoints = this.totalPoints + i.points;
        }

        this._mayoristaServices.deleteProductMayorista(code, this.idMayorista).then(data => {
            console.log(data);
        }, err => {
            console.log(err);
        });

    }

    canceledPurchase() {
        this.cartContent = [];
        this.buttons = true;
        this.totalUnits = 0;
        this.totalPurchase = 0;
        this.totalPoints = 0;
        this._productoServices.deleteCartMayorista(this.idMayorista)
            .subscribe(data => {
                this.getProductos();
            }, err => {
                console.log(err.message);
            });
    }

    performPurchase() {
        this.message = '';
        this.buttons = true;
        this._mayoristaServices.updateCart(this.cartContent, this.idMayorista);
        this._mayoristaServices.performPurchase(this.cartContent, this.idMayorista)
            .then((data: any) => {
                if (data.state) {
                    this.cartContent = [];
                    this.totalUnits = 0;
                    this.totalPurchase = 0;
                    this.totalPoints = 0;
                    this.message = data.answer;
                    this.getProductos();
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

    // abrir el carro.
    openCart() {
        const cartMenu = '#cart-body';
        switch (this.interruptor) {
            case 'off':
                this.mostrarMenu(cartMenu);
                break;
            case 'on':
                this.esconderMenu(cartMenu);
                break;
            default:
            // console.log('Interruptor incorrecto');
        }
    }

    mostrarMenu(menu) {
        $(menu).removeClass('bounceOutRight');
        $(menu).addClass('animated bounceInRight');
        $(menu).css('display', 'block');
        this.interruptor = 'on';
    }

    esconderMenu(menu) {
        $(menu).removeClass('bounceInRight');
        $(menu).addClass('animated bounceOutRight');
        this.interruptor = 'off';
    }
}
