import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../global/url';

@Injectable()
export class LoginService {

    private url;
    constructor(public http: HttpClient) {
        this.url = apiUrl;
    }

    loginService(user, token: boolean) {
        const params = JSON.stringify({user, token});
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return new Promise((resolve, recje) => {
            this.http.post(this.url + 'login', params, { headers: headers}).subscribe(data => {
                resolve(data);
            }, err => {
                recje(err);
            });
        });
    }

    loginGenericService(user, token: boolean) {
        const params = JSON.stringify({user, token});
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return new Promise((resolve, recje) => {
            this.http.post(this.url + 'loginGeneric', params, { headers: headers}).subscribe(data => {
                resolve(data);
            }, err => {
                recje(err);
            });
        });
    }

}
