import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder} from '@angular/forms';
import {UserService} from '../../../../services/users.services';
declare var $;

@Component({
    selector: 'app-wholesaler',
    templateUrl: './wholesaler.component.html',
    styleUrls: ['./wholesaler.component.css']
})
export class WholesalerComponent implements OnInit {


    @ViewChild('formLegal') formLegal: ElementRef;
    @ViewChild('formN') formN: ElementRef;

    public title = null;
    public seeJuridico = false;
    public seeNatural = false;
    public fecha;
    private idUser;
    private file: Array<File>;
    private photo: any[] = [];
    public message: string;
    formNatural: FormGroup;
    formJuridica: FormGroup;

    constructor(private router: Router,
                private _userService: UserService,
                public formbuilder: FormBuilder) {
        localStorage.setItem('role', 'mayorista');
        this.idUser = JSON.parse(localStorage.getItem('user')).usuario.identity.low;
    }

    ngOnInit() {
        this.getDate();
        this.createFormJuridico();
        this.createFormNatural();

        // plugin
        $('.datepicker').datepicker({
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
    }

    // obtener la fecha con un evento change.
    getDate() {
        const date = new Date();
        this.fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    seePeople(even: string) {
        this.message = '';
        if (even === '1') {
            this.seeNatural = true;
            this.seeJuridico = false;
            this.title = 'Persona Natural';
        } else {
            this.seeJuridico = true;
            this.seeNatural = false;
            this.title = 'Persona Juridica';
        }

    }

    createFormJuridico() {
        this.formJuridica = this.formbuilder.group({
            entity: [''],
            numberNit: [''],
            telephone: [''],
            password: [''],
            department: [''],
            city: [''],
            name: [''],
            lastnames: [''],
            typeCC: [''],
            typeUser: ['3'],
            identificationcard: [''],
            email: [''],
            date: [''],
            idBusinessman: [`${this.idUser}`]
        });
    }

    cleanFormLegal() {
        this.formJuridica.value.city = '';
        this.formJuridica.value.date = '';
        this.formJuridica.value.department = '';
        this.formJuridica.value.email = '';
        this.formJuridica.value.entity = '';
        this.formJuridica.value.identificationcard = '';
        this.formJuridica.value.lastnames = '';
        this.formJuridica.value.name = '';
        this.formJuridica.value.numberNit = '';
        this.formJuridica.value.password = '';
        this.formJuridica.value.telephone = '';
        this.formJuridica.value.typeCC = '';
        this.formJuridica.value.typeUser = '';
    }

    cleanFormNatural() {
        this.formNatural.value.name = '';
        this.formNatural.value.lastnames = '';
        this.formNatural.value.telephone = '';
        this.formNatural.value.typeCC = '',
            this.formNatural.value.identificationcard = '';
        this.formNatural.value.email = '';
        this.formNatural.value.password = '';
        this.formNatural.value.department = '';
        this.formNatural.value.city = '';
        this.formNatural.value.date = '';
        this.formNatural.value.address = '';
        this.formNatural.value.typeUser = '';
    }

    createFormNatural() {
        this.formNatural = this.formbuilder.group({
            name: [''],
            lastnames: [''],
            telephone: [''],
            typeCC: [''],
            identificationcard: [''],
            email: [''],
            password: [''],
            department: [''],
            city: [''],
            date: [''],
            address: ['null'],
            typeUser: ['3'],
            idBusinessman: [`${this.idUser}`]
        });
    }


    onSubmitJuridico() {
        this.file = this.photo;
        this.message = '';
        this.formJuridica.value.date = this.fecha;
        if (this.formJuridica.value.entity !== '' && this.formJuridica.value.numberNit !== '' &&
            this.formJuridica.value.telephone !== '' && this.formJuridica.value.department !== '' &&
            this.formJuridica.value.city !== '' && this.formJuridica.value.name !== '' &&
            this.formJuridica.value.lastnames !== '' && this.formJuridica.value.typeCC !== '' &&
            this.formJuridica.value.identificationcard !== '' &&
            this.formJuridica.value.email !== '' && this.formJuridica.value.date !== '') {
            if (this.photo.length === 3) {
                this._userService.savePersonaJuridica([], this.file, this.formJuridica.value)
                    .then((data: any) => {
                        this.photo = [];
                        this.formLegal.nativeElement.reset();
                        this.cleanFormLegal();
                        this.message = data.answer;
                    }, err => {
                        this.message = err.answer;
                    });
            } else {
                this.message = 'Por favor carga las 3 fotos requeridas rut, camara y fotografia de la cedula.';
            }

        } else {
            this.message = 'Aun hay campos vacios';
        }
    }

    canceled() {

    }

// sision para cargar la cedula en foto de los mayoristas que se inscriben.
    onloadPhoto(photoCC: any, multiple: boolean) {
        if (multiple) {
            this.photo.push(<Array<File>>photoCC.target.files);
        }
        else {
            this.file = <Array<File>>photoCC.target.files;
        }
    }

    onSubmitNatural() {
        this.message = '';
        this.formNatural.value.date = this.fecha;
        if (this.formNatural.value.name !== '' && this.formNatural.value.lastnames !== '' &&
            this.formNatural.value.telephone !== '' && this.formNatural.value.typeCC !== '' &&
            this.formNatural.value.identificationcard !== '' && this.formNatural.value.department !== '' &&
            this.formNatural.value.email !== '' && this.formNatural.value.city !== '' && this.formNatural.value.date !== '') {

            this._userService.savePersonaNatural([], this.file, this.formNatural.value).then((data: any) => {
                this.formN.nativeElement.reset();
                this.cleanFormNatural();
                this.message = data.answer;
            }, err => {
                this.message = err.answer;
            });
        } else {
            this.message = 'Aun hay campos vacios';
        }

    }

}
