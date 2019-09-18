import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BackOfficeReportServices} from '../../../../services/backoffice.services';
import {UserService} from '../../../../services/users.services';
import {SocketServices} from '../../../../services/socket.services';

declare var $;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    public message: string;
    public quantitypurchase;
    public totalpurchase;
    public userQuantity;
    public mayoristasQuantity;
    public invitedQuantity;
    public quantitypurchasedeuda = 0;
    public totalpurchasedeuda = 0;
    public quantitypurchasdelete = 0;
    public totalpurchasdelete = 0;
    public totalinvoicesconfirmed;
    public totalinvoicesdeuda;
    public totalinvoicesdelete;
    public fortnight: any[] = [];
    public operation: any;
    public liquidated: number;
    public points: number;
    public valuePoints;
    public user: any;

    constructor(private router: Router,
                private _userServices: UserService,
                private _socket: SocketServices,
                private _backofficeServices: BackOfficeReportServices) {
        this.operation = 0;
        this.liquidated = 0;
    }

    ngOnInit() {
        localStorage.setItem('role', 'backoffice');
        $('.collapsible').collapsible();
        this._socket.connect();
        this.userConnect();
        this._socket.disconnect();
        this.getTotalCompras('paidOut');
        // this.getTotalCompras('deuda');
        // this.getTotalCompras('delete');
        this.getAllUser();
        this.getMayoristas();
        this.getInvited();
        this.getCurrentFortnight();
        this.totalPoints();
    }

    userConnect() {
        this._socket.userConnect().subscribe((data: any) => {
            const user = {
                idConnect: data.idConnect,
                idUser: JSON.parse(localStorage.getItem('user')).usuario.identity.low
            };
            this._userServices.saveUserConnect(user).then(dataDb => {
                this.user = dataDb;
            });
        });
    }

    getTotalCompras(state) {
        switch (state) {
            case 'paidOut':
                this.totalpurchase = 0;
                this.totalinvoicesconfirmed = 0;
                this._socket.totalPurchases('totalPurchasePaid').subscribe((data: any) => {
                    console.log(data);
                    if (data.state) {
                        this.totalpurchase = data.total;
                    }
                });

                this._socket.amountOfInvoices('amountOfPaidInvoices').subscribe((data: any) => {
                    console.log(data);
                    if (data.state) {
                        this.totalinvoicesconfirmed = data.count.low;
                    }
                });


                break;
            case 'deuda':
                this.quantitypurchasedeuda = 0;
                this.totalpurchasedeuda = 0;
                this.totalinvoicesdeuda = 0;
                this._backofficeServices.getAllTotalPurchase(state).then((data: any) => {
                    if (data.state) {
                        this.totalpurchasedeuda = data.total;
                    }
                });
                this._backofficeServices.countInvoices(state).then((data: any) => {
                    if (data.state) {
                        this.totalinvoicesdeuda = data.count.low;
                    }
                });
                break;
            case 'delete':
                this.totalinvoicesdelete = 0;
                this.quantitypurchasdelete = 0;
                this.totalpurchasdelete = 0;
                this._backofficeServices.getAllTotalPurchase(state).then((data: any) => {
                    if (data.state) {
                        this.totalpurchasdelete = data.total;
                    }
                });
                this._backofficeServices.countInvoices(state).then((data: any) => {
                    if (data.state) {
                        this.totalinvoicesdelete = data.count.low;
                    }
                });
                break;
            default:
        }

    }


    getAllUser() {
        this.userQuantity = 0;
        this._userServices.totalUser().subscribe(data => {
            if (data.state) {
                this.userQuantity = data.answer.low;
            }
        }, err => {

        });
    }

    getMayoristas() {
        this.mayoristasQuantity = 0;
        this._userServices.totalMayoristas().subscribe(data => {
            if (data.state) {
                this.mayoristasQuantity = data.answer.low;
            }
        });
    }

    getInvited() {
        this.invitedQuantity = 0;
        this._userServices.totalInvited().subscribe(data => {
            if (data.state) {
                this.invitedQuantity = data.answer.low;
            }
        });
    }

    getCurrentFortnight() {
        this._backofficeServices.currentFortnight().subscribe((data: any) => {
            this.fortnight = [];
            if (data.state) {
                for (const i of data.data) {
                    this.fortnight.push(i);
                    this.operation = this.operation + (i.totalFortnight / i.entry) * 100;
                    this.liquidated = this.liquidated + parseInt(i.totalLiquidated);
                    this.valuePoints = i.valuePoints;
                }
            }
        });
    }

    totalPoints() {
        this._backofficeServices.getTotalPoints().subscribe(data => {
            this.points = data.points.low;
        });
    }
}
