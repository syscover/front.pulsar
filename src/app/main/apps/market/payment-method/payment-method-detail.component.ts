import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { PaymentMethodGraphQLService } from './payment-method-graphql.service';
import { OrderStatus } from './../market.models';

@Component({
    selector: 'dh2-payment-method-detail',
    templateUrl: './payment-method-detail.component.html',
    animations: fuseAnimations
})
export class PaymentMethodDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'MARKET.PAYMENT_METHOD';
    objectTranslationGender = 'F';
    orderStatuses: OrderStatus[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: PaymentMethodGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            ix: null,
            id: [{value: null, disabled: true}, Validators.required],
            lang_id: [null, Validators.required],
            order_status_successful_id: [null, Validators.required],
            name: [null, Validators.required ],
            minimum_price: null,
            maximum_price: null,
            sort: null,
            active: false,
            instructions: null
        });
    }

    argumentsRelationsObject(): Object
    {
        const sqlOrderStatus = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'name'
            }
        ];

        return {
            sqlOrderStatus
        };
    }

    setRelationsData(data: any)
    {
        // set order statuses
        this.orderStatuses = data.marketOrderStatuses;
    }
}