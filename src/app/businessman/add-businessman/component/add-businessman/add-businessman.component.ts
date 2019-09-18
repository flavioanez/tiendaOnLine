import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../../../services/users.services';
declare var $;

@Component({
    selector: 'app-add-businessman',
    templateUrl: './add-businessman.component.html',
    styleUrls: ['./add-businessman.component.css']
})
export class AddBusinessmanComponent implements OnInit {
    title = 'Agregar mi empresario';
    formBusinessman: FormGroup;

    public message: string;
    public buttons = false;
    public date;
    private idUser;
    fulanos: any[] = [];

    constructor(public formulario: FormBuilder,
                private _businessmanServices: UserService) {
    }

    ngOnInit() {
        this.loadFulanos();
        $('.slider').slider({indicators: false, height: 200});
        // plugin
        this.idUser = JSON.parse(localStorage.getItem('user')).usuario.identity.low;
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

    createForm() {
        this.formBusinessman = this.formulario.group({
            email: ['', Validators.required],
            user: ['', Validators.required],
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
            typeUser: ['2'],
            url: ['image-small.jpg'],
            points: [0],
            nit: [0],
            dv: [0],
            insideBranch: ['', Validators.required],
            identificationcardReferred: ['', Validators.required],
            address: ['', Validators.required],
            validateCount: ['', Validators.required],
            terms: ['', Validators.required],
            idUser: [this.idUser]
        });
    }

    getDate(fecha) {
        this.date = fecha.target.value;
    }

    onSubmit() {
        this.message = '';
        this.formBusinessman.value.date = this.date;
        if (this.formBusinessman.value.email !== '' &&
            this.formBusinessman.value.name !== '' &&
            this.formBusinessman.value.user &&
            this.formBusinessman.value.password &&
            this.formBusinessman.value.lastname1 !== '' &&
            this.formBusinessman.value.lastname2 !== '' &&
            this.formBusinessman.value.typeCC !== '' &&
            this.formBusinessman.value.identificationcard !== '' &&
            this.formBusinessman.value.date !== '' &&
            this.formBusinessman.value.department !== '' &&
            this.formBusinessman.value.city !== '' &&
            this.formBusinessman.value.telephone !== '' &&
            this.formBusinessman.value.address !== '' &&
            this.formBusinessman.value.validateCount !== '' &&
            this.formBusinessman.value.insideBranch !== '' &&
            this.formBusinessman.value.gender !== '') {

            if (this.formBusinessman.value.terms) {
                this.buttons = true;
                setTimeout(() => {
                    this.buttons = false;
                }, 4000);
                this._businessmanServices.businessmanServices(this.formBusinessman.value).then((data: any) => {
                    console.log(data);
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

    /*
      // funcion onsubmit para pruebas.
          onSubmit() {

              const stop = 7077;
              let i = 1;
              const timer = setInterval(() => {

                  if (i < stop) {
                  this.message = '';
                  this.formBusinessman.value.date = this.fulanos[i].date;
                  this.formBusinessman.value.email = this.fulanos[i].email;
                  this.formBusinessman.value.name = this.fulanos[i].name;
                  this.formBusinessman.value.user = this.fulanos[i].usuario;
                  this.formBusinessman.value.password = this.fulanos[i].password;
                  this.formBusinessman.value.lastname1 = this.fulanos[i].lastname1;
                  this.formBusinessman.value.lastname2 = this.fulanos[i].lastname2;
                  this.formBusinessman.value.typeCC = this.fulanos[i].typeCC;
                  this.formBusinessman.value.identificationcard = this.fulanos[i].identificationcard;
                  this.formBusinessman.value.department = 'Atlantico';
                  this.formBusinessman.value.city = 'Barranquilla';
                  this.formBusinessman.value.telephone = this.fulanos[i].telephone;
                  this.formBusinessman.value.address = 'Carrera 7 N° 7-77';
                  this.formBusinessman.value.validateCount = 'email';
                  this.formBusinessman.value.gender = 'Masculino';
                  this.formBusinessman.value.terms = true;
                  this.formBusinessman.value.insideBranch = 'LEFT';
                  this.formBusinessman.value.identificationcardReferred = '';

                      this._businessmanServices.businessmanServices(this.formBusinessman.value).then((data: any) => {
                          this.message = data.answer;
                      });

                      console.log(`ciclo-${i}`);
                      i++;
                  } else {
                      console.log('setInterval desactivado');
                      clearInterval(timer);
                  }

              }, 1777);
          }
    */
    codeGenerate() {
        const caracteres = 'abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789';
        let code = null;
        for (let i = 0; i < 20; i++) {
            code += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return code;
    }

    loadFulanos() {

        for (let i = 7778; i < 14777; i++) {
            this.fulanos.push({
                email: `email-fulano${i}`,
                usuario: `usuario-fulano${i}`,
                password: `55753500lj`,
                gender: `genero-m--fulano${i}`,
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
                typeUser: '2',
                url: 'image-small.jpg',
                points: 0,
                nit: 0,
                dv: 0,
                terms: true
            });
        }
    }

}
