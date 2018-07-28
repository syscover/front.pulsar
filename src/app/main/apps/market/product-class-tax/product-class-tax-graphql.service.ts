import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class ProductClassTaxGraphQLService extends GraphQLSchema
{
    queryPaginationObject = gql`
        query MarketGetProductClassTaxesPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: marketProductClassTaxesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryObjects = gql`
        query MarketGetProductClassTaxes ($sql:[CoreSQLQueryInput]) {
            coreObjects: marketProductClassTaxes (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query MarketGetProductClassTax ($sql:[CoreSQLQueryInput]) {
            coreObject: marketProductClassTax (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationAddObject = gql`
        mutation MarketAddProductClassTax ($object:MarketProductClassTaxInput!) {
            marketAddProductClassTax (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation MarketUpdateProductClassTax ($object:MarketProductClassTaxInput!) {
            marketUpdateProductClassTax (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation MarketDeleteProductClassTax ($id:Int!) {
            marketDeleteProductClassTax (id:$id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Market\\Models\\ProductClassTax';
        this.table = 'market_product_class_tax';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketProductClassTax {
                id
                name 
            }
        `;

        super.init();
    }
}
