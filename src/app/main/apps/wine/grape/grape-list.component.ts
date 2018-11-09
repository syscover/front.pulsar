import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { graphQL } from './grape.graphql';

@Component({
    selector: 'dh2-wine-grape-list',
    templateUrl: './grape-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class GrapeListComponent extends CoreListComponent
{
    objectTranslation = 'WINE.GRAPE';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['wine_grape.id', 'wine_grape.name'];
    displayedColumns = ['wine_grape.id', 'wine_grape.name', 'translations', 'actions'];
    filters = [{'command': 'where', 'column': 'lang_id', 'operator': '=', 'value': this.baseLang }];

    constructor(
        protected _injector: Injector
    ) {
        super(_injector, graphQL);
    }
}