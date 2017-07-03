import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class CountryGraphQLService extends GraphQLModel {

    // model of backoffice relative at this GraphQL service
    objectModel = 'Syscover\\Admin\\Models\\Country';

    queryPaginationObject = gql`
        query AdminGetCountriesPagination ($lang:String $sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: adminCountriesPagination (lang:$lang sql:$sql) {
                total
                filtered
                objects (sql:$sql) {
                    ${this.fields}
                }
            }
        }`;

    queryObjects = gql`
        query AdminGetCountries ($sql:[CoreSQLQueryInput]) {
            coreObjects: adminCountries (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query AdminGetCountry ($sql:[CoreSQLQueryInput]) {
            coreObject: adminCountry (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationAddObject = gql`
        mutation AdminAddCountry ($object:AdminCountryInput!) {
            adminAddCountry (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateCountry ($object:AdminCountryInput! $idOld:String!) {
            adminUpdateCountry (object:$object idOld:$idOld){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteCountry ($id:String! $lang:String!) {
            adminDeleteCountry (id:$id lang:$lang){
                ${this.fields}
            }
        }`;

    init() {
        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminCountry {
                id
                lang_id 
                name 
                sort 
                prefix 
                territorial_area_1 
                territorial_area_2 
                territorial_area_3 
                data_lang
            }
        `;

        super.init();
    }
}
