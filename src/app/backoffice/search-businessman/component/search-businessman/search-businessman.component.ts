import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/users.services';
declare var $;

@Component({
    selector: 'app-search-businessman',
    templateUrl: './search-businessman.component.html',
    styleUrls: ['./search-businessman.component.css']
})
export class SearchBusinessmanComponent implements OnInit {

    public buscar;
    public usuarios: any[] = [];
    private tope;

    constructor(private _userServices: UserService) {
        this.tope = 17;
    }

    ngOnInit() {
        $('.collapsible').collapsible();
        localStorage.setItem('role', 'searchBusinessman');
        this.getBusinessman();
    }

    onScroll() {
        this.getBusinessman();
    }

    getBusinessman() {
        this._userServices.allUser(this.tope).subscribe(data => {
            this.usuarios = [];
            if (data.state) {
                for (let i = 0; i < (data.answer.length > this.tope ? this.tope : data.answer.length); i++) {
                    this.usuarios.push({
                        idBusinessman: data.answer[i].identity.low,
                        name: data.answer[i].properties.name,
                        lasname1: data.answer[i].properties.lastname1,
                        lasname2: data.answer[i].properties.lastname2,
                        usuario: data.answer[i].properties.usuario,
                        identificationcard: data.answer[i].properties.identificationcard,
                        email: data.answer[i].properties.email,
                        telephone: data.answer[i].properties.telephone
                    });
                }
                this.tope += 37;
            }
        });
    }

}
