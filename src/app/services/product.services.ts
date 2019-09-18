import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiUrl} from '../global/url';
import {promise} from 'selenium-webdriver';

@Injectable()
export class ProductService {

    private url;

    constructor(public http: HttpClient) {
        this.url = apiUrl;
    }

    createProductServices(params: Array<string>, files: Array<File>, product) {

        return new Promise((resolve, recje) => {
            const formdata = new FormData();
            const xhr = new XMLHttpRequest();
            for (let i = 0; i < files.length; i++) {
                formdata.append('productUrl', files[i], files[i].name);
            }
            formdata.append('title', product.title);
            formdata.append('medida', product.medida);
            formdata.append('descriptiondetailed', product.descriptiondetailed);
            formdata.append('priceventa', product.priceventa);
            formdata.append('priceventamayorista', product.priceventamayorista);
            formdata.append('pricediscount', product.pricediscount);
            formdata.append('pricediscountmayorista', product.pricediscountmayorista);
            formdata.append('pricefinal', product.pricefinal);
            formdata.append('pricefinalmayorista', product.pricefinalmayorista);
            formdata.append('iva', product.iva);
            formdata.append('points', product.points);
            formdata.append('code', product.code);
            formdata.append('categories', product.categories);
            formdata.append('subcategories', product.subcategories);
            formdata.append('clientempresario', product.clientempresario);
            formdata.append('clientmayorista', product.clientmayorista);
            formdata.append('stock', product.stock);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        recje(xhr.response);
                    }
                }
            };
            xhr.open('post', this.url + 'createProduct', true);
            xhr.send(formdata);
        });

    }

    getCategory(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(this.url + '/getCategories', {headers: headers});
    }

    getSubCategory(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(this.url + '/getSubCategories', {headers: headers});
    }


    createCategory(params: Array<string>, files: Array<File>, category) {

        return new Promise((resolve, recje) => {
            const formdata = new FormData();
            const xhr = new XMLHttpRequest();
            for (let i = 0; i < files.length; i++) {
                formdata.append('categoryUrl', files[i], files[i].name);
            }
            formdata.append('category', category.category);
            formdata.append('pcomision', category.pcomision);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        recje(xhr.response);
                    }
                }
            };
            xhr.open('post', this.url + 'createCategory', true);
            xhr.send(formdata);
        });

    }

    createsubCategory(params: Array<string>, files: Array<File>, subcategory) {

        return new Promise((resolve, recje) => {

            const formdata = new FormData();
            const xhr = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                formdata.append('SubCategoryUrl', files[i], files[i].name);
            }

            formdata.append('idcategory', subcategory.idcategory);
            formdata.append('subcategory', subcategory.subcategory);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        recje(xhr.response);
                    }
                }
            };

            xhr.open('post', this.url + 'createSubCategory', true);
            xhr.send(formdata);
        });

    }


    deleteCart(id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(this.url + 'deleteCart/' + id, {headers: headers});
    }

    deleteCartInvited(id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(this.url + 'deleteCartInvited/' + id, {headers: headers});
    }

    deleteCartMayorista(id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(this.url + 'deleteCartMayorista/' + id, {headers: headers});
    }

    // editar el producto.
    editarProductServices(params: Array<string>, files: Array<File>, product) {

        return new Promise((resolve, recje) => {
            const formdata = new FormData();
            const xhr = new XMLHttpRequest();
            for (let i = 0; i < files.length; i++) {
                formdata.append('productUrl', files[i], files[i].name);
            }
            formdata.append('title', product.title);
            formdata.append('medida', product.medida);
            formdata.append('descriptiondetailed', product.descriptiondetailed);
            formdata.append('medida', product.medida);
            formdata.append('priceventa', product.priceventa);
            formdata.append('priceventamayorista', product.priceventamayorista);
            formdata.append('pricediscount', product.pricediscount);
            formdata.append('pricediscountmayorista', product.pricediscountmayorista);
            formdata.append('pricefinal', product.pricefinal);
            formdata.append('pricefinalmayorista', product.pricefinalmayorista);
            formdata.append('iva', product.iva);
            formdata.append('points', product.points);
            formdata.append('code', product.code);
            formdata.append('categories', product.categories);
            formdata.append('subcategories', product.subcategories);
            formdata.append('clientempresario', product.clientempresario);
            formdata.append('clientmayorista', product.clientmayorista);
            formdata.append('stock', product.stock);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        recje(xhr.response);
                    }
                }
            };
            console.log(product.code);
            xhr.open('post', this.url + 'updateProduct/' + product.code , true);
            xhr.send(formdata);
        });

    }

    // traer los productos.
    getProduct(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(this.url + 'getProducts', {headers: headers});
    }

    // traer los productos.
    getProductCode(code:string): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(`${this.url}getProductsCode/${code}`, {headers: headers});
    }

}
