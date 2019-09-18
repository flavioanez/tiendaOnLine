import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/users.services';
import {ExportDocumentService} from '../../../../services/exportDocument';

declare var $;
declare var dt;

@Component({
    selector: 'app-my-subtree',
    templateUrl: './my-subtree.component.html',
    styleUrls: ['./my-subtree.component.css']
})
export class MySubtreeComponent implements OnInit {
    private user;
    public myUsers = [];
    public message;
    private tope;
    private date;

    constructor(private _excelService: ExportDocumentService, private _userServices: UserService) {
        this.user = JSON.parse(localStorage.getItem('user')).usuario;
        this.tope = 27;
        this.date = new Date();
    }

    ngOnInit() {
        this.myListUsers();
    }

    onScroll() {
        this.myListUsers();
    }

    myListUsers() {
        this._userServices.listUsers(this.user.identity.low, this.tope).subscribe(data => {
            if (data.state) {
                let cont = 1;
                this.myUsers = [];
                for (let i = 0; i < (data.list.length > this.tope ? this.tope : data.list.length); i++) {
                    this.myUsers.push({
                        id: cont++,
                        Nombre: data.list[i].name,
                        Cedula: data.list[i].identificationcard,
                        Telefono: data.list[i].telephone,
                        Correo: data.list[i].email,
                        Direccion: data.list[i].address
                    });
                }
                this.tope += 7;
            } else {
                this.myUsers = [];
                this.message = 'Lista vacia';
            }
        }, err => {
            console.log(err);
        });
    }

    exportAsXLSX(): void {
        this._excelService.exportAsExcelFile(this.myUsers, 'Lista ' +
            this.date.getDate() + '/' + this.date.getMonth() + '/' + this.date.getFullYear());
    }

}
