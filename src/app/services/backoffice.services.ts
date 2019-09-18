import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiUrl} from '../global/url';
import {promise} from 'selenium-webdriver';

@Injectable()
export class BackOfficeReportServices {

    private url;

    constructor(public http: HttpClient) {
        this.url = apiUrl;
    }

    // Traer las comisiones en un rango de fecha.
    getAllComisiones(date) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = JSON.stringify(date);
        return new Promise((resolve, recje) => {
            this.http.post(this.url + 'getAllComision', params, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });
    }

    getAllTotalPurchase(state) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return new Promise((resolve, recje) => {
            this.http.get(`${this.url}getTotalCompras/${state}`, {headers: headers}).subscribe(data => {
                resolve(data);
            }, err => {
                recje(err);
            });
        });
    }

    getAllListConsolidated(state) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return new Promise((resolve, recje) => {
            this.http.get(`${this.url}getListConsolidated/${state}`, {headers: headers}).subscribe(data => {
                resolve(data);
            }, err => {
                recje(err);
            });
        });
    }

    countInvoices(state) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return new Promise((resolve, recje) => {
            this.http.get(`${this.url}getCountInvoices/${state}`, {headers: headers}).subscribe(data => {
                resolve(data);
            }, err => {
                recje(err);
            });
        });
    }

    getQuincenasDb(date): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(`${this.url}getQuincenas/${date}`, {headers: headers});
    }

    currentFortnight(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(`${this.url}currentFortnight`, {headers: headers});
    }

    getTotalPoints(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(`${this.url}totalPoints`);
    }

    getProductsConsolidated(state): Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(`${this.url}consolidatedProducts/${state}`, {headers: headers});
    }

}
