import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StoreService} from '../../../services/store.services';
import {StoreInvitedService} from '../../../services/storeInvited.services';
import {InvoicesServices} from '../../../services/invoices.services';
import {ProductService} from '../../../services/product.services';

declare var $;

@Component({
    selector: 'app-store-invited',
    templateUrl: './store-invited.component.html',
    styleUrls: ['./store-invited.component.css']
})

export class StoreInvitedComponent implements OnInit {

    public listcategories = [];
    public products: any[] = [];
    public quantity = new Array();
    public totalUnits;
    public totalPurchase: number;
    public totalPoints: any;
    public cartContent = [];
    public unitSmall = [];
    public buttons;
    public buscador;
    public message;
    public invoices = [];
    public totalInvoice;
    public listaprodAux: any[] = [];
    public interruptorStore = 'off';
    public interruptor = 'off';
    public interruptorsearch = 'off';
    public pngInvoices: boolean;
    private idUser;
    private productosCategorizados = new Map();
    private tope;
    private cart = new Map<number, any>();

    constructor(private router: Router,
                private _invitedService: StoreInvitedService,
                private _invoiceServices: InvoicesServices,
                private _productService: ProductService,
                private _storeService: StoreService) {
        this.totalUnits = 0;
        this.totalInvoice = 0;
        this.pngInvoices = false;
        this.tope = 4;
        this.buttons = true;
    }

    ngOnInit() {
        this.storage();
        this.plugin();
        this.loadCategory();
        this.getAllCart(this.idUser);
        this.getAllInvoices();
        this.getProductos();
        this.getSearchProductos();
    }

    onScroll() {
    }

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// open services:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // loading categories
    loadCategory() {
        this._storeService.getCategories().subscribe(
            data => {
                for (const i of data.categories) {
                    this.listcategories.push(i);
                    if (i.properties.pcomision === 'C') {
                        this.productosCategorizados.set(i.identity.low, i.properties.pcomision);
                    }
                }
            }, err => {
                console.log(err);
            });
    }

    getProductos() {
        this._storeService.getProduct().subscribe((data) => {
            this.products = [];
            for (let i = 0; i < (data.products.length > this.tope ? this.tope : data.products.length); i++) {
                this.products.push(data.products[i]);
                this.quantity[data.products[i].properties.code] = 1;
            }
            // console.log(this.products);
            this.tope += 4;
        });
    }

    addCart(code: string) {
        this._invitedService.addProductInvited(code, this.quantity[code]).then(
            data => {
                if (data) {
                    this.getAllCart(this.idUser);
                    // console.log(data);
                }
                // console.log(data);
            },
            err => {
                console.log(err);
            });
    }

    getAllCart(id) {

        this._invitedService.getCart(id).subscribe((datacart) => {

            if (datacart.state) {
                this.totalPurchase = 0;
                this.totalPoints = 0;
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
                    this.totalPoints = this.totalPoints + i.properties.points;
                }
                this.totalUnits = this.cartContent.length;
            }
        }, err => {

        });
    }

    // loading search.
    // cargar los productos de la barra en un array auxiliar.
    getSearchProductos() {
        this._storeService.getProduct().subscribe((data) => {
            this.listaprodAux = [];
            for (let i = 0; i < (data.products.length); i++) {
                this.listaprodAux.push(data.products[i].properties);
                this.quantity[data.products[i].properties.code] = 1;
            }
        });
    }

    performPurchase() {
        this.message = '';
        this.buttons = true;
        this.invoices = [];
        this._invitedService.updateCart(this.cartContent, this.idUser);
        this._invitedService.performPurchase(this.cartContent, this.idUser)
            .then((data: any) => {
                if (data.state) {
                    this.cartContent = [];
                    this.totalUnits = 0;
                    this.totalPurchase = 0;
                    this.totalPoints = 0;
                    this.message = data.answer;
                    this.getAllInvoices();
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

    // Traer todas las facturas pendientes.
    getAllInvoices() {
        this._invoiceServices.getInvoicesIdInvited(this.idUser)
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
        this._invitedService.deleteProductInvited(code, this.idUser).then(data => {
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
        this._productService.deleteCartInvited(this.idUser)
            .subscribe(data => {
                // console.log(data.message);
            }, err => {
                console.log(err.message);
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

    // pagar la factura.}
    paymentInvoice(id) {
        this.invoices = [];
        this._invoiceServices.payBillId(id, false).then((data: any) => {
            this.getAllInvoices();
        }, err => {
            console.log(err);
        });
    }

// closet services:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // route for store.
    seeCategory(even: any) {
        const idCategory = even.target.value;
        this.router.navigate(['/substoreinvited/', idCategory]);
    }

    removeQuantity(code: string) {
        if (this.quantity[code] > 1) {
            this.quantity[code]--;
        }
    }

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

    sideMenuCategory(id: number) {
        this.router.navigate(['/substoreinvited/', id]);
    }

// abrir el carro.
    openCart() {
        const cartMenu = '#cart-body';
        const searchtMenu = '#searchPro';
        const menuInvoice = '#view-invoices';

        switch (this.interruptor) {
            case 'off':
                this.mostrarMenu(cartMenu);
                this.esconderMenuSearch(searchtMenu);
                this.ocultarMenuInvoice(menuInvoice);
                break;
            case 'on':
                this.esconderMenu(cartMenu);
                break;
            default:
            // console.log('Interruptor incorrecto');
        }
    }

// abrir el buscador.
    openSearch() {
        const searchtMenu = '#searchPro';
        const cartMenu = '#cart-body';
        const menuInvoice = '#view-invoices';
        switch (this.interruptorsearch) {
            case 'off':
                this.mostrarMenuSearch(searchtMenu);
                this.esconderMenu(cartMenu);
                this.ocultarMenuInvoice(menuInvoice);
                break;
            case 'on':
                this.esconderMenuSearch(searchtMenu);
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

    mostrarMenuSearch(menu) {
        $(menu).removeClass('bounceOutRight');
        $(menu).addClass('animated bounceInRight');
        $(menu).css('display', 'block');
        this.interruptorsearch = 'on';
    }

    esconderMenu(menu) {
        $(menu).removeClass('bounceInRight');
        $(menu).addClass('animated bounceOutRight');
        this.interruptor = 'off';
    }

    esconderMenuSearch(menu) {
        $(menu).removeClass('bounceInRight');
        $(menu).addClass('animated bounceOutRight');
        this.interruptorsearch = 'off';
    }

// ver las facturas pendientes.
    openInvoice() {
        const menuInvoice = '#view-invoices';
        const searchtMenu = '#searchPro';
        const cartMenu = '#cart-body';

        switch (this.interruptorStore) {
            case 'off':
                this.mostrarMenuInvoice(menuInvoice);
                this.esconderMenu(cartMenu);
                this.esconderMenuSearch(searchtMenu);
                break;
            case 'on':
                this.ocultarMenuInvoice(menuInvoice);
                break;
            default:
            // console.log('Interruptor incorrecto');
        }
    }

// ocultar el menu de la facturas.
    ocultarMenuInvoice(menu) {
        $(menu).removeClass('bounceInRight');
        $(menu).addClass('animated bounceOutRight');
        this.interruptorStore = 'off';
    }

// mostrar el menu de las facturas.
    mostrarMenuInvoice(menu) {
        $(menu).removeClass('bounceOutRight');
        $(menu).addClass('animated bounceInRight');
        $(menu).css('display', 'block');
        this.interruptorStore = 'on';
    }

    storage() {
        this.idUser = parseInt(localStorage.getItem('idInvited'));
        localStorage.setItem('role', 'invited');
    }

    plugin() {
        $('.slider').slider({indicators: false, height: '463'});
        $('.sidenav').sidenav();
        $('.collapsible').collapsible();
        $('#img-invoice').hide();
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


}
