import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {ProductService} from '../../../../services/product.services';
import {StoreService} from '../../../../services/store.services';
declare var $;

@Component({
    selector: 'app-detail-businessman',
    templateUrl: './detail-businessman.component.html',
    styleUrls: ['./detail-businessman.component.css']
})
export class DetailBusinessmanComponent implements OnInit {

    private code;
    private interruptorsearch;
    private idUser;
    private cart = new Map<number, any>();

    public product: any = {};
    public quantity: number;
    public buscador: string;
    public totalUnits: number;
    public totalPurchase: number;
    public listaprodAux: any[] = [];
    public cartContent: any[] = [];
    public unitSmall = [];
    public buttons;

    constructor(private _ruta: ActivatedRoute,
                private router: Router,
                private _storeService: StoreService,
                private _productService: ProductService) {
        this.quantity = 1;
        this.interruptorsearch = 'off';
        this.totalUnits = 0;
    }

    ngOnInit() {
        this.plugin();
        this.storage();
        this.getParams();
        this.getSearchProductos();
        this.getAllCart(this.idUser);
        this.productcode(this.code);
    }

    getParams() {
        this._ruta.params.subscribe((param: Params) => {
            this.code = param.code;
        });
    }

    productcode(code) {
        this._productService.getProductCode(code).subscribe(data => {
            if (data.state) {
                this.product = data.data.properties;
            }
        });
    }

    removeQuantity(code: string) {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }

    addQuantity(code: string) {
        this.quantity++;
    }

    plugin() {
        $('.sidenav').sidenav();
    }

    buscar(code) {
        this.getParams();
        this.getAllCart(this.idUser);
        this.productcode(code);
        this.openSearchMovil();
        this.router.navigate(['/detailBusinessman/', code]);
    }

    storage() {
        this.idUser = parseInt(JSON.parse(localStorage.getItem('user')).usuario.identity.low);
        localStorage.setItem('role', `detailBusinessman/${this.code}`);
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

    // cargar los productos de la barra en un array auxiliar.
    getSearchProductos() {
        this._storeService.getProduct().subscribe((data) => {
            this.listaprodAux = [];
            for (let i = 0; i < (data.products.length); i++) {
                this.listaprodAux.push(data.products[i].properties);
            }
        });
    }

    addCart(code: string) {
        this._storeService.addProduct(code, this.quantity).then(
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
}
