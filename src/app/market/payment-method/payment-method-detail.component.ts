import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { PaymentMethodService } from './payment-method.service';
import { PaymentMethod, OrderStatus } from './../market.models';

// custom imports
import { OrderStatusService } from './../order-status/order-status.service';
import { SelectItem } from 'primeng/primeng';

import * as _ from 'lodash';

@Component({
    selector: 'ps-payment-method-detail',
    templateUrl: './payment-method-detail.component.html'
})
export class PaymentMethodDetailComponent extends CoreDetailComponent implements OnInit {

    orderStatuses: SelectItem[] = [];

    // paramenters for parent class
    object: PaymentMethod = new PaymentMethod(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') {
            this.object = response.data; // function to set custom data
            this.fg.patchValue(this.object); // set values of form, if the object not match with form, use pachValue instead of setvelue

            if (this.dataRoute.action === 'create-lang') {
                this.fg.patchValue({
                    // set lang id in form from object with multiple language
                    lang_id: this.lang.id
                });
            }
        }
    }

    constructor(
        protected injector: Injector,
        protected objectService: PaymentMethodService,
        protected orderStatusService: OrderStatusService
    ) {
        super(injector);
        this.baseUri = objectService.baseUri;
    }

    ngOnInit() {
        // load order status
        this.orderStatusService.searchRecords({
                'type': 'query',
                'lang': this.baseLang,
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
            })
            .subscribe((response) => {

                this.orderStatuses = _.map(<OrderStatus[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                }); // get order status

                this.orderStatuses.unshift({ label: 'Select a Order Status successful', value: '' });
            });

        // get object
        super.getRecordHasIdParamenter(this.f);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}, Validators.required ],
            lang_id: ['', Validators.required],
            order_status_successful_id: ['', Validators.required],
            name: ['', Validators.required ],
            minimum_price: '',
            maximum_price: '',
            sort: '',
            active: '',
            instructions: ''
        });
    }
}
