import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TablaRoutingModule} from './tabla-routing.module';
import {TablaComponent} from './component/tabla/tabla.component';
import {DashboardModule} from '../dashboard/dashboard.module';
import {ListConsolidatedOnlyModule} from '../list-consolidated-only/list-consolidated-only.module';
import {DetailListConsolidateOnlyModule} from '../detail-list-consolidate-only/detail-list-consolidate-only.module';
import {ListConsolidatedModule} from '../list-consolidated/list-consolidated.module';
import {CommissionModule} from '../commission/commission.module';
import {HistoryCommissionModule} from '../history-commission/history-commission.module';
import {SearchWholesalerModule} from '../search-wholesaler/search-wholesaler.module';
import {ListPurchasesWholesalerModule} from '../list-purchases-wholesaler/list-purchases-wholesaler.module';
import {SearchBusinessmanModule} from '../search-businessman/search-businessman.module';
import {CreateCategoryModule} from '../create-category/create-category.module';
import {CreateProductModule} from '../create-product/create-product.module';
import {EditProductModule} from '../edit-product/edit-product.module';
import {TopePurchaseModule} from '../topePurchase/tope-purchase.module';
import {PasswordGeneralModule} from '../password-general/password-general.module';
import {SearchProductModule} from '../search-product/search-product.module';

@NgModule({
    declarations: [TablaComponent],
    imports: [
        CommonModule,
        TablaRoutingModule,
        DashboardModule,
        ListConsolidatedOnlyModule,
        DetailListConsolidateOnlyModule,
        ListConsolidatedModule,
        CommissionModule,
        HistoryCommissionModule,
        SearchWholesalerModule,
        SearchBusinessmanModule,
        CreateCategoryModule,
        CreateProductModule,
        SearchProductModule,
        TopePurchaseModule,
        PasswordGeneralModule
    ]
})
export class TablaModule {
}
