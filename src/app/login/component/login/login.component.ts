import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../../../services/login.services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
    title = 'Login';
    public formLogin: FormGroup;
    private user: any;
    public message: string;
    public sesion;
    public token;

    constructor(private formulario: FormBuilder,
                private _loginProvider: LoginService,
                private router: Router) {}

    ngOnInit() {

        this.createForm();

    }

    createForm() {
        this.formLogin = this.formulario.group({
            'user': [''],
            'password': ['']
        });
    }

    onSubmit() {

        this._loginProvider.loginService(this.formLogin.value, false).then((data: any) => {
            // console.log(data);
            this.user = data;
            if (this.user.err) {
                this.message = this.user.err;
                setTimeout(() => {
                    this.message = null;
                }, 2700);
            } else {
                this.user.usuario.properties.password = '';
                this._loginProvider.loginService(this.formLogin.value, true)
                    .then((resToken: any) => {
                        this.token = resToken.token;
                        localStorage.setItem('user', JSON.stringify(this.user));
                        localStorage.setItem('token', JSON.stringify(this.token));
                        switch (Number(this.user.usuario.properties.typeUser)) {
                            case 1:
                                localStorage.setItem('role', 'backoffice');
                                this.router.navigate(['/backoffice']);
                                break;
                            case 2:
                                localStorage.setItem('role', 'businnessman');
                                this.router.navigate(['/businnessman']);
                                break;
                            case 3:
                                localStorage.setItem('role', 'mayorista');
                                this.router.navigate(['/mayorista']);
                                break;
                            default:
                                console.log('No existe el usuario');
                        }

                    });

            }

        }, err => {
            console.log(err);
        });

    }

}
