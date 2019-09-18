import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.services';
declare var $;
@Component({
    selector: 'app-create-category',
    templateUrl: './create-category.component.html',
    styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

    formCategory: FormGroup;
    formSubcategory: FormGroup;

    public photo: Array<File>;
    public categories = [];
    private idcategory;
    public vcomision;
    message = '';

    constructor(private formbuilder: FormBuilder,
                private _productservices: ProductService) {}

    ngOnInit() {
        $('.collapsible').collapsible();
        this.createForm();
        this.createFormSubcategory();
        this.loadCategories();
    }

    // cargar la foto de la categoria.
    loadPhoto(foto: any) {
        this.photo = <Array<File>>foto.target.files;
    }
    // cargar las categorias.
    loadCategories() {
        this._productservices.getCategory().subscribe(data => {
            for (const i of data.categories) {
                this.categories.push(i);
            }
        }, err => {
            console.log(err);
        });
    }
    // crear el formulario de la categoria.
    createForm() {
        this.formCategory = this.formbuilder.group({
            category: [''],
            pcomision: ['']
        });
    }
    // crear el formulario de la subcategoria
    createFormSubcategory() {
        this.formSubcategory = this.formbuilder.group({
            idcategory: [null],
            subcategory: ['']
        });
    }

    // seleccionar la id de la categoria.
    setIdcategory(id) {
        this.idcategory = id.target.value;
    }

    // usar el servicio que crea la categoria.
    onSubmit() {
        this.formCategory.value.pcomision = this.vcomision;
        if (this.formCategory.value.category !== '' && this.formCategory.value.pcomision !== '') {
            this._productservices.createCategory([], this.photo, this.formCategory.value)
                .then((data: any) => {
                    this.message  = data.answer;
                }, err => {
                    this.message = 'Por favor carga la imagen para una posible portada de tu categoria';
                });
        } else {
            this.message = 'Hay uno o mas campos vacios';
        }
    }

    // usar el servicio que crea la subcategoria.
    onSubmitSubcategory() {
        this.message = '';
        this.formSubcategory.value.idcategory = this.idcategory;
        if (this.formSubcategory.value.subcategory !== '' &&
            this.formSubcategory.value.idcategory !== undefined) {
            this._productservices.createsubCategory([], this.photo, this.formSubcategory.value)
                .then((data: any) => {
                    this.message = data.answer;
                }, err => {
                    this.message = 'Por favor carga la imagen para una posible portada de tu subcategoria';
                });
        } else {
            this.message = 'Hay uno o mas campos vacios';
        }
    }

    comision(event) {
        this.vcomision = event.target.value;
    }

}



