import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BackOfficeReportServices} from '../../../../services/backoffice.services';
declare var $;

@Component({
    selector: 'app-history-commission',
    templateUrl: './history-commission.component.html',
    styleUrls: ['./history-commission.component.css']
})
export class HistoryCommissionComponent implements OnInit {

    private date: any = {};
    public comision: any[] = [];
    public message: string;
    public listQuincena: any = {};

    constructor(private router: Router, private _backofficeServices: BackOfficeReportServices) {}

    ngOnInit() {
        $('.collapsible').collapsible();
        // plugin
        $('.datepicker').datepicker({
            format: 'yyyy' + 'm' + 'dd',
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

    getDateBehin(ini) {
        this.date.inicio = ini.target.value;
    }

    getDateEnd(end) {
        this.date.final = end.target.value;
    }

    searchComision() {
        this.message = '';
        this.comision = [];
        this._backofficeServices.getAllComisiones(this.date)
            .then((data: any) => {
                if (data.state) {
                    this.listQuincena.totalquincena = data.comision.length;
                    for (const i of data.comision) {
                        this.comision.push(i);
                    }
                } else {
                    this.comision = [];
                    this.message = data.answer;
                }
            }, err => {
                this.message = err.answer;
            });
    }


}

