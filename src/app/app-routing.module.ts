import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {HomeComponent} from './component/home/home.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', loadChildren: './login/login.module#LoginModule'},
    {path: 'unete', loadChildren: './unete/unete.module#UneteModule'},
    {path: 'businnessman', loadChildren: './businessman/office/office.module#OfficeModule'},
    {path: 'network', loadChildren: './businessman/network/network.module#NetworkModule'},
    {path: 'invoices', loadChildren: './businessman/invoices/invoices.module#InvoicesModule'},
    {path: 'myUsersList', loadChildren: './businessman/my-subtree/my-subtree.module#MySubtreeModule'},
    {path: 'addbusinessman', loadChildren: './businessman/add-businessman/add-businessman.module#AddBusinessmanModule'},
    {path: 'store', loadChildren: './businessman/store-businessman/store-businessman.module#StoreBusinessmanModule'},
    {
        path: 'subStore/:idCategory',
        loadChildren: './businessman/sub-store-businessman/sub-store-businessman.module#SubStoreBusinessmanModule'
    },
    {path: 'invited', loadChildren: './invited/invited.module#InvitedModule'},
    {path: 'mayorista', loadChildren: './businessman/wholesaler/wholesaler.module#WholesalerModule'},
    {path: 'substoreinvited/:idCategory', loadChildren: './sub-store-invited/sub-store-invited.module#SubStoreInvitedModule'},
    {path: 'storeMayorista', loadChildren: './mayorista/store-mayorista/store-mayorista.module#StoreMayoristaModule'},
    {
        path: 'subStoreMayorista/:idCategory',
        loadChildren: './mayorista/sub-store-mayorista/sub-store-mayorista.module#SubStoreMayoristaModule'
    },
    {path: 'cartInvited', loadChildren: './invited/cart/cart.module#CartModule'},
    {path: 'cartWholesaler', loadChildren: './mayorista/cart-mayorista/cart-wholesaler.module#CartWholesalerModule'},
    {path: 'cartBusinessman', loadChildren: './businessman/cart-businessman/cart-businessman.module#CartBusinessmanModule'},
    {path: 'detail/:code', loadChildren: './invited/detail/detail.module#DetailModule'},
    {path: 'detailMayorista/:code', loadChildren: './mayorista/detail-mayorista/detail-mayorista.module#DetailMayoristaModule'},
    {path: 'visibilityInvoiceInvited/:idInvoice', loadChildren: './invited/invoices-invited/invoices-invited.module#InvoicesInvitedModule'},
    {path: 'visibilityInvoice/:id', loadChildren: './businessman/visibility-invoice/visibility-invoice.module#VisibilityInvoiceModule'},
    {
        path: 'visibilityInvoiceMayorista/:idInvoice/:place',
        loadChildren: './mayorista/invoices-mayorista/invoices-mayorista.module#InvoicesMayoristaModule'
    },
    {
        path: 'InvoicesFromTheStore',
        loadChildren: './invited/invoices-from-the-store/invoices-from-the-store.module#InvoicesFromTheStoreModule'
    },
    {
        path: 'InvoicesFromTheStoreWholesaler',
        loadChildren: './mayorista/invoices-store-wholesaler/invoices-store-wholesaler.module#InvoicesStoreWholesalerModule'
    },
    {path: 'detailBusinessman/:code', loadChildren: './businessman/detail-businessman/detail-businessman.module#DetailBusinessmanModule'},
    {
        path: 'InvoicesFromTheStoreBusinessman',
        loadChildren: './businessman/invoice-store-businessman/invoice-store-businessman.module#InvoiceStoreBusinessmanModule'
    },
    {path: 'modifyData', loadChildren: './businessman/modify/modify.module#ModifyModule'},
    {path: 'modify', loadChildren: './businessman/modify-profile/modify-profile.module#ModifyProfileModule'},
    {path: 'contacto', loadChildren: './businessman/contact/contact.module#ContactModule'},
    {path: 'backoffice', loadChildren: './backoffice/tabla/tabla.module#TablaModule'},
    {
        path: 'invoicesReport/:id',
        loadChildren: './backoffice/detail-list-consolidate-only/detail-list-consolidate-only.module#DetailListConsolidateOnlyModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
