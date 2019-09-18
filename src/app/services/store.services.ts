import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiUrl} from '../global/url';

@Injectable()
export class StoreService {

    private url;

    constructor(public http: HttpClient) {
        this.url = apiUrl;
    }

    userServices(user) {
        const params = JSON.stringify(user);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return new Promise((resolve, recje) => {
            this.http.post(this.url + 'insertHome', params, {headers: headers}).subscribe(data => {
                resolve(data);
            }, err => {
                recje(err);
            });
        });
    }
// traer los productos.
    getProduct(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(this.url + 'getProducts', {headers: headers});
    }

    getIdProduct(id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(this.url + 'getIdProducts/' + id, {headers: headers});
    }

    // Traer los productos de la categoria seleccionada.
    getProductIdCategory(id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(this.url + 'getProductsCategory/' + id, {headers: headers});
    }

    // Traer los productos de la subcategoria seleccionada.
    getProductIdSubCategory(id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(this.url + 'getProductsSubCategory/' + id, {headers: headers});
    }

    addProduct(code: string, quantity: number) {
        const codigo = {
            code,
            quantity,
            idUser: JSON.parse(localStorage.getItem('user')).usuario.identity
        };

        const params = codigo;
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        let millisegundos: any = new Date();
        millisegundos = millisegundos.getMilliseconds();
        return new Promise((resolve, recje) => {
            this.http.post(this.url + 'addProduct', params, {headers: headers}).subscribe(
                data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });
    }

    editProduct(quantity: number, code: string) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = {
            quantity,
            code
        };
        return new Promise((resolve, recje) => {
            this.http.post(this.url + '/editProduct', params, {headers: headers}).subscribe(
                data => {
                    resolve(data);
                }, err => {
                    recje(err);
                }
            );
        });
    }

    getCart(id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(this.url + 'getCart/' + id, {headers: headers});
    }

    deleteProduct(code: string, idUser: number) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = {
            code,
            idUser
        };
        return new Promise((resolve, recje) => {
            this.http.post(this.url + 'deleteProduct', params, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });
    }
// Traer todas las categorias.
    getCategories(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(this.url + 'getCategories', {headers: headers});
    }

// Traer todas las subcategorias.
    getSubCategories(id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const param = JSON.stringify({id});
        return this.http.get(`${this.url}getSubCategoriesId/${id}` , {headers: headers});
    }

    performPurchase(purchase: any, id) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = JSON.stringify(purchase);
        return new Promise((resolve, recje) => {
            this.http.post(this.url + 'performPurchase/' + id, params, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });
    }

    updateCart(purchase: any, id) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = JSON.stringify(purchase);
        return new Promise((resolve, recje) => {
            this.http.post(this.url + 'updatecart/' + id, params, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });
    }


    sendTopePurchase(tope): Observable<any> {
        const params = JSON.stringify(tope);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.put(this.url + 'getTopePurchase', params, {headers: headers});
    }

}
