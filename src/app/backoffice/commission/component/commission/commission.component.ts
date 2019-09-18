import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ComisionesServices} from '../../../../services/comisiones.services';
import {getNameRank, getPointsRank} from '../../../../global/funcions';

declare var $;

@Component({
    selector: 'app-commission',
    templateUrl: './commission.component.html',
    styleUrls: ['./commission.component.css']
})
export class CommissionComponent implements OnInit {

    public message: string;
    public enableComision = false;
    public enableReport = true;
    private date;
    public quincenas = [];
    public rangoPuntos = [];
    public totalIngreso = 0;
    public totalRetefuente = 0;
    public totalIca = 0;
    public totalPagado = 0;
    public totalQuincena = 0;
    public operacion = 0;
    public valorPunto: number;

    constructor(private _comisionServices: ComisionesServices, private router: Router) {
    }

    ngOnInit() {
        $('.collapsible').collapsible();
        localStorage.setItem('role', 'calculate');
        this.date = new Date();
        this.date = String(this.date.getFullYear()) + String(this.date.getMonth() + 1) +
            String(this.date.getDate() < 10 ? '0' + this.date.getDate() : this.date.getDate());
        this.viewReport();
    }

    calculate() {

        this.message = '';
        this.quincenas = [];
        this.enableComision = true;
        this._comisionServices.calculateAllComision().subscribe(data => {
            if (data.state) {
                this.enableComision = true;
                this.enableReport = false;
            } else {
                this.message = 'La comision a fallado, por favor vuelve a intentarlo';
            }

        });

    }

    seeReport() {

        this.quincenas = [];
        this.totalIngreso = 0;
        this.totalQuincena = 0;
        this.totalPagado = 0;
        this.totalIca = 0;
        this.operacion = 0;
        this.totalRetefuente = 0;

        this._comisionServices.getAllComisiones(this.date)
            .then((quincena: any) => {
                this.valorPunto = quincena.reporte[0].quincena.valorPunto;
                for (const i of quincena.reporte) {
                    i.quincena.idRango = getNameRank(i.quincena.idRango);
                    this.quincenas.push(i);
                    this.totalRetefuente = this.totalRetefuente + i.quincena.retefuente;
                    this.totalIca = this.totalIca + i.quincena.ica;
                    this.totalPagado = this.totalPagado + i.quincena.totaliquidado;
                    this.totalQuincena = this.totalQuincena + i.quincena.totalQuincena;
                    this.operacion = this.operacion + (i.quincena.totalQuincena / i.quincena.ingreso) * 100;
                    if (i.quincena.puntosBrazoDer < i.quincena.puntosBrazoIzq) {
                        this.totalIngreso = this.totalIngreso + i.quincena.puntosBrazoDer;
                    } else {
                        this.totalIngreso = this.totalIngreso + i.quincena.puntosBrazoIzq;
                    }
                }
            });
    }

    viewReport() {
        this._comisionServices.getAllComisiones(this.date)
            .then((quincena: any) => {

                if (quincena.state) {
                    this.enableComision = true;
                    this.enableReport = false;
                }

            });
    }

    getPointsRank(idrank) {

        switch (idrank) {
            case 'Ejecutivo':
                return 360;
                break;
            case 'Experimentado':
                return 720;
                break;
            case 'Senior':
                return 1500;
                break;
            case 'Bronce':
                return 3000;
                break;
            case 'Plata':
                return 6000;
                break;
            case 'Oro':
                return 12000;
                break;
            case 'Rubi':
                return 30000;
                break;
            case 'Esmeralda':
                return 60000;
                break;
            case 'Diamante':
                return 120000;
                break;
            case 'Doble Diamante':
                return 250000;
                break;
            case 'Vicepresidente':
                return 500000;
                break;
            case 'Presidente':
                return 1000000;
                break;
            default:
                return 'Sin rango';
        }
    }

}

