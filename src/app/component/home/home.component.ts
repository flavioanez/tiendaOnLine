import { Component, OnInit } from '@angular/core';
import { RouterState, ActivatedRoute, Router } from '@angular/router';
declare var $;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor() {}

    ngOnInit() {
        $('.parallax').parallax();
        localStorage.setItem('role', 'home');
    }
}
