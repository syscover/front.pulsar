import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { graphQL } from './category.graphql';

@Component({
    selector: 'dh2-category-list',
    templateUrl: './category-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class CategoryListComponent extends CoreListComponent
{
    objectTranslation = 'CMS.CATEGORY';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['cms_category.id', 'cms_category.name', 'cms_section.name'];
    displayedColumns = ['cms_category.id', 'cms_category.name', 'cms_section.name', 'translations', 'actions'];
    filters = [{'command': 'where', 'column': 'lang_id', 'operator': '=', 'value': this.baseLang.id }];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
