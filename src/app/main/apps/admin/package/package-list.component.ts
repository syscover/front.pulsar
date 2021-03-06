import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { graphQL } from './package.graphql';

@Component({
    selector: 'dh2-admin-package-list',
    templateUrl: './package-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class PackageListComponent extends CoreListComponent 
{
    objectTranslation = 'APPS.PACKAGE';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['admin_package.id', 'admin_package.name', 'admin_package.root', 'admin_package.version'];
    displayedColumns = ['admin_package.id', 'admin_package.name', 'admin_package.root', 'admin_package.version', 'admin_package.sort', 'admin_package.active', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
