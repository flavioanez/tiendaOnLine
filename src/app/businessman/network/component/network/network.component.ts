import {Component, ViewChild, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NetworkService} from '../../../../services/network.services';
import {ElementRef} from '@angular/core';
declare var vis: any;

@Component({
    selector: 'app-network',
    templateUrl: './network.component.html',
    styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

    @ViewChild('arbol') arbol: ElementRef;

    title = 'Network';
    public message: string;
    public netWork: any;

    constructor(private _networkServices: NetworkService,
                private router: Router) {

    }

    ngOnInit() {
        this.getDatos();
    }

    getDatos() {

        const user = JSON.parse(localStorage.getItem('user'));
        let idUser = user.usuario.identity.low;

        if (idUser === 'undefined') {
            idUser = null;
        }

        this._networkServices.networkServices(idUser).then((data: any) => {
            this.dibujarArbol(data.arbolGlobal);
        });
        // dibujarArbol(arbol);

    }

    dibujarArbol(arbolGlobal) {
        const container = this.arbol.nativeElement;
        const options = {

            nodes: {
                // borderWidth:4,
                size: 40,
                color: {
                    background: '#757575',
                    border: '#f44336'
                },
                font: {
                    color: '#000000',
                    align: 'center',
                    size: 11,
                    background: '#F5F5F5',
                },
            },
            layout: {
                hierarchical: {
                    direction: 'UD',
                },
                improvedLayout: true
            },
            physics: {
                enabled: true,
                barnesHut: {
                    gravitationalConstant: -2000,
                    centralGravity: 0.3,
                    springLength: 95,
                    springConstant: 0.04,
                    damping: 0.09,
                    avoidOverlap: 0
                },
                forceAtlas2Based: {
                    gravitationalConstant: -50,
                    centralGravity: 0.01,
                    springConstant: 0.08,
                    springLength: 100,
                    damping: 0.4,
                    avoidOverlap: 0
                },
                repulsion: {
                    centralGravity: 0.2,
                    springLength: 200,
                    springConstant: 0.05,
                    nodeDistance: 100,
                    damping: 0.09
                },
                hierarchicalRepulsion: {
                    centralGravity: 0.0,
                    springLength: 100,
                    springConstant: 0.01,
                    nodeDistance: 120,
                    damping: 0.09
                },
                maxVelocity: 50,
                minVelocity: 0.1,
                solver: 'barnesHut',
                stabilization: {
                    enabled: true,
                    iterations: 1000,
                    updateInterval: 100,
                    onlyDynamicEdges: false,
                    fit: true
                },
                timestep: 0.5,
                adaptiveTimestep: true
            },
            edges: {
                color: {color: '#B71C1C', highlight: '#f4511e'}
            }
        };

        this.netWork = new vis.Network(container, arbolGlobal, options);
        this.netWork.focus(530, {scale: 11});

    }

}
