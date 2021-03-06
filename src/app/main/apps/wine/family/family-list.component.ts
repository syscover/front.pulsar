import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { graphQL } from './family.graphql';

@Component({
    selector: 'dh2-wine-family-list',
    templateUrl: './family-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class FamilyListComponent extends CoreListComponent
{
    objectTranslation = 'APPS.FAMILY';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['wine_family.id', 'wine_family.name'];
    displayedColumns = ['wine_family.id', 'wine_family.name', 'translations', 'actions'];
    filters = [{'command': 'where', 'column': 'lang_id', 'operator': '=', 'value': this.baseLang.id }];

    constructor(
        protected _injector: Injector
    ) {
        super(_injector, graphQL);
    }
}
