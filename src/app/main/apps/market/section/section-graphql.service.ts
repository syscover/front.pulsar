import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class SectionGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query MarketGetSectionsPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: marketSectionsPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`;

    queryObjects = gql`
        query MarketGetSections ($sql:[CoreSQLInput]) {
            coreObjects: marketSections (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query MarketGetSection ($sql:[CoreSQLInput]) {
            coreObject: marketSection (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationCreateObject = gql`
        mutation MarketCreateSection ($payload:MarketSectionInput!) {
            marketCreateSection (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation MarketUpdateSection ($payload:MarketSectionInput!) {
            marketUpdateSection (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation MarketDeleteSection ($id:String! $lang_id:String!) {
            marketDeleteSection (id:$id lang_id:$lang_id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Market\\Models\\Section';
        this.table = 'market_section';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketSection {
                ix
                id
                lang_id
                name
                slug
            }
        `;

        super.init();
    }
}
