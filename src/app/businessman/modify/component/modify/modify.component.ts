import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-modify',
    templateUrl: './modify.component.html',
    styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {

    public user;

    constructor(private router: Router) {}

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user')).usuario.properties;
    }
// pendiente la parametrización de los form con Router.
    modifyUser() {
        localStorage.setItem('typeModify', 'user');
    }

    modifyAddress() {
        localStorage.setItem('typeModify', 'address');
    }

    modifyEmail() {
        localStorage.setItem('typeModify', 'email');
    }

    modifyPassword() {
        localStorage.setItem('typeModify', 'password');
    }

    modifyTelephone() {
        localStorage.setItem('typeModify', 'telephone');
    }

}
