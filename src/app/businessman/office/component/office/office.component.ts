import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../../../services/users.services';
import {ComisionesServices} from '../../../../services/comisiones.services';
declare var $;

@Component({
    selector: 'app-office',
    templateUrl: './office.component.html',
    styleUrls: ['./office.component.css']
})

export class OfficeComponent implements OnInit {

    public user;
    public quantityMayorista;
    public message;
    public nameRank: string;
    public totalPago: number;
    public totalPoints: number;
    public totalNetwork: number;
    public totalDirect: number;
    public branchDebil: string;
    public bonomultilevel: number;
    public myPoints: number;



    public comisionOff: boolean;
    public sesion: boolean;

    constructor(private router: Router,
                private _comisiones: ComisionesServices,
                private _rutaActiva: ActivatedRoute,
                private _userServices: UserService) {
        this.quantityMayorista = 0;
    }

    ngOnInit() {
        localStorage.setItem('role', 'businnessman');
        this.user = JSON.parse(localStorage.getItem('user')).usuario;
        this.getSesion();
        this.getUserMayorista(this.user.identity.low);
        this.getIdComision(this.user.identity.low);
    }

    getSesion() {
        this._rutaActiva.params.subscribe((param: Params) => {
            this.sesion = param.businessman;
        });
    }

    getUserMayorista(id) {
        this._userServices.getMayositaId(id)
            .subscribe(data => {
                if (data.state) {
                    this.quantityMayorista = data.answer.length;
                } else {
                    this.quantityMayorista = 0;
                }
            }, err => {
                this.quantityMayorista = 0;
            });
    }

    getIdComision(id) {
        this._comisiones.getComisionId(id).then((data: any) => {
            if (data.state) {
                const comision = data.answer.properties;
                this.nameRank = this.getNameRank(comision.idRango);
                this.totalPago = comision.totaliquidado;
                this.totalPoints = comision.puntosTotales;
                this.bonomultilevel = comision.bonoEquipo;
                this.totalDirect = data.netWorkDirect;
                this.totalNetwork = data.totalNetwork;
                this.branchDebil = comision.brazoDebil;
                this.myPoints = data.myPoints;
                this.comisionOff = false;
            } else {
                // console.log(data.answer);
                this.nameRank = 'Sin rango';
                this.totalPago = 0;
                this.totalPoints = data.myPoints;
                this.bonomultilevel = 0;
                this.totalDirect = data.netWorkDirect;
                this.totalNetwork = data.totalNetwork;
                this.branchDebil = '0';
                this.myPoints = data.myPoints;
                this.comisionOff = true;
            }
        }, err => {
            const failed = err.error;
        });
    }

    getNameRank(idrank) {

        switch (idrank) {
            case 1:
                return 'Ejecutivo';
                break;
            case 2:
                return 'Experimentado';
                break;
            case 3:
                return 'Senior';
                break;
            case 4:
                return 'Bronce';
                break;
            case 5:
                return 'Plata';
                break;
            case 6:
                return 'Oro';
                break;
            case 7:
                return 'Rubi';
                break;
            case 8:
                return 'Esmeralda';
                break;
            case 9:
                return 'Diamante';
                break;
            case 10:
                return 'Doble Diamante';
                break;
            case 11:
                return 'Vicepresidente';
                break;
            case 12:
                return 'Presidente';
                break;
            default:
                return 'Sin rango';
        }
    }

}
