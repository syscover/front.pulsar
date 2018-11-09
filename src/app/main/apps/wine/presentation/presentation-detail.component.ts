import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { graphQL } from './presentation.graphql';

@Component({
    selector: 'dh2-wine-presentation-detail',
    templateUrl: './presentation-detail.component.html',
    animations: fuseAnimations
})
export class PresentationDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'WINE.PRESENTATION';
    objectTranslationGender = 'F';
    graphQL = graphQL;
    loadingSlug = false;

    constructor(
        protected _injector: Injector
    ) {
        super(_injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            ix: null,
            id: [{value: null, disabled: true}, Validators.required],
            lang_id: [null, Validators.required],
            name: [null, Validators.required],
            slug: [null, Validators.required]
        });
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }
}