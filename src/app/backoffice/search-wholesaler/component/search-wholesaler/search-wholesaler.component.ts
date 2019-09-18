import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/users.services';
declare var $;

@Component({
    selector: 'app-search-wholesaler',
    templateUrl: './search-wholesaler.component.html',
    styleUrls: ['./search-wholesaler.component.css']
})
export class SearchWholesalerComponent implements OnInit {
    public buscar;
    public mayoristas: any[] = [];
    public purchaseWholiser: boolean;
    public idWholesaler: number;
    public searchComponent: boolean;
    public listOfPurchases: boolean;
    public btnBack: boolean;

    constructor(private _userServices: UserService) {
        this.purchaseWholiser = false;
        this.searchComponent = true;
        this.btnBack = false;
        this.listOfPurchases = false;
    }

    ngOnInit() {
        $('.collapsible').collapsible();
        localStorage.setItem('role', 'searchMayorista');
        this.getMayoristas();
    }

    getMayoristas() {
        this._userServices.allMayoristas().subscribe(data => {
            if (data.state) {
                for (const i of data.answer) {
                    this.mayoristas.push({
                        idMayorista: i.identity.low,
                        name: i.properties.name,
                        lasnames: i.properties.lastnames,
                        identificationcard: i.properties.identificationcard,
                        email: i.properties.email,
                        telephone: i.properties.telephone
                    });
                }
            }
        });
    }

    openPurchases(id) {
        this.idWholesaler = id;
        this.searchComponent = false;
        this.purchaseWholiser = true;
        this.btnBack = true;
    }

    back() {
        this.searchComponent = true;
        this.purchaseWholiser = false;
        this.btnBack = false;
    }

    openHistory(id) {
        this.idWholesaler = id;
        this.searchComponent = false;
        this.purchaseWholiser = false;
        this.listOfPurchases = true;
    }
}
