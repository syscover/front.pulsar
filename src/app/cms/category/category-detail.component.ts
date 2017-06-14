import { Component, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { CategoryService } from './category.service';

@Component({
    selector: 'ps-category-detail',
    templateUrl: './category-detail.component.html'
})
export class CategoryDetailComponent extends CoreDetailComponent {

    constructor(
        protected injector: Injector,
        protected objectService: CategoryService
    ) {
        super(injector, objectService);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}, Validators.required ],
            lang_id: ['', Validators.required],
            name: ['', Validators.required ],
            slug: ['', Validators.required ],
            sort: null
        });
    }
}
