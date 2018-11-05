import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { LangGraphQLService } from './lang-graphql.service';

@Component({
    selector: 'dh2-lang-list',
    templateUrl: './lang-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class LangListComponent extends CoreListComponent
{
    objectTranslation = 'ADMIN.LANGUAGE';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['admin_lang.id', 'admin_lang.name'];
    displayedColumns = ['admin_lang.id', 'admin_lang.name', 'admin_lang.active', 'actions'];

    constructor(
        protected injector: Injector,
        protected graphQL: LangGraphQLService
    ) {
        super(injector, graphQL);
    }
}