import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $;

@Component({
    selector: 'app-header-office',
    templateUrl: './header-office.component.html',
    styleUrls: ['./header-office.component.css']
})
export class HeaderOfficeComponent implements OnInit {

    public interruptor = 'off';
    public interruptorDoc = 'off';
    public interruptorperf = 'off';
    public user;

    constructor(private router: Router) {}

    ngOnInit() {
        $('.sidenav').sidenav();
        this.user = JSON.parse(localStorage.getItem('user')).usuario.properties;
    }

    modifyphoto() {
        localStorage.setItem('typeModify', 'photo');
    }

    options() {

        switch (this.interruptor) {
            case 'off':
                this.mostrarMenu();
                break;
            case 'on':
                this.esconderMenu();
                break;
            default:
            // console.log('Interruptor incorrecto');
        }

    }

    optionStore() {

        localStorage.setItem('role', 'store');
        switch (this.interruptor) {
            case 'off':
                this.mostrarMenu();
                break;
            case 'on':
                this.esconderMenu();
                break;
            default:
            // console.log('Interruptor incorrecto');
        }

    }

    optionsPerfil() {

        switch (this.interruptorperf) {
            case 'off':
                this.mostrarMenuPerfil();
                break;
            case 'on':
                this.esconderMenuPerfil();
                break;
            default:
            // console.log('Interruptor incorrecto');
        }

    }

    mostrarMenu() {
        $('#options').removeClass('bounceOutRight');
        $('#options').addClass('animated bounceInRight');
        $('#options').css('display', 'block');
        this.interruptor = 'on';
        // console.log('Motrar el menu');
    }

    mostrarMenuPerfil() {
        $('#perfil-panel').removeClass('animated bounceOutRight');
        $('#perfil-panel').addClass('animated bounceInRight');
        $('#perfil-panel').css('display', 'block');
        this.interruptorperf = 'on';
        // console.log('Motrar el menu');
    }

    esconderMenu() {
        $('#options').removeClass('animated bounceInRight');
        $('#options').addClass('animated bounceOutRight');
        this.interruptor = 'off';
    }

    esconderMenuPerfil() {
        $('#perfil-panel').removeClass('animated bounceInRight');
        $('#perfil-panel').addClass('animated bounceOutRight');
        this.interruptorperf = 'off';
    }

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// documentos:::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    docs() {

        switch (this.interruptorDoc) {
            case 'off':
                this.mostrarDocs();
                break;
            case 'on':
                this.esconderDocs();
                break;
            default:
            // console.log('Interruptor incorrecto');
        }

    }

    mostrarDocs() {
        $('#docs').removeClass('bounceOutRight');
        $('#docs').addClass('animated bounceInRight');
        $('#docs').css('display', 'block');
        this.interruptorDoc = 'on';
        // console.log('Motrar el menu');
    }

    esconderDocs() {
        $('#docs').removeClass('bounceInRight');
        $('#docs').addClass('animated bounceOutRight');
        this.interruptorDoc = 'off';
    }
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// documentos:::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    closeSesion() {
        localStorage.removeItem('user');
        localStorage.removeItem('role');

        this.router.navigate((['/']));
    }

}


