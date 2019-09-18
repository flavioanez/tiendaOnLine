import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder} from '@angular/forms';
import {UserService} from '../../../../services/users.services';

@Component({
    selector: 'app-modify-profile',
    templateUrl: './modify-profile.component.html',
    styleUrls: ['./modify-profile.component.css']
})
export class ModifyProfileComponent implements OnInit {

    public optionModify;
    public message: string;
    public user;
    public oldNumbertelephone;
    public enabledEmail = true;
    public enabledpassword = true;
    public email;
    public photo: Array<File>;

    // formularios
    public formUser: FormGroup;
    public formTelephone: FormGroup;
    public formAddress: FormGroup;
    public formEmail: FormGroup;
    public formPassword: FormGroup;

    constructor(private router: Router,
                private _userService: UserService,
                private formbuilder: FormBuilder) {
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user')).usuario.properties;
        this.oldNumbertelephone = this.user.telephone;
        this.email = this.user.email;
        this.optionModify = localStorage.getItem('typeModify');
        this.createFormUser();
        this.createFormTelephone();
        this.createFormAddress();
        this.createFormEmail();
        this.createFormPassword();
    }

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // validar input de confirmación
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // obtener el email del formulario.
    getEmail(email){
        this.formEmail.value.email = email.target.value;
        if(this.formEmail.value.email === this.formEmail.value.emailConfirm){
            this.enabledEmail = false;
        } else {
            this.enabledEmail = true;
        }
    }

    getEmailConfirm(email){
        this.formEmail.value.emailConfirm = email.target.value;
        if(this.formEmail.value.email === this.formEmail.value.emailConfirm){
            this.enabledEmail = false;
        } else {
            this.enabledEmail = true;
        }
    }

    getPassword(pass){
        this.formPassword.value.password = pass.target.value;
        if(this.formPassword.value.password === this.formPassword.value.newPassword){
            this.enabledpassword = false;
        } else {
            this.enabledpassword = true;
        }
    }

    getPasswordConfirm(pass){
        this.formPassword.value.newPassword = pass.target.value;
        if(this.formPassword.value.password === this.formPassword.value.newPassword){
            this.enabledpassword = false;
        } else {
            this.enabledpassword = true;
        }
    }


// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // closet
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // crear el formulario de nombre y numero telefonico.
    createFormUser() {
        this.formUser = this.formbuilder.group({
            name: [`${this.user.name}`],
            lastname1: [`${this.user.lastname1}`],
            lastname2: [`${this.user.lastname2}`],
            idUser: [`${JSON.parse(localStorage.getItem('user')).usuario.properties.identificationcard}`]
        });
    }

    createFormTelephone() {
        this.formTelephone = this.formbuilder.group(({
            newTelephone: [''],
            identificationcard: [`${JSON.parse(localStorage.getItem('user')).usuario.properties.identificationcard}`]
        }));
    }

    createFormAddress() {
        this.formAddress = this.formbuilder.group({
            address: [`${this.user.address}`],
            identificationcard: [`${JSON.parse(localStorage.getItem('user')).usuario.properties.identificationcard}`]
        });
    }

    createFormEmail(){
        this.formEmail = this.formbuilder.group({
            email:[''],
            emailConfirm:[''],
            identificationcard: [`${JSON.parse(localStorage.getItem('user')).usuario.properties.identificationcard}`]
        });
    }

    createFormPassword(){
        this.formPassword = this.formbuilder.group({
            password:[''],
            newPassword:[''],
            identificationcard: [`${JSON.parse(localStorage.getItem('user')).usuario.properties.identificationcard}`]
        })
    }

    loadPhoto(foto: any){
        this.photo = <Array<File>>foto.target.files;
    }

    sendUser() {
        this.message = '';
        // pendiente por enviar el nombre y apellido modificado.
        if (this.formUser.value.name != '' && this.formUser.value.lastname1 != '' && this.formUser.value.lastname2 != '') {
            this._userService.updateNameUser(this.formUser.value)
                .then((data: any) => {
                    this.message = data.answer;
                    localStorage.setItem('user', JSON.stringify(data));
                }, err => {
                    this.message = err.answer;
                });
        } else {
            this.message = 'Hay unos mas campos vacios';
        }
    }

    sendTelephone() {
        this.message = '';
        if (this.formTelephone.value.newTelephone != '') {
            this._userService.updateTelephoneUser(this.formTelephone.value)
                .then((data: any) => {
                    this.message = data.answer;
                    localStorage.setItem('user', JSON.stringify(data));
                    this.oldNumbertelephone = data.usuario.properties.telephone;
                }, err => {
                    this.message = err.answer;
                });
        } else {
            this.message = 'Hay unos mas campos vacios';
        }
    }

    sendAddress() {
        this.message = '';
        if (this.formAddress.value.address != '') {
            this._userService.updateAddressUser(this.formAddress.value)
                .then((data: any) => {
                    this.message = data.answer;
                    console.log(data);
                    localStorage.setItem('user', JSON.stringify(data));
                }, err => {
                    this.message = err.answer;
                });
        } else {
            this.message = 'Hay unos mas campos vacios';
        }
    }

    sendEmail(){
        this.message = '';
        if (this.formEmail.value.email != '' && this.formEmail.value.emailConfirm) {
            this._userService.updateEmailUser(this.formEmail.value)
                .then((data: any) => {
                    this.message = data.answer;
                    console.log(data);
                    localStorage.setItem('user', JSON.stringify(data));
                    this.email = data.usuario.properties.email;
                }, err => {
                    this.message = err.answer;
                });
        } else {
            this.message = 'Hay unos mas campos vacios';
        }
    }

    sendPassword(){
        this.message = '';
        if (this.formPassword.value.password != '' && this.formPassword.value.newPassword) {
            this._userService.updatePasswordUser(this.formPassword.value)
                .then((data: any) => {
                    this.message = data.answer;
                    localStorage.setItem('user', JSON.stringify(data));
                }, err => {
                    this.message = err.answer;
                });
        } else {
            this.message = 'Hay unos mas campos vacios';
        }
    }

    sendPhoto(){
        this.message = '';
        if(this.photo === undefined) {
            this.message = 'error no has cargado ninguna fotografia'
        } else {
            if (this.photo.length != 0) {
                this._userService.updatePhotoUser([], this.photo).then((data: any) =>{
                    this.message = data.answer;
                    // localStorage.setItem('user', JSON.stringify(data));
                }, err =>{
                    this.message = err.answer;
                });
            } else {
                this.message = 'Por favor carga una fotografia';
            }
        }
    }
}
