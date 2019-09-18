import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiUrl} from '../global/url';

@Injectable()
export class UserService {

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

    businessmanServices(user) {
        const params = JSON.stringify(user);

        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return new Promise((resolve, recje) => {
            this.http.post(this.url + 'insertar', params, {headers: headers}).subscribe(data => {
                resolve(data);
            }, err => {
                recje(err);
            });
        });

    }

    sendEmailRecoverService(userOrEmail): Observable<any> {
        const param = JSON.stringify({userOrEmail});
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(this.url + 'recoverUser', param, {headers: headers});
    }

    savePersonaNatural(params: Array<string>, files: Array<File>, natural) {

        return new Promise((resolve, recje) => {
            const formdata = new FormData();
            const xhr = new XMLHttpRequest();
            for (let i = 0; i < files.length; i++) {
                formdata.append('UrlPhotoNatural', files[i], files[i].name);
            }
            formdata.append('name', natural.name);
            formdata.append('lastnames', natural.lastnames);
            formdata.append('telephone', natural.telephone);
            formdata.append('typeCC', natural.typeCC);
            formdata.append('identificationcard', natural.identificationcard);
            formdata.append('department', natural.department);
            formdata.append('email', natural.email);
            formdata.append('city', natural.city);
            formdata.append('date', natural.date);
            formdata.append('address', natural.address);
            formdata.append('typeUser', natural.typeUser);
            formdata.append('password', natural.password);
            formdata.append('idBusinessman', natural.idBusinessman);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        recje(xhr.response);
                    }
                }
            };
            xhr.open('post', this.url + 'createNatural', true);
            xhr.send(formdata);
        });

    }

    // petición para crear la persona mayorista juridica.
    savePersonaJuridica(params: Array<string>, files: Array<File>, juridica) {
        return new Promise((resolve, recje) => {
            const formdata = new FormData();
            const xhr = new XMLHttpRequest();
            for (let i = 0; i < files.length; i++) {
                formdata.append('UrlPhotoJuridica', files[i][0], files[i].name);
            }
            formdata.append('entity', juridica.entity);
            formdata.append('numberNit', juridica.numberNit);
            formdata.append('telephone', juridica.telephone);
            formdata.append('password', juridica.password);
            formdata.append('department', juridica.department);
            formdata.append('city', juridica.city);
            formdata.append('name', juridica.name);
            formdata.append('lastnames', juridica.lastnames);
            formdata.append('typeCC', juridica.typeCC);
            formdata.append('typeUser', juridica.typeUser);
            formdata.append('identificationcard', juridica.identificationcard);
            formdata.append('email', juridica.email);
            formdata.append('date', juridica.date);
            formdata.append('idBusinessman', juridica.idBusinessman);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        recje(xhr.response);
                    }
                }
            };
            xhr.open('post', this.url + 'createJuridica', true);
            xhr.send(formdata);
        });
    }

    // metodos para la modificación de datos personales del usuario.
    updateNameUser(user) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = JSON.stringify(user);
        return new Promise((resolve, recje) => {
            this.http.post(this.url + 'updateUser', params, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });
    }

    // metodos para la modificación de datos personales del usuario.
    updateTelephoneUser(user) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = JSON.stringify(user);
        return new Promise((resolve, recje) => {
            this.http.post(this.url + 'updateTelephone', params, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });
    }

    // actualizar la direccion.
    updateAddressUser(user) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = JSON.stringify(user);
        return new Promise((resolve, recje) => {
            this.http.post(this.url + 'updateAddress', params, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });
    }

    // actualizar el correo electronico.
    updateEmailUser(user) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = JSON.stringify(user);
        return new Promise((resolve, recje) => {
            this.http.put(this.url + 'updateEmail', params, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });
    }

    // actualizar la contraseña personal.
    updatePasswordUser(user) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = JSON.stringify(user);
        return new Promise((resolve, recje) => {
            this.http.put(this.url + 'updatePassword', params, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });
    }

    // update photo of perfil.
    updatePhotoUser(params: Array<string>, files: Array<File>) {

        return new Promise((resolve, recje) => {
            const formdata = new FormData();
            const xhr = new XMLHttpRequest();
            for (let i = 0; i < files.length; i++) {
                formdata.append('UrlPhotoPerfil', files[i], files[i].name);
            }
            formdata.append('identificationcard', JSON.parse(localStorage.getItem('user')).usuario.properties.identificationcard);
            formdata.append('url', 'null');


            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        recje(xhr.response);
                    }
                }
            };
            xhr.open('post', this.url + 'updatePerfil', true);
            xhr.send(formdata);
        });
    }

    listUsers(id, tope): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(`${this.url}listarMisUsuarios/${id}/${tope}`, {headers: headers});
    }

    getMayositaId(id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(this.url + 'getMayoristaId/' + id, {headers: headers});
    }

    createInvited(invited) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = JSON.stringify(invited);
        return new Promise((resolve, recje) => {
            this.http.post(this.url + 'createInvited', params, {headers: headers}).subscribe(data => {
                resolve(data);
            }, err => {
                recje(err);
            });
        });

    }

    loginInvitedUser(identificationcard): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(this.url + 'loginInvited/' + identificationcard, {headers: headers});
    }

    loginMayorista(mayorista) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = JSON.stringify(mayorista);
        return new Promise((resolve, recje) => {
            this.http.post(this.url + 'loginMayorista', params, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });
    }

    totalUser(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', ' application/json');
        return this.http.get(`${this.url}sumUsers`, {headers: headers});
    }

    totalMayoristas(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', ' application/json');
        return this.http.get(`${this.url}sumMayoristas`, {headers: headers});
    }

    totalInvited(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', ' application/json');
        return this.http.get(`${this.url}sumInvited`, {headers: headers});
    }

    allUser(tope: number): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', ' application/json');
        return this.http.get(`${this.url}Users/${tope}`, {headers: headers});
    }

    allMayoristas(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', ' application/json');
        return this.http.get(`${this.url}totalMayoristas`, {headers: headers});
    }

    allInvited(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', ' application/json');
        return this.http.get(`${this.url}totalInvited`, {headers: headers});
    }

    createPasswordAlternative(pass: any) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const param = JSON.stringify({pass});
        return new Promise((resolve, recje) => {
            this.http.post(`${this.url}createPassAlternative`, param, {headers: headers})
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    recje(err);
                });
        });
    }

    // socket:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    saveUserConnect(user) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = JSON.stringify(user);
        return new Promise((resolve, recje) => {
            this.http.post(`${this.url}/saveConnect`, params, {headers: headers}).subscribe((data) => {
                resolve(data);
            }, err => {
                recje(err);
            });
        });
    }


}
