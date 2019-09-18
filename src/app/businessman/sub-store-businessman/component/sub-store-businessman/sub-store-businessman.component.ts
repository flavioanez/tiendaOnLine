import {Component, OnInit} from '@angular/core';
import {StoreService} from '../../../../services/store.services';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ProductService} from '../../../../services/product.services';
import {InvoicesServices} from '../../../../services/invoices.services';

declare var $;

@Component({
    selector: 'app-sub-store-businessman',
    templateUrl: './sub-store-businessman.component.html',
    styleUrls: ['./sub-store-businessman.component.css']
})
export class SubStoreBusinessmanComponent implements OnInit {

    public products: any[] = [];
    public productsAux: any[] = [];
    public storiesInvoices: any[] = [];
    public unitSmall = [];
    public cart = new Map<number, any>();
    public cartContent = [];
    public quantity = new Array();
    public totalUnits = 0;
    public totalPurchase: number;
    public totalPoints: any;
    public searchInvoice: string;
    public listSubCategories = [];
    public listSubCategoriesDropdown = [];
    public buscador;
    public listaprodAux: any[] = [];
    public listcategories: any[] = [];
    public message;
    public buttons = true;
    public pngInvoices = false;
    public invoices = [];
    public totalInvoice = 0;
    public subcategory: boolean;
    public nameCategory: string;
    public user: any;
    public triangulo: boolean;
    public stories: boolean;
    public store: boolean;
    public setCart: boolean;
    public setSearch: boolean;
    public setInvoice: boolean;

    private tope = 4;
    private idSubcategory;
    private idUser;
    private idCategory;
    private storageIdCategory;
    private interruptor = 'off';
    private interruptorsearch = 'off';
    public interruptorInvoice = 'off';

    constructor(private _storeService: StoreService,
                private _productoServices: ProductService,
                private _invoiceServices: InvoicesServices,
                private _ruta: ActivatedRoute,
                private router: Router) {
        this.subcategory = false;
        this.triangulo = true;
        this.store = true;
        this.stories = false;
        this.setCart = false;
        this.setSearch = false;
        this.setInvoice = false;
        this.totalPurchase = 0;
        this.totalPoints = 0;
    }

    ngOnInit() {
        this.getParams();
        this.loadCategory();
        this.storage();
        this.plugin();
        this.loadSubCategory(this.idCategory, true);
        this.getAllInvoices();
        this.getProductos(this.idCategory);
        this.getSearchProductos();
        this.getAllCart(this.idUser);
        this.getStoriesInvoices(this.idUser);
    }

    getParams() {
        this._ruta.params.subscribe((params: Params) => {
            this.idCategory = params.idCategory;
        });
    }

    onScroll() {
        if (this.subcategory === true) {
            this.getProductsSubcategory(this.idSubcategory);
        } else {
            this.getProductos(this.idCategory);
        }
    }

    loadCategory() {
        this._storeService.getCategories().subscribe(
            data => {
                for (const i of data.categories) {
                    this.listcategories.push(i);
                    if (i.identity.low == this.idCategory) {
                        this.nameCategory = i.properties.categoria;
                    }
                }
            }, err => {
                console.log(err);
            });
    }

    getProductos(id) {
        this._storeService.getProductIdCategory(id).subscribe((data) => {
            if (data.state) {
                this.products = [];
                this.productsAux = [];
                for (let i = 0; i < (data.products.length > this.tope ? this.tope : data.products.length); i++) {
                    this.products.push(data.products[i]);
                    this.productsAux.push(data.products[i]);
                    this.quantity[data.products[i].properties.code] = 1;
                }
                // console.log(this.products);
                this.tope += 4;
            }
        });
    }

    getStoriesInvoices(id) {
        this._invoiceServices.getInvoicesPaymentStoriesId(id).then((data: any) => {
            this.storiesInvoices = [];
            for (const i of data.answer) {
                this.storiesInvoices.push({idInvoice: i.identity.low, properties: i.properties});
            }
        }, err => {
            console.log(err);
        });
    }

    // Traer los productos de la categoria seleccionada.
    getProductsSubcategory(id) {
        this._storeService.getProductIdSubCategory(id).subscribe((data) => {
            this.products = [];
            if (data.state) {
                for (let i = 0; i < (data.products.length > this.tope ? this.tope : data.products.length); i++) {
                    this.products.push(data.products[i]);
                    this.quantity[data.products[i].properties.code] = 1;
                }
                this.tope += 4;
            }
        });
    }

    // Traer todas las facturas pendientes.
    getAllInvoices() {
        this._invoiceServices.getInvoicesId(this.idUser)
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

    loadSubCategory(id, state) {
        this._storeService.getSubCategories(id).subscribe(
            data => {
                if (state) {
                    this.listSubCategories = [];
                    for (const i of data.answer) {
                        this.listSubCategories.push(i);
                    }
                } else {
                    this.listSubCategoriesDropdown = [];
                    for (const i of data.answer) {
                        this.listSubCategoriesDropdown.push(i);
                    }
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
        this._storeService.addProduct(code, this.quantity[code]).then(
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
        this.stories = false;
        this.store = false;
        this.setCart = true;
        this.setInvoice = false;
        this.setSearch = false;
    }

// abrir el buscador.
    openSearch() {
        this.stories = false;
        this.store = false;
        this.setInvoice = false;
        this.setCart = false;
        this.setSearch = true;
    }

    getAllCart(id) {
        this._storeService.getCart(id).subscribe((datacart) => {

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
        }, errcart => {

        });

    }

    editProduct(code: string) {

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

        /*
          this._storeService.editProduct(this.unitSmall[code], code)
          .then(data => {
            console.log(data);
          }, err => {
            console.log(err);
          });
          */

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
        const idUser = JSON.parse(localStorage.getItem('user')).usuario.identity.low;
        this._storeService.deleteProduct(code, idUser).then(data => {

        }, err => {
            console.log(err);
        });

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

    seeCategory(even: any, state) {
        let id = null;
        if (state) {
            id = even.target.value;
        } else {
            id = even;
        }
        this.setSearch = false;
        this.setCart = false;
        this.setInvoice = false;
        this.stories = false;
        this.store = true;
        this.idSubcategory = id;
        this.subcategory = true;
        this.loadSubCategory(this.idCategory, true);
        this.getProductsSubcategory(id);
        // this.getAllInvoices();
        // this.getAllCart(this.idUser);
    }

    seeCategoryDropdown(id: number) {
        this.idSubcategory = id;
        this.subcategory = true;
        this.loadSubCategory(this.idCategory, true);
        this.getProductsSubcategory(id);
        // this.getAllInvoices();
        // this.getAllCart(this.idUser);
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
        this._productoServices.deleteCart(this.idUser)
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

    // ver las facturas pendientes.
    openInvoice() {

        this.setSearch = false;
        this.store = false;
        this.stories = false;
        this.setCart = false;
        this.setInvoice = true;

    }

// ocultar el menu de la facturas.
    ocultarMenuInvoice(menu) {
        $(menu).removeClass('bounceInRight');
        $(menu).addClass('animated bounceOutRight');
        this.interruptorInvoice = 'off';
    }

// mostrar el menu de las facturas.
    mostrarMenuInvoice(menu) {
        $(menu).removeClass('bounceOutRight');
        $(menu).addClass('animated bounceInRight');
        $(menu).css('display', 'block');
        this.interruptorInvoice = 'on';
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
        this._invoiceServices.payBillId(id, true).then((data: any) => {
            this.getAllInvoices();
        }, err => {
            console.log(err);
        });
    }

    plugin() {
        $('.slider').slider({indicators: false, height: '463'});
        $('.sidenav').sidenav();
        $('.collapsible').collapsible();
        // jquey
        $('#img-invoice').hide();
    }

    storage() {
        this.storageIdCategory = localStorage.getItem('idcategory');
        localStorage.setItem('role', `subStore/${this.storageIdCategory}`);
        this.idUser = parseInt(JSON.parse(localStorage.getItem('user')).usuario.identity.low);
        this.user = JSON.parse(localStorage.getItem('user')).usuario.properties;
    }

    sideMenuCategory(id: number) {
        this.idSubcategory = id;
        this.subcategory = true;
        this.loadSubCategory(this.idCategory, true);
        this.getProductsSubcategory(id);
        this.getAllInvoices();
        this.getAllCart(this.idUser);
    }

    menuCategories() {
        $('#toggle-categories').show();
    }

    menuCategoriesOut() {
        $('#toggle-categories').hide();
    }

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

    hoverCategory(id, state) {
        this.loadSubCategory(id, state);
        $('.sub-toggle').show();
    }

    outCategory() {
        $('.sub-toggle').hide();
    }

    setStories() {
        this.store = false;
        this.stories = true;
        this.setCart = false;
        this.setSearch = false;
        this.setInvoice = false;
    }

}


