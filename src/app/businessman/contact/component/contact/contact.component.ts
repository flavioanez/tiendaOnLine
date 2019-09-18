import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

declare var $;

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

    formContacto: FormGroup;

    public message;
    private interruptor = 'off';

    constructor(private router: Router,
                private formbuilder: FormBuilder) {
    }

    ngOnInit() {
        $('.parallax').parallax();
        this.createForm();
    }

    createForm() {
        this.formContacto = this.formbuilder.group({
            name: [''],
            email: [''],
            affair: [''],
            message: ['']
        });
    }

    sendContact() {
        if (this.formContacto.value.name !== '' && this.formContacto.value.email !== '' &&
            this.formContacto.value.affair !== '' && this.formContacto.value.message !== '') {
            console.log(this.formContacto.value);
            this.message = 'Sugerencia recibida correctamente, gracias por tiempo...';
        } else {
            this.message = 'Hay campos vacios';
        }
    }

    openContact() {

        switch (this.interruptor) {
            case 'off':
                this.mostrarMenu();
                break;
            case 'on':
                this.esconderMenu();
                break;
            default:
                console.log('Interruptor incorrecto');
        }

    }

    mostrarMenu() {
        $('#conoceme-seccion').removeClass('animated bounceOutRight');
        $('#conoceme-seccion').addClass('animated bounceInRight');
        $('#conoceme-seccion').css('display', 'block');
        this.interruptor = 'on';
        // console.log('Motrar el menu');
    }

    esconderMenu() {
        $('#conoceme-seccion').removeClass('animated bounceInRight');
        $('#conoceme-seccion').addClass('animated bounceOutRight');
        $('#conoceme-seccion').css('display', 'none');
        this.interruptor = 'off';
    }

}
