import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StoreService} from '../../../../services/store.services';

declare var $;

@Component({
    selector: 'app-search-product',
    templateUrl: './search-product.component.html',
    styleUrls: ['./search-product.component.css']
})

export class SearchProductComponent implements OnInit {

    public products: any[] = [];
    quantity = new Array();
    public buscar: string;
    public code: string;
    public searchProduct: boolean;
    public editarProduct: boolean;

    constructor(private router: Router, public _storeService: StoreService) {
        this.searchProduct = true;
        this.editarProduct = false;
    }

    ngOnInit() {
        $('.collapsible').collapsible();
        localStorage.setItem('role', 'listOfProdutcs');
        this.getProductos();
    }

    getProductos() {
        this._storeService.getProduct().subscribe((data) => {
            this.products = [];
            for (let i = 0; i < data.products.length; i++) {
                this.products.push(data.products[i].properties);
            }
        });
    }

    editProduct(code: any) {
        this.code = code;
        this.searchProduct = false;
        this.editarProduct = true;
    }



}