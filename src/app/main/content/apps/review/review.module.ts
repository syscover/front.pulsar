import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from './../../../../../@fuse/services/translation-loader.service';
import { SharedModule } from './../../core/modules/shared.module';
import { ReviewRoutingModule } from './review-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

// import { GroupListComponent } from './group/group-list.component';
// import { GroupDetailComponent } from './group/group-detail.component';

// import { GroupGraphQLService } from './group/group-graphql.service';

@NgModule({
    imports: [
        SharedModule,
        ReviewRoutingModule
    ],
    exports: [ ],
    declarations: [
        // GroupListComponent,
        // GroupDetailComponent,
    ],
    providers: [
        // GroupGraphQLService,
    ]
})

export class ReviewModule
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ){
        this.translationLoader.loadTranslations(english, spanish);
    }
}
