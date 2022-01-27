import React from 'react'
import { Query } from 'react-apollo';
import {loadStripe} from '@stripe/stripe-js';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { CheckoutQuery } from '../../schemaTypes';
const checkoutQuery = gql`
    query CheckoutQuery {
        stripe_session {
            stripe_session_id
        }
    }
`

export class Checkout extends React.PureComponent<RouteComponentProps<{}>> {
    
    redirectToStripe = async (session) => {
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE)
        await stripe.redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as argument here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: session
        })
    }

    render () {
        
        return (
            <Query<CheckoutQuery> query = {checkoutQuery}>
                {({loading, error, data}) => {
                    if (!loading && !error) {
                        if (data.stripe_session) {
                            this.redirectToStripe(data.stripe_session.stripe_session_id)
                        }
                    } else if (error) {
                        return (
                            <div>
                                <p>{error.message}</p>
                                <Redirect to="/login"/>
                            </div>
                        )
                    }
                    return <p>redirecting to stripe...</p>;
            }}</Query>
        )
    }
}