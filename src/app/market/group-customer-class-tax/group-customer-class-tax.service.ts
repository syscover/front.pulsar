import { Injectable, Injector } from '@angular/core';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class GroupCustomerClassTaxService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appRootPrefix}/market/group-customer-class-tax`); // set application URL
        this.setApiUrl('/api/v1/market/group-customer-class-tax'); // set api URL
    }
}