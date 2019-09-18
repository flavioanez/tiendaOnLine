import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/users.services';

declare var $;

@Component({
    selector: 'app-unete',
    templateUrl: './unete.component.html',
    styleUrls: ['./unete.component.css']
})
export class UneteComponent implements OnInit {
    title = 'Unete';
    uneteForm: FormGroup;
    message: string;
    elems;
    options;
    buttons = false;
    date;
    idUser;
    private fulanos: any[] = [];

    constructor(public formulario: FormBuilder,
                public _userService: UserService) {
    }

    ngOnInit() {
        this.loadFulanos();
        $('.slider').slider({indicators: false, height: '200'});
        // plugin
        $('.datepicker').datepicker({
            format: 'dd, mmmm, yyyy',
            i18n: {
                months: [
                    'Enero',
                    'Febrero',
                    'Marzo',
                    'Abril',
                    'Mayo',
                    'Junio',
                    'Julio',
                    'Agosto',
                    'Septiembre',
                    'Octubre',
                    'Noviembre',
                    'Diciembre'
                ],
                monthsShort: [
                    'Ene',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Agos',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dic'
                ],
                weekdays: [
                    'Domingo',
                    'Lunes',
                    'Martes',
                    'Miercoles',
                    'Jueves',
                    'Viernes',
                    'Sabado'
                ],
                weekdaysShort: [
                    'Dom',
                    'Lun',
                    'Mar',
                    'Mie',
                    'Jue',
                    'Vie',
                    'Sab'
                ],
                weekdaysAbbrev: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
            }
        });
        this.createForm();
    }

    getDate(fecha) {
        this.date = fecha.target.value;
    }

    onSubmit() {
        this.message = '';
        this.uneteForm.value.date = this.date;
        if (this.uneteForm.value.email !== '' &&
            this.uneteForm.value.name !== '' &&
            this.uneteForm.value.us &&
            this.uneteForm.value.password &&
            this.uneteForm.value.lastname1 !== '' &&
            this.uneteForm.value.lastname2 !== '' &&
            this.uneteForm.value.typeCC !== '' &&
            this.uneteForm.value.identificationcard !== '' &&
            this.uneteForm.value.date !== '' &&
            this.uneteForm.value.department !== '' &&
            this.uneteForm.value.city !== '' &&
            this.uneteForm.value.telephone !== '' &&
            this.uneteForm.value.address !== '' &&
            this.uneteForm.value.validateCount !== '' &&
            this.uneteForm.value.gender !== '') {
            if (this.uneteForm.value.terms) {
                this.buttons = true;
                setTimeout(() => {
                    this.buttons = false;
                }, 4000);

                this._userService.userServices(this.uneteForm.value).then((data: any) => {
                    this.message = data.answer;
                }, err => {
                    this.message = err.answer;
                });
            } else {
                this.message = 'Por favor acepta los terminos y condiciones';
            }
        } else {
            this.message = 'Hay uno o mas campos vacios';
        }
    }

    createForm() {
        this.uneteForm = this.formulario.group({
            email: ['', Validators.required],
            us: ['', Validators.required],
            password: ['', Validators.required],
            gender: ['', Validators.required],
            name: ['', Validators.required],
            lastname1: ['', Validators.required],
            lastname2: ['', Validators.required],
            typeCC: ['', Validators.required],
            identificationcard: ['', Validators.required],
            code: [this.codeGenerate()],
            date: ['', Validators.required],
            department: ['', Validators.required],
            city: ['', Validators.required],
            telephone: ['', Validators.required],
            hour: ['7:07 AM'],
            address: ['', Validators.required],
            validateCount: ['', Validators.required],
            typeUser: ['2', Validators.required],
            url: ['image-small.jpg'],
            points: [0],
            nit: [0],
            dv: [0],
            terms: ['', Validators.required]
        });
    }

    codeGenerate() {
        const caracteres = 'abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789';
        let code = null;
        for (let i = 0; i < 20; i++) {
            code += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return code;
    }

    loadFulanos() {
        for (let i = 0; i < 7777; i++) {
            this.fulanos.push({
                email: `email-fulano${i}`,
                usuario: `usuario-fulano${i}`,
                password: `55753500lj`,
                gender: `genero-m-fulano${i}`,
                name: `Fulano${i}`,
                lastname1: `primer-apellido-fulano${i}`,
                lastname2: `segundo-apellido-fulano${i}`,
                typeCC: `cc`,
                identificationcard: 108508 + i,
                date: `2018/30/12`,
                telephone: `304331304${i}`,
                department: `Atlantico`,
                city: `Barranquilla`,
                address: `carrera N° 7-77`,
                activateCount: `email`,
                typeUser: 2,
                url: 'image-small.jpg',
                points: 77,
                nit: 0,
                dv: 0,
                terms: true
            });
        }
    }

    /*
            onSubmit() {
                const stop = 21;
                let i = 1;
                const timer = setInterval(() => {

                    if (i < stop) {
                        this.message = '';
                        this.uneteForm.value.date = this.fulanos[i].date;
                        this.uneteForm.value.email = this.fulanos[i].email;
                        this.uneteForm.value.name = this.fulanos[i].name;
                        this.uneteForm.value.us = this.fulanos[i].usuario;
                        this.uneteForm.value.password = '55753500lj';
                        this.uneteForm.value.lastname1 = this.fulanos[i].lastname1;
                        this.uneteForm.value.lastname2 = this.fulanos[i].lastname2;
                        this.uneteForm.value.typeCC = this.fulanos[i].typeCC;
                        this.uneteForm.value.identificationcard = this.fulanos[i].identificationcard;
                        this.uneteForm.value.department = 'Atlantico';
                        this.uneteForm.value.city = 'Barranquilla';
                        this.uneteForm.value.telephone = this.fulanos[i].telephone;
                        this.uneteForm.value.address = 'Carrera 7 N° 7-77';
                        this.uneteForm.value.validateCount = 'email';
                        this.uneteForm.value.gender = 'Masculino';
                        this.uneteForm.value.terms = true;

                        this._userService.userServices(this.uneteForm.value).then((data: any) => {
                            this.message = data.answer;
                        }, err => {
                            this.message = err.answer;
                        });
                        console.log(`ciclo-${i}`);
                        i++;
                    } else {
                        console.log('setInterval desactivado');
                        clearInterval(timer);
                    }

                }, 1);
            }
    */
}

