import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

declare var $;

@Component({
    selector: 'app-tabla',
    templateUrl: './tabla.component.html',
    styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

    public visor: boolean;
    public listConsolidatedOnly: boolean;
    public listConsolidated: boolean;
    public commission: boolean;
    public historyCommission: boolean;
    public searchWholesaler: boolean;
    public searchBusinessman: boolean;
    public createCategory: boolean;
    public createProduct: boolean;
    public editProduct: boolean;
    public tope: boolean;
    public passwordGeneral: boolean;

    constructor(private router: Router) {
        this.visor = true;
        this.listConsolidatedOnly = false;
        this.listConsolidated = false;
        this.commission = false;
        this.historyCommission = false;
        this.searchWholesaler = false;
        this.searchBusinessman = false;
        this.createCategory = false;
        this.createProduct = false;
        this.editProduct = false;
        this.tope = false;
        this.passwordGeneral = false;
    }

    ngOnInit() {
        localStorage.setItem('role', 'backoffice');
        $('.collapsible').collapsible();
    }

    closeSesion() {
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        this.router.navigate((['/']));
    }

    open(option: string) {

        switch (option) {
            case 'list-only':
                this.listConsolidatedOnly = true;
                this.visor = false;
                this.listConsolidated = false;
                this.commission = false;
                this.historyCommission = false;
                this.searchWholesaler = false;
                this.searchBusinessman = false;
                this.createCategory = false;
                this.createProduct = false;
                this.editProduct = false;
                this.tope = false;
                this.passwordGeneral = false;
                break;
            case 'home':
                this.listConsolidatedOnly = false;
                this.visor = true;
                this.listConsolidated = false;
                this.commission = false;
                this.historyCommission = false;
                this.searchWholesaler = false;
                this.searchBusinessman = false;
                this.createCategory = false;
                this.createProduct = false;
                this.editProduct = false;
                this.tope = false;
                this.passwordGeneral = false;
                break;
            case 'all-list':
                this.listConsolidatedOnly = false;
                this.visor = false;
                this.listConsolidated = true;
                this.commission = false;
                this.historyCommission = false;
                this.searchWholesaler = false;
                this.searchBusinessman = false;
                this.createCategory = false;
                this.createProduct = false;
                this.editProduct = false;
                this.tope = false;
                this.passwordGeneral = false;
                break;
            case 'commission':
                this.commission = true;
                this.listConsolidatedOnly = false;
                this.visor = false;
                this.listConsolidated = false;
                this.historyCommission = false;
                this.searchWholesaler = false;
                this.searchBusinessman = false;
                this.createCategory = false;
                this.createProduct = false;
                this.editProduct = false;
                this.tope = false;
                this.passwordGeneral = false;
                break;
            case 'history-commission':
                this.historyCommission = true;
                this.listConsolidatedOnly = false;
                this.visor = false;
                this.listConsolidated = false;
                this.commission = false;
                this.searchWholesaler = false;
                this.searchBusinessman = false;
                this.createCategory = false;
                this.createProduct = false;
                this.editProduct = false;
                this.tope = false;
                this.passwordGeneral = false;
                break;
            case 'search-wholesaler':
                this.searchWholesaler = true;
                this.historyCommission = false;
                this.listConsolidatedOnly = false;
                this.visor = false;
                this.listConsolidated = false;
                this.commission = false;
                this.searchBusinessman = false;
                this.createCategory = false;
                this.createProduct = false;
                this.editProduct = false;
                this.tope = false;
                this.passwordGeneral = false;
                break;
            case 'businessman':
                this.searchBusinessman = true;
                this.searchWholesaler = false;
                this.historyCommission = false;
                this.listConsolidatedOnly = false;
                this.visor = false;
                this.listConsolidated = false;
                this.commission = false;
                this.createCategory = false;
                this.createProduct = false;
                this.editProduct = false;
                this.tope = false;
                this.passwordGeneral = false;
                break;
            case 'create-category':
                this.createCategory = true;
                this.searchBusinessman = false;
                this.searchWholesaler = false;
                this.historyCommission = false;
                this.listConsolidatedOnly = false;
                this.visor = false;
                this.listConsolidated = false;
                this.commission = false;
                this.createProduct = false;
                this.editProduct = false;
                this.tope = false;
                this.passwordGeneral = false;
                break;
            case 'create-product':
                this.createProduct = true;
                this.createCategory = false;
                this.searchBusinessman = false;
                this.searchWholesaler = false;
                this.historyCommission = false;
                this.listConsolidatedOnly = false;
                this.visor = false;
                this.listConsolidated = false;
                this.commission = false;
                this.editProduct = false;
                this.tope = false;
                this.passwordGeneral = false;
                break;
            case 'edit-product':
                this.editProduct = true;
                this.createProduct = false;
                this.createCategory = false;
                this.searchBusinessman = false;
                this.searchWholesaler = false;
                this.historyCommission = false;
                this.listConsolidatedOnly = false;
                this.visor = false;
                this.listConsolidated = false;
                this.commission = false;
                this.tope = false;
                this.passwordGeneral = false;
                break;
            case 'tope':
                this.tope = true;
                this.editProduct = false;
                this.createProduct = false;
                this.createCategory = false;
                this.searchBusinessman = false;
                this.searchWholesaler = false;
                this.historyCommission = false;
                this.listConsolidatedOnly = false;
                this.visor = false;
                this.listConsolidated = false;
                this.commission = false;
                this.passwordGeneral = false;
                break;
            case 'password-general':
                this.passwordGeneral = true;
                this.tope = false;
                this.editProduct = false;
                this.createProduct = false;
                this.createCategory = false;
                this.searchBusinessman = false;
                this.searchWholesaler = false;
                this.historyCommission = false;
                this.listConsolidatedOnly = false;
                this.visor = false;
                this.listConsolidated = false;
                this.commission = false;
                break;
            default:
                console.log('Opción incorrecta');
        }
    }

}
