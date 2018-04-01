import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from './../../../../../@fuse/services/translation-loader.service';
import { SharedModule } from './../../core/modules/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

import { ActionListComponent } from './action/action-list.component';
import { ActionDetailComponent } from './action/action-detail.component';
import { CountryListComponent } from './country/country-list.component';
import { CountryDetailComponent } from './country/country-detail.component';
import { LangListComponent } from './lang/lang-list.component';
import { LangDetailComponent } from './lang/lang-detail.component';
import { PackageListComponent } from './package/package-list.component';
import { PackageDetailComponent } from './package/package-detail.component';
import { ResourceListComponent } from './resource/resource-list.component';
import { ResourceDetailComponent } from './resource/resource-detail.component';

import { ActionGraphQLService } from './action/action-graphql.service';
import { CountryGraphQLService } from './country/country-graphql.service';
import { LangGraphQLService } from './lang/lang-graphql.service';
import { PackageGraphQLService } from './package/package-graphql.service';
import { ResourceGraphQLService } from './resource/resource-graphql.service';

@NgModule({
    imports: [
        SharedModule,
        AdminRoutingModule
    ],
    exports: [ ],
    declarations: [
        ActionListComponent,
        ActionDetailComponent,
        CountryListComponent,
        CountryDetailComponent,
        LangListComponent,
        LangDetailComponent,
        PackageListComponent,
        PackageDetailComponent,
        ResourceListComponent,
        ResourceDetailComponent
    ],
    providers: [
        ActionGraphQLService,
        CountryGraphQLService,
        LangGraphQLService,
        PackageGraphQLService,
        ResourceGraphQLService
    ]
})

export class AdminModule 
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ){
        this.translationLoader.loadTranslations(english, spanish);
    }
}
