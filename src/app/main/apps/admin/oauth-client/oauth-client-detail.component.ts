import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-component';
import { graphQL } from './oauth-client.graphql';
import { AuthenticationService } from '@horus/services/authentication.service';
import { User } from '../admin.models';

@Component({
    selector: 'dh2-admin-oauth-client-detail',
    templateUrl: 'oauth-client-detail.component.html',
    animations: fuseAnimations
})
export class OauthClientDetailComponent extends CoreDetailComponent implements OnInit
{
    objectTranslation = 'ADMIN.CLIENT';
    objectTranslationGender = 'M';
    user: User;

    constructor(
        protected injector: Injector,
        private _authenticationService: AuthenticationService
    ) {
        super(injector, graphQL);
        this.user = this._authenticationService.user();
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            user_id: '',
            name: ['', Validators.required],
            redirect: ['', Validators.required]
        });
    }

    ngOnInit(): void
    {
        super.ngOnInit();
        if (this.dataRoute.action === 'create')
        {
            this.fg.controls['user_id'].setValue(this.user.id);
        }
    }
}

