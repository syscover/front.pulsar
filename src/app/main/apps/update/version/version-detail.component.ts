import { Component, Injector, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '../../../core/structures/core-detail-compoment';
import { Package } from '../../admin/admin.models';
import { graphQL } from './version.graphql';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'dh2-update-version-detail',
    templateUrl: 'version-detail.component.html',
    animations: fuseAnimations
})
export class VersionDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'UPDATE.VERSION';
    objectTranslationGender = 'F';
    packages: Package[] = [];

    @ViewChild(MatSort) sort: MatSort;
    displayedColumns = ['id', 'query', 'sort', 'actions'];
    dataSource = new MatTableDataSource();

    constructor(
        private _injector: Injector
    ) {
        super(_injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required],
            package_id: ['', Validators.required],
            version: ['', Validators.required],
            migration: false,
            config: false,
            query: '',
            publish: false,
        });
    }

    setRelationsData(data: any): void
    {
        // admin packages
        this.packages = data.adminPackages;
    }
}