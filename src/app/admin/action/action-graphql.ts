import { GraphQLModel } from './../../core/graphql/graphql-model';
import gql from 'graphql-tag';

export class ActionGraphQL implements GraphQLModel {

    readonly wrapper = 'adminActionsPagination';
    readonly dataList = 'actions';
    readonly queryObjects = gql`
        query GetAdminActionsPagination ($sql:[CoreSQLQueryInput]) {
            adminActionsPagination (sql:$sql) {
                total
                filtered
                actions(sql:$sql){
                    id
                    name
                }
                
            }
        }`;

    readonly objectName = 'adminAction';
    readonly queryObject = gql`
        query GetAdminAction ($sql:[CoreSQLQueryInput]) {
            adminAction (sql:$sql){
                id
                name
            }
        }`;

    readonly mutationAddObject = gql`
        mutation AdminAddAction ($id:String! $name:String) {
            addAdminAction (id:$id name:$name){
                id
                name
            }
        }`;
    readonly mutationUpdateObject = ``;
    readonly mutationDeleteObject = ``;
}