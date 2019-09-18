// modulos.
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from './header/header.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';

// componentes.
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
// Servicios.
import { StoreService } from './services/store.services';
import { StoreInvitedService } from './services/storeInvited.services';
import { InvoicesServices } from './services/invoices.services';
import { ProductService } from './services/product.services';
import { UserService } from './services/users.services';
import { LoginService } from './services/login.services';
import { StoreMayoristaService } from './services/storeMayorista.services';
import { ComisionesServices } from './services/comisiones.services';
import { NetworkService } from './services/network.services';
import { ExportDocumentService } from './services/exportDocument';
import { BackOfficeReportServices } from './services/backoffice.services';
import { SocketServices } from './services/socket.services';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        HeaderModule,
        BrowserAnimationsModule,
        MatVideoModule
    ],
    providers: [
        UserService,
        LoginService,
        StoreService,
        StoreInvitedService,
        InvoicesServices,
        ProductService,
        StoreMayoristaService,
        ComisionesServices,
        NetworkService,
        ExportDocumentService,
        BackOfficeReportServices,
        SocketServices
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
