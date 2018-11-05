import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class ReviewGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query ReviewGetReviewsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: reviewReviewsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryRelationsObject = gql`
        query ReviewGetRelationsReview {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query ReviewGetReviews ($sql:[CoreSQLInput]) {
            coreObjects: reviewReviews (sql:$sql) {
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query ReviewGetReview ($sql:[CoreSQLInput]) {
            coreObject: reviewReview (sql:$sql) {
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationCreateObject = gql`
        mutation ReviewCreateReview ($payload:ReviewReviewInput!) {
            reviewCreateReview (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation ReviewActionReview ($payload:ReviewReviewInput! $action_id:Int!) {
            reviewActionReview (payload:$payload action_id:$action_id) {
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation ReviewDeleteReview ($id:Int!) {
            reviewDeleteReview (id:$id) {
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Review\\Models\\Review';
        this.table = 'review_review';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on ReviewReview {
                id
                date
                poll_id
                poll {
                    id
                    name
                    questions {
                        ix
                        id
                        lang_id
                        type_id
                        name
                        description
                        sort
                        high_score
                    }
                }
                object_id
                object_type
                object_name
                object_email
                customer_id
                customer_name
                customer_email
                customer_verified
                email_subject
                review_url
                review_completed_url
                validated
                completed
                average
                mailing
                sent
                expiration
                responses {
                    id
                    review_id
                    question_id
                    score
                    text
                }
            }
        `;

        this.relationsFields = `
            reviewPolls {
                id
                name
            }
        `;

        super.init();
    }
}