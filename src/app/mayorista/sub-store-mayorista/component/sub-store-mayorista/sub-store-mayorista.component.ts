import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { StoreMayoristaService } from '../../../../services/storeMayorista.services';
import { ProductService } from '../../../../services/product.services';
import { InvoicesServices } from '../../../../services/invoices.services';
declare var $;

@Component({
    selector: 'app-sub-store-mayorista',
    templateUrl: './sub-store-mayorista.component.html',
    styleUrls: ['./sub-store-mayorista.component.css']
})

export class SubStoreMayoristaComponent implements OnInit {

    title = 'store';
    products: any[] = [];
    unitSmall = [];
    cart = new Map<number, any>();
    cartContent = [];
    tope = 4;
    quantity = new Array();
    totalUnits = 0;
    totalPurchase: number;
    totalPoints: any;
    listSubCategories = [];
    public buscador:string;
    public listaprodAux: any[] = [];
    public message:string;
    scrollsubcategory:boolean;
    idSubcategory;
    public buttons = true;
    public pngInvoices = false;
    private idCategory;
    public invoices = [];
    public totalInvoice = 0;
    private idUser;
    public interruptorStore = 'off';
    public interruptor = 'off';
    public interruptorsearch = 'off';

    constructor(private router: Router,
                private _ruta: ActivatedRoute,
                private _storeService: StoreMayoristaService,
                private _productoServices: ProductService,
                private _invoiceServices: InvoicesServices) {
        this.scrollsubcategory = false;
    }

    ngOnInit() {
        this.getParam();
        this.plugin();
        this.storage();
        this.loadSubCategory(this.idCategory);
        this.getAllInvoices();
        this.getProductos(this.idCategory);
        this.getSearchProductos();
        this.getAllCart(this.idUser);
    }

    onScroll() {
        if (this.scrollsubcategory === true) {
            this.getProductsSubcategory(this.idSubcategory);
        } else {
            this.getProductos(this.idCategory);
        }
    }

    getParam(){
        this._ruta.params.subscribe((param: Params)=>{
            this.idCategory = param.idCategory;
        });
    }

    getProductos(id) {
        this._storeService.getProductIdCategory(id).subscribe((data) => {
            this.products = [];
            if(data.state) {
                for (let i = 0; i < (data.products.length > this.tope ? this.tope : data.products.length); i++) {
                    this.products.push(data.products[i]);
                    this.quantity[data.products[i].properties.code] = 1;
                }
                // console.log(this.products);
                this.tope += 4;
            }
        });
    }

    // Traer los productos de la categoria seleccionada.
    getProductsSubcategory(id) {
        this._storeService.getProductIdSubCategory(id).subscribe((data) => {
            this.products = [];
            if(data.state) {
                for (let i = 0; i < (data.products.length > this.tope ? this.tope : data.products.length); i++) {
                    this.products.push(data.products[i]);
                    this.quantity[data.products[i].properties.code] = 1;
                }
                // console.log(this.products);
                this.tope += 4;
            }
        });
    }

    loadSubCategory(id) {
        this._storeService.getSubCategories(id).subscribe(
            data => {
                this.listSubCategories = [];
                for (const i of data.answer) {
                    this.listSubCategories.push(i);
                }

            }, err => {
                console.log(err);
            });
    }

    removeQuantity(code: string) {
        if (this.quantity[code] > 1) {
            this.quantity[code]--;
        }
    }

    addQuantity(code: string) {
        this.quantity[code]++;
    }

    addCart(code: string) {
        this._storeService.addProductMayorista(code, this.quantity[code], true).then(
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
                // console.log(this.cartContent);
                this.totalUnits = this.cartContent.length;
            }
        }, errcart => {

        });

    }

// Traer todas las facturas pendientes.
    getAllInvoices() {
        this._invoiceServices.getInvoicesIdMayorista(this.idUser)
            .then((data: any) => {
                this.invoices = [];
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
        const idUser = this.idUser;
        this._storeService.deleteProductMayorista(code, idUser).then(data => {
            console.log(data);
        }, err => {
            console.log(err);
        });

    }

    sideMenuCategory(id:number){
        this.idSubcategory = id;
        this.scrollsubcategory = true;
        this.loadSubCategory(this.idCategory);
        this.getProductsSubcategory(this.idSubcategory);
        this.getAllInvoices();
        this.getAllCart(this.idUser);
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

    seeCategory(even: any) {
        this.idSubcategory = even.target.value;
        this.scrollsubcategory = true;
        this.loadSubCategory(this.idCategory);
        this.getProductsSubcategory(this.idSubcategory);
        this.getAllInvoices();
        this.getAllCart(this.idUser);
    }

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

    canceledPurchase() {
        this.cartContent = [];
        this.buttons = true;
        this.totalUnits = 0;
        this.totalPurchase = 0;
        this.totalPoints = 0;
        this._productoServices.deleteCartMayorista(this.idUser)
            .subscribe(data => {
                console.log(data.message);
            }, err => {
                console.log(err.message);
            });
    }

    performPurchase() {
        this.message = '';
        this.buttons = true;
        this.invoices = [];
        this._storeService.updateCart(this.cartContent, this.idUser);
        this._storeService.performPurchase(this.cartContent, this.idUser)
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

    storage(){
        this.idUser = parseInt(JSON.parse(localStorage.getItem('idMayorista')).identity.low);
    }

    plugin(){
        $('.slider').slider({indicators: false, height: '463'});
        $('.sidenav').sidenav();
        $('.collapsible').collapsible();
        $('#img-invoice').hide();
    }

// ver factura.
    visibilityInvoice(id) {
        localStorage.setItem('invoiceIdMayorista', JSON.stringify(id));
    }

    // metodos para el response.
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
