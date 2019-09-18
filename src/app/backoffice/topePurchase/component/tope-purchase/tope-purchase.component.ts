import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StoreService } from '../../../../services/store.services';
declare var $;

@Component({
    selector: 'app-tope-purchase',
    templateUrl: './tope-purchase.component.html',
    styleUrls: ['./tope-purchase.component.css']
})
export class TopePurchaseComponent implements OnInit {
    date;
    hour;
    message;
    public formTope: FormGroup;

    constructor(private router: Router, private formBuilder: FormBuilder, private _storeServices: StoreService) {
    }

    ngOnInit() {
        $('.collapsible').collapsible();
        localStorage.setItem('role', 'topeCompras');
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
        $('.timepicker').timepicker();
        this.createForm();
    }

    createForm(){
        this.formTope = this.formBuilder.group({
            valuepurchase:[''],
            date: [''],
            hour: ['']
        })
    }

    getTime(hora){
        this.hour = hora.target.value;
    }

    getDate(date){
        this.date = date.target.value;
    }

    sendtope(){
        this.message = '';
        this.formTope.value.date = this.date;
        this.formTope.value.hour = this.hour;
        if(this.formTope.value.valuepurchase !="" && this.formTope.value.date !="" && this.formTope.value.hour !="") {
            return this._storeServices.sendTopePurchase(this.formTope.value)
                .subscribe((data: any) => {
                    this.message = data.answer;
                }, err => {
                    this.message = err.answer;
                });
        }
        this.message = 'Aun hay campos vacios';
    }

}
