import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { PaymentMethodService } from './payment-method.service';
import { PaymentMethod, OrderStatus } from './../market.models';

// custom imports
import { Lang } from './../../admin/admin.models';
import { LangService } from './../../admin/langs/lang.service';
import { OrderStatusService } from './../order-status/order-status.service';
import { SelectItem } from 'primeng/primeng';

import * as _ from 'lodash';

@Component({
    selector: 'ps-payment-method-detail',
    templateUrl: './payment-method-detail.component.html'
})
export class PaymentMethodDetailComponent extends CoreDetailComponent implements OnInit {

    private langs: SelectItem[] = [];
    private orderStatuses: SelectItem[] = [];

    // paramenters for parent class
    private object: PaymentMethod = new PaymentMethod(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') {
            this.object = response.data; // function to set custom data
            this.fg.patchValue(this.object); // set values of form, if the object not match with form, use pachValue instead of setvelue

            // set new lang
            if (this.dataRoute.action === 'create-lang') {
                this.fg.patchValue({
                    lang_id: this.params['newLang']
                });
            } else {
                this.fg.patchValue({
                    lang_id: this.params['lang']
                });
            }
        }
    }

    constructor(
        protected injector: Injector,
        protected objectService: PaymentMethodService,
        protected confirmationService: ConfirmationService,
        protected langService: LangService,
        protected orderStatusService: OrderStatusService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.createForm(); // create form

        // load langs
        this.langService.getRecords()
            .subscribe((response) => {

                this.langs = _.map(<Lang[]>response.data, obj => {
                    return { label: obj.name, value: obj.id };
                }); // get langs

                this.langs.unshift({ label: 'Select a language', value: '' });

                 // load order status
                const querySearchOrderStatus = {
                    'type': 'query',
                    'lang': this.configService.getConfig('base_lang').id,
                    'parameters': [
                        {
                            'command': 'where',
                            'column': 'order_status.active',
                            'operator': '=',
                            'value': true
                        },
                        {
                            'command': 'orderBy',
                            'operator': 'asc',
                            'column': 'order_status.name'
                        }
                    ]
                };

                this.orderStatusService.searchRecords(querySearchOrderStatus)
                    .subscribe((response) => {

                        this.orderStatuses = _.map(<OrderStatus[]>response.data, obj => {
                            return { label: obj.name, value: obj.id };
                        }); // get order status

                        this.orderStatuses.unshift({ label: 'Select a Order Status successful', value: '' });
                    });

                // get object
                super.getRecordHasIdParamenter(this.f);
            });
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}, Validators.required ],
            lang_id: [
                {value: '', disabled: this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang'}, Validators.required
            ],
            order_status_successful_id: [
                {value: '', disabled: this.dataRoute.action === 'create-lang'}, Validators.required
            ],
            name: ['', Validators.required ],
            minimum_price: '',
            maximum_price: '',
            sort: '',
            active: '',
            instructions: ''
        });
    }

}
