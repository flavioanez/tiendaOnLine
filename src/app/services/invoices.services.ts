import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {Observable} from 'rxjs';
import {apiUrl} from '../global/url';
import {promise} from 'selenium-webdriver';


@Injectable()
export class InvoicesServices {

    private url;

    constructor(public http: HttpClient) {
        this.url = apiUrl;
    }

    getInvoicesId(idClient) {

        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return new Promise((resolve, recje) => {
            this.http.get(`${this.url}getInvoices/${idClient}`, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });

    }

    getInvoicesPaymentId(idClient, date) {

        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = JSON.stringify({idClient, date})
        return new Promise((resolve, recje) => {
            this.http.post(`${this.url}getInvoicesPayment`, params, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });

    }

    getInvoicesPaymentStoriesId(id) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return new Promise((resolve, recje) => {
            this.http.get(`${this.url}getStoriesInvoicesPayment/${id}`, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });

    }

    getInvoicesPaymentInvitedId(idInvited, date) {

        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = JSON.stringify({idInvited, date})
        return new Promise((resolve, recje) => {
            this.http.post(`${this.url}getInvoicesPaymentInvited`, params, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });

    }

    getInvoicesPaymentMayoristaId(idMayorista, date) {

        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = JSON.stringify({idMayorista, date})
        return new Promise((resolve, recje) => {
            this.http.post(`${this.url}getInvoicesPaymentMayorista`, params, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });

    }

    getInvoicesIdInvited(idInvited) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return new Promise((resolve, recje) => {
            this.http.get(this.url + 'getInvoicesInvited/' + idInvited, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });

    }

    getInvoicesIdMayorista(idMayorista) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return new Promise((resolve, recje) => {
            this.http.get(this.url + 'getInvoicesMayorista/' + idMayorista, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });

    }

    getAllInvoicesId(idInvoice) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return new Promise((resolve, recje) => {
            this.http.get(this.url + 'getDetailInvoiceId/' + idInvoice, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });
    }

    getAllInvoicesToday() {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return new Promise((resolve, recje) => {
            this.http.get(this.url + 'getAllInvoices', {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });
    }

    getAllInvoicesInvitadId(idInvoice) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return new Promise((resolve, recje) => {
            this.http.get(this.url + 'getDetailInvoiceinvitedId/' + idInvoice, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });
    }

    getAllInvoicesMayoristaId(idInvoice) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return new Promise((resolve, recje) => {
            this.http.get(this.url + 'getDetailInvoiceMayoristaId/' + idInvoice, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });
    }

    deleteInvoiceId(id, store = true) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        let param = null;
        if (store) {
            param = JSON.stringify(id);
        } else {
            param = JSON.stringify({low: id});
        }
        return new Promise((resolve, recje) => {
            this.http.put(this.url + 'deleteInvoiceId', param, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });
    }

    payBillId(id, empresario) {

        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const param = JSON.stringify({id: id, empresario: empresario});
        return new Promise((resolve, recje) => {

            this.http.post(this.url + 'payIdBill', param, {headers: headers})
                .subscribe(data => {
                    resolve(param);
                }, err => {
                    recje(err);
                });
        });

    }


}
