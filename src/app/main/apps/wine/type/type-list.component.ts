import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { graphQL } from './type.graphql';

@Component({
    selector: 'dh2-wine-type-list',
    templateUrl: './type-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class TypeListComponent extends CoreListComponent
{
    objectTranslation = 'APPS.TYPE';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['wine_type.id', 'wine_type.name'];
    displayedColumns = ['wine_type.id', 'wine_type.name', 'translations', 'actions'];
    filters = [{'command': 'where', 'column': 'lang_id', 'operator': '=', 'value': this.baseLang.id }];

    constructor(
        protected _injector: Injector
    ) {
        super(_injector, graphQL);
    }
}
