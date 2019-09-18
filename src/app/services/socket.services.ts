import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {apiUrl, defaultSocket} from '../global/url';

@Injectable()
export class SocketServices {

    private url;
    private local;
    private socket;
    private token: string;

    constructor(public http: HttpClient) {
        this.url = apiUrl;
        this.local = defaultSocket;
        this.token = this.token = JSON.parse(localStorage.getItem('token'));
        this.socket = io(this.local, {
            query: {
                token: this.token
            }
        });
    }

    connect() {
        this.socket.on('connect', function () {
            console.log('Conectado al servidor');
        });
    }

    disconnect() {
        this.socket.on('disconnect', function () {
            console.log('Servidor desconectado');
        });
    }

    userConnect() {
        const observable = new Observable(observer => {
            this.socket.on('conectado', (data) => {
                observer.next(data);
            });
        });
        return observable;
    }

    socketPaymentInvoice(id) {
        const observable = new Observable(observer => {
            this.socket.emit('paymentInvoice', id, (data) => {
                observer.next(data);
            });
        });
        return observable;
    }

    totalPurchases(param) {
        const observable = new Observable(observer => {
            this.socket.on(`${param}`, data => {
                observer.next(data);
            });
        });
        return observable;
    }

    amountOfInvoices(param) {
        const observable = new Observable(observer => {
            this.socket.on(`${param}`, data => {
                observer.next(data);
            });
        });
        return observable;
    }


}
