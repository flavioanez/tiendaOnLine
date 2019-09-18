import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../global/url';

@Injectable()
export class NetworkService {

    private url;
    constructor(public http: HttpClient) {
                                 this.url = apiUrl;
    }

    networkServices(idUser) {
        const user = {
            idUser
        };

         const params = JSON.stringify(user);
         const headers = new HttpHeaders().set('Content-Type', 'application/json');
         return new Promise((resolve, recje) => {
               this.http.post(this.url + 'getNetwork', params, { headers: headers}).subscribe(data => {
                     resolve(data);
               }, err => {
                     recje(err);
               });
         });
    }


}
