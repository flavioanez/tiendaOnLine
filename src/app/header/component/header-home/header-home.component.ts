import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../services/users.services';
import {LoginService} from '../../../services/login.services';
declare var $;

@Component({
    selector: 'app-header-home',
    templateUrl: './header-home.component.html',
    styleUrls: ['./header-home.component.css']
})

export class HeaderHomeComponent implements OnInit {

    formInvited: FormGroup;
    formLoginInvited: FormGroup;
    formBusinessman: FormGroup;
    formMayorista: FormGroup;
    title = 'Navbar del Home';
    private interruptor = 'off';
    public message = '';
    public campos = '';
    public texthome = true;
    public cedula;
    private user: any;
    public token;

    constructor(private router: Router,
                private _userServices: UserService,
                private _loginProvider: LoginService,
                private formbuilder: FormBuilder) {
    }

    ngOnInit() {
        $('.sidenav').sidenav();
        $('.tabs').tabs();
        $('#new-invited').hide();
        $('#old-invited').show();
        this.createFormLogin();
        this.createForm();
        this.createFormBusinessman();
        this.createForMayorista();
        this.message = 'Por favor llena todos los campos del formulario, si quieres acceder todos nuestro beneficios convierte en nuestro empresario All in App.';
    }

    openLogin() {
        const login = $('#login');
        switch (this.interruptor) {
            case 'off':
                this.mostraMenu(login);
                break;
            case 'on':
                this.esconderMenu(login);
                break;
            default:
                console.log('Interruptor incorrecto');
        }
    }

    mostraMenu(login) {
        login.removeClass('animated bounceOutRight');
        login.addClass('animated bounceInRight');
        login.css('display', 'block');
        this.interruptor = 'on';
    }

    esconderMenu(login) {
        login.removeClass('animated bounceInRight');
        login.addClass('animated bounceOutRight');
        this.interruptor = 'off';
    }

    showFormInvited() {
        this.campos = '';
        $('#new-invited').show('slow');
        $('#old-invited').hide('slow');
        this.cedula = this.formLoginInvited.value.identificationcard;
    }

    showFormInvitedDisablesd() {
        $('#new-invited').hide('slow');
        $('#old-invited').show('slow');
    }

    // create form of the invited.
    createForm() {
        this.formInvited = this.formbuilder.group({
            name: [''],
            lastnames: [''],
            identificationcard: [''],
            telephone: [''],
            email: ['']
        });
    }

    createFormLogin() {
        this.formLoginInvited = this.formbuilder.group({
            identificationcard: ['']
        });
    }

    createFormBusinessman() {
        this.formBusinessman = this.formbuilder.group({
            user: [''],
            password: ['']
        });
    }

    createForMayorista() {
        this.formMayorista = this.formbuilder.group({
            identificationcard: [''],
            password: ['']
        });
    }

    sendInvited() {
        this.message = '';
        if (this.formInvited.value.name !== '' &&
            this.formInvited.value.lastnames !== '' &&
            this.formInvited.value.identificationcard !== '' &&
            this.formInvited.value.telephone &&
            this.formInvited.value.email !== '') {

            this._userServices.createInvited(this.formInvited.value).then((data: any) => {
                this.texthome = false;
                if (data.state) {
                    this.message = data.answer;
                    setTimeout(() => {
                        $('#new-invited').hide('slow');
                        $('#old-invited').show('slow');
                    }, 1700);
                } else {
                    this.message = data.answer;
                }
            }, err => {
                this.message = err.answer;
            });

        } else {
            this.campos = 'Hay unos o mas campos vacios';
        }
    }

    loginInvited() {
        this.campos = '';
        if (this.formLoginInvited.value.identificationcard !== '') {
            this._userServices.loginInvitedUser(this.formLoginInvited.value.identificationcard).subscribe((data: any) => {
                if (data.state) {
                    localStorage.setItem('idInvited', data.answer.identity.low);
                    localStorage.setItem('dataInvited', JSON.stringify(data.answer));
                    localStorage.setItem('role', 'invited');
                    this.router.navigate(['/invited']);
                } else {
                    this.campos = 'Este documento no esta registrado en nuestro sistema';
                }
            }, err => {
                console.log(err);
            });

        } else {
            this.campos = 'El campo esta vacio';
        }
    }

    sendLogin() {
        if (this.formBusinessman.value.user !== '' && this.formBusinessman.value.password) {

            this._loginProvider.loginService(this.formBusinessman.value, false).then((data: any) => {
                // console.log(data);
                this.user = data;
                if (this.user.err) {
                    this.campos = this.user.err;
                    setTimeout(() => {
                        this.campos = '';
                    }, 2700);
                } else {
                    this.campos = '';
                    this.user.usuario.properties.password = '';
                    this._loginProvider.loginService(this.formBusinessman.value, true)
                        .then((resToken: any) => {
                            this.token = resToken.token;
                            localStorage.setItem('user', JSON.stringify(this.user));
                            localStorage.setItem('role', 'businnessman');
                            this.router.navigate(['/store']);
                        });

                }

            }, err => {
                console.log(err);
            });

        } else {
            this.campos = 'Hay uno o mas campos vacios';
        }
    }

    sendLoginMayorista() {
        if (this.formMayorista.value.user !== '' && this.formMayorista.value.password !== '') {
            this._userServices.loginMayorista(this.formMayorista.value).then((data: any) => {
                if (data.authorization) {
                    this.router.navigate(['/storeMayorista']);
                    localStorage.setItem('idMayorista', JSON.stringify(data.data));
                } else {
                    this.campos = data.message;
                }
            });
        } else {
            this.campos = 'Hay uno o mas campos vacios.';
        }
    }

}
