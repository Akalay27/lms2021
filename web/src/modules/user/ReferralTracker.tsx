import { gql } from 'apollo-boost';
import React from 'react';
import { Query } from 'react-apollo';
import { ReferralQuery } from '../../schemaTypes';
const referralQuery = gql`
    query ReferralQuery($referral_code: String) {
        referral(code: $referral_code)
    }
`

export const ReferralTracker = () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('ref');
    return (
        <Query<ReferralQuery> query={referralQuery} variables={({referral_code: code})}>
            {({loading, data, error}) => {
                return null;
            }}
        </Query>
    )

}