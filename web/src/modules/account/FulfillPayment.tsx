import React from 'react'
import { Query } from 'react-apollo';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { FulfillQuery } from '../../schemaTypes';
const fulfillQuery = gql`
    query FulfillQuery {
        fulfill_payment
    }
`

export class FulfillPayment extends React.PureComponent<RouteComponentProps<{}>> {
    render() {
        return (
            <Query<FulfillQuery> query = {fulfillQuery}>
                { ({loading, error, data}) => {
                    if (!loading) {   
                        return (
                            <Redirect to={'/login'}></Redirect>
                        );
                    } else {
                        return null;
                    }
                }
            }</Query>
        )
    }
}