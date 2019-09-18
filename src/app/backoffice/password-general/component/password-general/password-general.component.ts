import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {UserService} from '../../../../services/users.services';
import { Router } from '@angular/router';
declare var $;

@Component({
    selector: 'app-password-general',
    templateUrl: './password-general.component.html',
    styleUrls: ['./password-general.component.css']
})
export class PasswordGeneralComponent implements OnInit {

    public formLoginGeneral: FormGroup;
    public message = 'Por favor crea la contraseña alternativa';

    constructor(private _forbuilder: FormBuilder,
                private router: Router,
                private _userServices: UserService) {
    }

    ngOnInit() {
        $('.collapsible').collapsible();
        localStorage.setItem('role', 'passGeneral');
        this.createForm();
    }

    createForm() {
        this.formLoginGeneral = this._forbuilder.group({
            passwordAlternative: ['']
        });
    }

    onSubmit() {
        this.message = '';
        this._userServices.createPasswordAlternative(this.formLoginGeneral.value.passwordAlternative)
            .then((data: any)=>{
                if(data.state){
                    this.message = 'Contraseña alternativa asignada correctamente';
                } else {
                    this.message = 'Lo sentimos, hubo un error al crear la contraseña alternativa';
                }
            }, err=>{
                console.log(err);
            });

    }

}