import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiUrl} from '../global/url';

@Injectable()
export class StoreInvitedService {

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

    addProductInvited(code: string, quantity: number) {
        const codigo = {
            code,
            quantity,
            idUser: JSON.parse(localStorage.getItem('idInvited'))
        };

        const params = codigo;
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return new Promise((resolve, recje) => {
            this.http.post(this.url + 'addProductInvited', params, {headers: headers}).subscribe(
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
        return this.http.get(this.url + 'getCartInvited/' + id, {headers: headers});
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

    deleteProductInvited(code: string, idInvited: number) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = {
            code,
            idInvited,
            state: 'abierto'
        };
        return new Promise((resolve, recje) => {
            this.http.post(this.url + 'deleteProductInvited', params, {headers: headers})
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
        return this.http.post(this.url + 'getSubCategories' , param, {headers: headers});
    }

    performPurchase(purchase: any, id) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = JSON.stringify(purchase);
        return new Promise((resolve, recje) => {
            this.http.post(this.url + 'performPurchaseInvited/' + id, params, {headers: headers})
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

    updateCart(purchase: any, id) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = JSON.stringify(purchase);
        return new Promise((resolve, recje) => {
            this.http.post(this.url + 'updatecartInvited/' + id, params, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });
    }

}
