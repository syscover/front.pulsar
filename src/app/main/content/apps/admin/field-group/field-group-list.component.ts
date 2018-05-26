import { Component, Injector } from '@angular/core';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { FieldGroupGraphQLService } from './field-group-graphql.service';

@Component({
    selector: 'dh2-field-group-list',
    templateUrl: './field-group-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class FieldGroupListComponent extends CoreListComponent
{
    objectTranslation = 'APPS.FIELD_GROUP';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['admin_field_group.id', 'admin_field_group.name', 'admin_resource.name'];
    displayedColumns = ['admin_field_group.id', 'admin_field_group.name', 'admin_resource.name', 'actions'];

    constructor(
        protected injector: Injector,
        protected graphQL: FieldGroupGraphQLService
    ) {
        super(injector, graphQL);
    }
}
