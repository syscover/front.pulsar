import { CoreComponent } from './core.component';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import { Injector, HostBinding, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Lang } from './../../admin/admin.models';
import { DataRoute } from './../classes/data-route';
import { setErrorsOnSubmitFormGroup } from './../super/core-validation';
import { environment } from './../../../environments/environment';
import gql from 'graphql-tag';
import * as _ from 'lodash';

export class CoreDetailComponent extends CoreComponent implements OnInit {

    @HostBinding('class') classes = 'animated fadeIn';

    dataRoute: DataRoute; // static dataRoute Object pass from route module
    formErrors: Object;
    fg: FormGroup;
    fb: FormBuilder;
    lang: Lang; // Current lang for objects that has multiple language
    object: Object = {}; // set empty object
    // Function that can to be overwrite in child class
    customCallback: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') {
            this.object = response; // function to set custom data
            this.fg.patchValue(this.object); // set values of form

            // only form objects with create lang action
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
        protected graphQL: GraphQLModel
    ) {
        super(injector, graphQL);
        this.fb = injector.get(FormBuilder);

        // set object properties
        this.dataRoute = <DataRoute>this.route.snapshot.data;

        // create form, this method will be overwrite by child class
        this.createForm();
    }

    // method that will be overwrite
    createForm() { }

    ngOnInit() {
        this.init();
    }

    init() {
        if (this.dataRoute.action === 'create') {
            this.lang  = <Lang>_.find(this.langs, {'id': this.baseLang}); // get baseLang object

            // to create a new object, do all queries to get relations data to create new object
            this.getGraphQLDataRelationsToCreateObject();

            // set lang_id if form has this field
            // call after customCallback() to overwrite lang_id field with correct value
            if (this.fg.contains('lang_id')) {
                this.fg.patchValue({
                    lang_id: this.lang.id // set lang id in form from object with multiple language
                });
            }
            return;
        }

        // Create lang or edit object for objects with multi language
        if (this.params['lang'] !== undefined) {
            this.lang = <Lang>_.find(this.langs, {'id': this.params['lang']}); // get lang object

            // get baseLang record
            if (this.dataRoute.action === 'create-lang') {
                let baseParams = _.clone(this.params); // clone objet because params properties are read-only
                baseParams['lang'] = this.baseLang; // set baseLang to get object

                this.getRecord(baseParams); // get baseLang object

            } else if (this.dataRoute.action === 'edit') {
                this.getRecord(this.params);
            }

        } else {
            // edit object without multilanguague and create lang
            this.getRecord(this.params);
        }
    }

    // function to get record in edit action or create lang action
    getRecord(params: Params) {
        let subs = this.objectService
            .proxyGraphQL()
            .watchQuery({
                query: this.graphQL.queryObject,
                // do it in separate function to may be rewrite, for examle in FieldGroupDetailComponent
                variables: this.getArgsToGetRecord(params)
            })
            .subscribe(({data}) => {
                if (environment.debug) console.log('DEBUG - response of query to get object: ', data);

                // instance data in relations fields of object
                this.setDataRelationsObject(data);

                // instance data on object list
                this.customCallback(data['coreObject']);

                subs.unsubscribe();
            });
    }

    // get args, in any case that you need create a query with aditonal arguments
    // for axample in FieldGroupDetailComponent, or specify field name in queries with joins
    getArgsToGetRecord(params: Params): any {

        let args = {
            model: this.graphQL.objectModel,
            sql: [{
                command: 'where',
                column: 'id',
                operator: '=',
                value: params['id']
            }]
        };

        // set lang is exist
        if (params['lang']) {
            args.sql.push({
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: params['lang']
            });
        }

        args = this.getCustomArgumentsForArgsToGetRecord(args, params);

        if (environment.debug) console.log('DEBUG - arguments to get object: ', args);

        return args;
    }

    // instante custom arguments, for example in payment-method-detail.component.ts
    getCustomArgumentsForArgsToGetRecord(args: Object, params: Params): any {
        return args;
    }

    // to create a new object, do all queries to get data across GraphQL
    getGraphQLDataRelationsToCreateObject() {
        if (this.graphQL.relationsFields && this.graphQL.relationsFields !== '') {

            let args = this.getCustomArgumentsForGraphQLDataRelationsToCreateObject();

            let options;

            // check if there are any variable
            if (args) {
                options = {
                    query: this.graphQL.queryRelationsObject,
                    variables: args
                };
            } else {
                options = {
                    query: this.graphQL.queryRelationsObject
                };
            }

            let subs = this.objectService
                .proxyGraphQL()
                .watchQuery(options)
                .subscribe(({data}) => {
                    this.setDataRelationsObject(data);
                    subs.unsubscribe();
                });
        }
    }

    // instante custom arguments, for example in payment-method-detail.component.ts
    getCustomArgumentsForGraphQLDataRelationsToCreateObject(): Object {
        return undefined;
    }

    // create all elements whith graphQL data obtain from method getGraphQLDataRelationsToCreateObject()
    // this function load realtion data to create object or edit object
    setDataRelationsObject(data: any) { }


    // funtion that will be call for create object, create lang object and update object
    onSubmit(object: any, routeRedirect: string = undefined, params = []) {

        // set errors from current form, this variable is binded to all form elements
        this.formErrors = setErrorsOnSubmitFormGroup(this.fg);

        if (this.fg.invalid) {
            // TODO, show general error
            console.log(this.fg);
            return; // has any validation error when emit submit event
        }

        let obs: Observable<any>; // Observable
        let args = {}; // arguments for observable

        if (this.fg.get('id')) {
            // Usually the id is disabled, we enable it if you need tale id data for create or edit
            this.fg.get('id').enable(); // enable is a method from AbstractControl
        }

        // add object to arguments
        args['object'] = this.fg.value;

        // call method that can to be overwrite by children
        args = this.getCustomArgumentsForOnSubmit(args, object);

        if (this.dataRoute.action === 'create') {

            // call method that can to be overwrite by children
            args = this.getCustomArgumentsForCreateOnSubmit(args, object);

            if (environment.debug) console.log('DEBUG - args sending to create object: ', args);

            obs = this.objectService
                .proxyGraphQL()
                .mutate({
                    mutation: this.graphQL.mutationAddObject,
                    variables: args
                });
        }
        if (this.dataRoute.action === 'create-lang') {

            // call method that can to be overwrite by children
            args = this.getCustomArgumentsForCreateLangOnSubmit(args, object);

            if (environment.debug) console.log('DEBUG - args sending to create lang object: ', args);

            obs = this.objectService
                .proxyGraphQL()
                .mutate({
                    mutation: this.graphQL.mutationAddObject,
                    variables: args
                });
        }
        if (this.dataRoute.action === 'edit') {

            // if route has id param, take this value how idOld
            if (this.params['id']) {
                args['idOld'] = this.params['id'];
            }

            // call method that can to be overwrite by children
            args = this.getCustomArgumentsForEditOnSubmit(args, object);

            if (environment.debug) console.log('DEBUG - args sending to edit object: ', args);

            obs = this.objectService
                .proxyGraphQL()
                .mutate({
                    mutation: this.graphQL.mutationUpdateObject,
                    variables: args
                });
        }

        let subs = obs.subscribe(data => {
            if (! routeRedirect) {
                this.router.navigate([this.baseUri]);
            } else {
                this.router.navigate([routeRedirect]);
            }
            subs.unsubscribe();
        });
    }

    /**
     * Method to be overwrite
     * @param args  Object
     * @param params Params
     */
    getCustomArgumentsForOnSubmit(args: Object, object: any): Object { return args; }

    /**
     * Method to be overwrite
     * @param args  Object
     * @param params Params
     */
    getCustomArgumentsForCreateOnSubmit(args: Object, params: Params): Object { return args; }

    /**
     * Method to be overwrite
     * @param args  Object
     * @param params Params
     */
    getCustomArgumentsForCreateLangOnSubmit(args: Object, params: Params): Object { return args; }

    /**
     * Method to be overwrite
     * @param args  Object
     * @param params Params
     */
    getCustomArgumentsForEditOnSubmit(args: Object, params: Params): Object { return args; }


    deleteRecord(object: any, routeRedirect: string = undefined, langAux: string = undefined, args = {}): void {

        args['id'] = object.id;

        // sest lang, don't lang_id, because data isn't like object
        if (object.lang_id) {   // check if has languages
            args['lang'] = object.lang_id;
        } else {
            // chek if has force lang,
            // this options is used in object with multiple lang in json
            // for example table field
            if (langAux !== undefined) {
                args['lang'] = langAux;
            }
        }

        // call method that can to be overwrite by children
        args = this.getCustomArgumentsForDeleteRecord(object, args);

        if (environment.debug) console.log('DEBUG - args sending to delete object: ', args);

        // confirm to delete object
        this.confirmationService.confirm({
            message: 'Are you sure that you want delete this object?',
            accept: () => {
                this.objectService
                    .proxyGraphQL()
                    .mutate({
                        mutation: this.graphQL.mutationDeleteObject,
                        variables: args
                    })
                    .subscribe(data => {
                        if (! routeRedirect) {
                            this.router.navigate([this.baseUri]);
                        } else {
                            this.router.navigate([routeRedirect]);
                        }
                    });
            }
        });
    }

    // method to be overwrite
    getCustomArgumentsForDeleteRecord(object: any, args: Object): Object { return args; }
}
