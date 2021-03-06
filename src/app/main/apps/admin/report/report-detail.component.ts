import { AuthorizationService } from '@horus/services/authorization.service';
import { Component, Injector, ViewChild, OnInit, OnChanges } from '@angular/core';
import { FormGroup, Validators, Form } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatDialog, MatTableDataSource, MatSort } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from '@horus/services/authentication.service';
import { Chips, ChipsDecoratorInterface } from '@horus/decorators/chips.decortor';
import { CoreDetailComponent } from '@horus/foundations/core-detail-component';
import { Extension, Frequency, Profile, FieldType, DataType, ReportRelation, Wildcard } from './../admin.models';
import { WildcardDialogComponent } from './wildcard-dialog.component';
import { graphQL } from './report.graphql';
import * as _ from 'lodash';

@Chips()
@Component({
    selector: 'dh2-admin-report-detail',
    templateUrl: 'report-detail.component.html',
    animations: fuseAnimations
})
export class ReportDetailComponent extends CoreDetailComponent implements ChipsDecoratorInterface, OnInit
{
    objectTranslation = 'APPS.REPORT';
    objectTranslationGender = 'M';

    reportRelations: ReportRelation[] = [];
    frequencies: Frequency[] = [];
    extensions: Extension[] = [];
    emails: String[] = [];
    profiles: Profile[] = [];
    separatorKeysCodes = [ENTER, COMMA];
    fieldTypes: FieldType[] = [];
    dataTypes: DataType[] = [];

    // wildcard table
    displayedColumnsWildcard = ['label', 'name', 'actions'];
    dataSourceWildcard = new MatTableDataSource();
    @ViewChild(MatSort, {static: false}) sortWildcard: MatSort;

    constructor(
        protected injector: Injector,
        private _dialog: MatDialog,
        private _authenticationService: AuthenticationService,
        public authorizationService: AuthorizationService,
    ) 
    {
        super(injector, graphQL);
    }

    get wildcards(): Wildcard[]
    {
        if (!Array.isArray(this.fg.get('wildcards').value)) this.fg.get('wildcards').setValue([]);
        return this.fg.get('wildcards').value;
    }

    addTag: (formGroup: FormGroup, name: string, event: MatChipInputEvent) => void;
    removeTag: (formGroup: FormGroup, name: string, tag) => void;

    createForm(): void 
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            subject: ['', Validators.required],
            emails: [[], Validators.required],
            profiles: [],
            filename: ['', Validators.required],
            extension: ['', Validators.required],
            frequency_id: ['', Validators.required],
            statement: '',
            sql: '',
            filter: '',
            wildcards: []
        });
    }

    argumentsRelationsObject(): object 
    {
        const configFieldTypes = {
            key: 'pulsar-admin.field_types'
        };

        const configDataTypes = {
            key: 'pulsar-admin.data_types'
        };

        const configExtensions = {
            key: 'pulsar-admin.extensions',
            property: 'name'
        };

        const configFrequencies = {
            key: 'pulsar-admin.frequencies',
            lang: this.baseLang.id,
            property: 'name'
        };

        const configReportRelations = {
            key: 'pulsar-admin.report_data_sources',
            lang: this.baseLang.id,
            property: 'name'
        };

        return {
            configFieldTypes,
            configDataTypes,
            configExtensions,
            configFrequencies,
            configReportRelations
        };
    }

    setRelationsData(data: any): void
    {
        // set fields types
        this.fieldTypes = data.coreConfigFieldTypes;

        // set data types
        this.dataTypes = data.coreConfigDataTypes;

        // admin extensions
        this.extensions = data.adminConfigExtensions;

        // admin frequencies
        this.frequencies = data.adminConfigFrequencies;

        // admin report relations
        this.reportRelations = data.adminConfigReportRelations;

        // admin profiles
        this.profiles = data.adminProfiles;

        if (this.dataRoute.action ==='edit' && data.coreObject.wildcards)
        {
            // set mat-table with wildcard data
            this.dataSourceWildcard.data = data.coreObject.wildcards;
        }
    }

    // set default profile if is empty
    getCustomArgumentsPostRecord(args, object): object
    {
        if (!args.payload.profiles)
        {
            args.payload.profiles = [this._authenticationService.user().profile.id];
        }
        return args;
    }

    handleWildcard(wildcard = null)
    {
        const dialogRef = this._dialog.open(WildcardDialogComponent, {
            data: {
                fieldTypes: this.fieldTypes,
                dataTypes: this.dataTypes,
                reportRelations: this.reportRelations,
                wildcard: wildcard
            },
            width: '80vw'
        });

        dialogRef.afterClosed().subscribe((data: any) => 
        {
            if (data)
            {
                const wildcard = data.fg.value;
                const index = this.wildcards.findIndex(item => item.name === wildcard.name);
                
                if (index !== -1)
                {
                    // keep reference with form
                    this.wildcards[index] = wildcard;
                }
                else
                {
                    // update mat-table data source
                    this.wildcards.push(wildcard);
                }
                this.dataSourceWildcard.data = this.wildcards;
                this.fg.markAsDirty();
            }
        });
    }

    deleteWildcard(wildcard = null)
    {
        // remove wildcard keeping reference
        _.remove(this.wildcards, item => item.name === wildcard.name);
        
        this.dataSourceWildcard.data = this.wildcards;
        this.fg.markAsDirty();
    }

    handleInputWildcardValue() 
    {
        this.fg.get('wildcards').markAsPristine();
        this.fg.get('wildcards').markAsDirty();
    }
}
