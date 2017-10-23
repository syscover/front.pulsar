import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { OrderGraphQLService } from './order-graphql.service';
import { SelectItem } from 'primeng/primeng';
import { OrderStatus, Order } from './../market.models';
import * as _ from 'lodash';

@Component({
    selector: 'ps-order-detail',
    templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent extends CoreDetailComponent {

    // set empty object, overwritte object to be used in this class
    object: Order = new Order();

    statuses: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: OrderGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}, Validators.required ],
            date: [{value: '', disabled: true}, Validators.required ],
            status_id: ['', Validators.required],
            ip: [{value: '', disabled: true}, Validators.required ],
            customer_name: null,
            customer_surname: null,
        });
    }

    // Function that can to be overwrite in child class
    setData(response = undefined) {
        if (this.dataRoute.action === 'edit') {
            this.object = response; // function to set custom data

            // create copy object for change readonly properties
            let objectInput = Object.assign({}, this.object);

            // change date format to Date, for calendar component
            objectInput['date'] = new Date(this.object.date);

            this.fg.patchValue(objectInput); // set values of form
        }
    }

    setRelationsData(data) {

        // market order statuses
        this.statuses = _.filter(<OrderStatus[]>data['marketOrderStatuses'], obj => {
            return obj.lang_id === this.baseLang;
        }).map(obj => {
           return { value: obj.id, label: obj.name };
        });
        this.statuses.unshift({ label: 'Select a order status', value: '' });

        /* // cms sections
        this._sections = data['cmsSections'];
        this.sections = _.map(this._sections, obj => {
            return { value: obj.id, label: obj.name };
        });
        this.sections.unshift({ label: 'Select a section', value: '' });

        // cms families
        this._families = data['cmsFamilies'];
        this.families = _.map(this._families, obj => {
            return { value: obj.id, label: obj.name };
        });
        this.families.unshift({ label: 'Select a family', value: '' });

        // cms categories
        this.categories = _.map(<Category[]>data['cmsCategories'], obj => {
            return { value: obj.id, label: obj.name };
        });

        // cms statuses
        this.statuses = _.map(<Status[]>data['cmsStatuses'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.statuses.unshift({ label: 'Select a status', value: '' });

        // admin attachment families
        this._attachment_families = <AttachmentFamily[]>data['adminAttachmentFamilies'];
        this.attachmentFamilies = this._attachment_families;

        // Images styles for Froala
        for (let attachemntFamily of this.attachmentFamilies) {
            this.imageStyles['ps-attachment-family-' + attachemntFamily.id] = attachemntFamily.name;
        }

        // cms author
        this.user = this.authService.user();
        this.fg.patchValue({
            author_id: this.user.id,
            author_name: this.user.name + ' ' + this.user.surname
        });

        // cms articles
        this.articles = _.map(<Article[]>data['cmsArticles'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.articles.unshift({ label: 'Select a article', value: '' }); */
    }
}
