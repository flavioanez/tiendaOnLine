import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Producto} from '../../../../models/product.model';
import {ProductService} from '../../../../services/product.services';
import {StoreService} from '../../../../services/store.services';

declare var $;

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

    @Input() code: string;

    public photo: Array<File>;
    public pricefinal;
    public pricefinalmayorista;
    public categories = [];
    public subcategories = [];
    public message = '';

    // modelo
    product: Producto;

    constructor(private router: Router,
                private _storeService: StoreService,
                private _productServices: ProductService) {
        this.product = new Producto(
            '',
            '',
            '',
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            '',
            '',
            '',
            'E',
            'M',
            0,
            '');
    }

    ngOnInit() {
        localStorage.setItem('role', 'editarProducto');
        this.getProducto(this.code);
        this.loadCategories();
        this.message = 'Por favor, vuelve a subir la foto del producto antes de guardar';
    }

    // cargar la foto.
    loadPhoto(event) {
        this.photo = <Array<File>>event.target.files;
        console.log(this.photo);
    }

    // metodo que trae la categorias de la Db.
    loadCategories() {
        this._productServices.getCategory().subscribe(data => {
            for (const i of data.categories) {
                this.categories.push(i);
            }
        }, err => {
            console.log(err);
        });
    }

    getCategory(prod: any) {
        this.product.categories = prod.target.value;
        this.subcategories = [];
        this._productServices.getSubCategory().subscribe(data => {
            for (const i of data.subcategories) {
                if (prod.target.value === i.properties.idcategory) {
                    this.subcategories.push(i);
                }
            }
        }, err => {
            console.log(err);
        });
    }

    getsubCategory(prod) {
        this.product.subcategories = prod.target.value;
    }

    // traer el producto
    getProducto(code) {
        this._storeService.getIdProduct(code).subscribe((data: any) => {
            this.product = data.products.properties;
        });
    }

    limpiarTablero() {
        this.product = null;
        this.message = '';
        this.product = new Producto(
            '',
            '',
            '',
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            '',
            '',
            '',
            '',
            '',
            0,
            '');
    }

    onSubmit() {

        this.product.pricefinal = Number(((this.product.priceventa - ((this.product.priceventa * this.product.pricediscount) / 100)) +
        ((this.product.priceventa - ((this.product.priceventa * this.product.pricediscount) / 100)) * this.product.iva) / 100).toFixed());

        this.product.pricefinalmayorista = Number(((this.product.priceventamayorista -
            ((this.product.priceventamayorista * this.product.pricediscountmayorista) / 100)) +
            ((this.product.priceventamayorista - ((this.product.priceventamayorista * this.product.pricediscountmayorista) / 100))
                * this.product.iva) / 100).toFixed());
        if (this.product.title !== '' &&
            this.product.medida !== '' &&
            this.product.priceventa !== 0 &&
            this.product.priceventamayorista !== 0 &&
            this.product.pricediscount !== 0 &&
            this.product.pricediscountmayorista !== 0 &&
            this.product.iva !== 0 &&
            this.product.code !== '' &&
            this.product.categories !== '' &&
            this.product.subcategories !== '') {

            if (this.photo !== undefined) {
                this._productServices.editarProductServices([], this.photo, this.product).then((data: any) => {
                    this.message = data.producto;
                    console.log(data);
                }, err => {
                    console.log(err);
                });

            } else {
                this.message = 'Hay uno o mas campos vacios';
            }
        }
    }


}
