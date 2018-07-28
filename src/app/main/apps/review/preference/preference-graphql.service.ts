import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class PreferenceGraphQLService extends GraphQLSchema 
{
    queryObject = gql`
        query ReviewGetPreferences ($keys:[String]!) {
            coreObject: corePreferences (keys:$keys) {
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationUpdateObject = gql`
        mutation ReviewUpdatePreferences ($preferences:[CorePreferenceInput]) {
            coreUpdatePreferences (preferences:$preferences) {
                ${this.fields}
            }
        }`;

    init(): void
    {
        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on CorePreference {
                key
                value
            }
        `;

        this.relationsFields = `
            adminUsers {
                id
                name
                surname
            }
        `;

        super.init();
    }
}
