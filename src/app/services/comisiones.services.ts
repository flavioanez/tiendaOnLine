import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiUrl} from '../global/url';

@Injectable()
export class ComisionesServices {

    private url;

    constructor(public http: HttpClient) {
        this.url = apiUrl;
    }

    // Traer la comision de un usuario mediante su id.
    getComisionId(id: number) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return new Promise((resolve, recje) => {
            this.http.get(this.url + 'getComisionId/' + id, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                   recje(err);
                });
        });
    }

    calculateAllComision(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(this.url + 'allRange', {headers: headers});
    }

    getAllComisiones(date: any) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return new Promise((resolve, recje) => {
            this.http.get(this.url + 'getAllQuincenas/' + date, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });
    }

}
