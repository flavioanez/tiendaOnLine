import {Producto} from '../../../../models/product.model';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../../../../services/product.services';
declare var $;

@Component({
    selector: 'app-create-product',
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

    public message = '';
    public photo: Array<File>;
    public pricefinal;
    public pricefinalmayorista;
    public categories = [];
    public subcategories = [];

    // modelo
    product: Producto;

    constructor(private _productServices: ProductService) {
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
        $('.collapsible').collapsible();
        this.loadCategories();
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

// cargar la foto.
    loadPhoto(event) {
        this.photo = <Array<File>>event.target.files;
        this.product.photo = this.photo[0].name;
    }

    onSubmit() {
        this.message = '';
        this.product.pricefinal = (this.product.priceventa - ((this.product.priceventa * this.product.pricediscount) / 100)) + ((this.product.priceventa - ((this.product.priceventa * this.product.pricediscount) / 100)) * this.product.iva) / 100;
        this.product.pricefinalmayorista = (this.product.priceventamayorista - ((this.product.priceventamayorista * this.product.pricediscountmayorista) / 100)) + ((this.product.priceventamayorista - ((this.product.priceventamayorista * this.product.pricediscountmayorista) / 100)) * this.product.iva) / 100;
        if (this.product.title !== '' &&
            this.product.medida !== '' &&
            this.product.priceventa !== null &&
            this.product.priceventamayorista !== null &&
            this.product.pricediscount !== null &&
            this.product.pricediscountmayorista !== null &&
            this.product.iva !== null &&
            this.product.code !== '' &&
            this.product.categories !== '' &&
            this.product.subcategories !== '') {
            this._productServices.createProductServices([], this.photo, this.product).then((data: any) => {
                this.message = data.producto;
            }, err => {
                this.message = 'Por favor carga la foto de portada de tu producto';
            });

        } else {
            this.message = 'Hay uno o mas campos vacios';
        }
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
            'E',
            'M',
            0,
            '');
    }

}
