import { Query } from '@apollo/react-components'
import * as React from 'react'
import { MeQuery } from '../../schemaTypes'
import { gql } from 'apollo-boost'
import { Redirect } from 'react-router'

export const meQuery = gql`
    query MeQuery {
        me {
            id
            email
            type
            parent_first_name
        }
    }
`

export class MeView extends React.PureComponent {
    render () {
        return (<Query<MeQuery> query={meQuery}>
            {({loading, error, data}) => {
                if (loading)
                    return <h1>loading...</h1>
                
                if (error) {
                    return <div>
                        {error.message}
                        <Redirect to={'/login'}/>
                    </div>
                }
                if (!data.me) {
                    return <div>recieved no user</div>
                }

                return (
                    <div>
                        <h1>User info:</h1>
                        <p>{data.me.email}</p>
                        <p>type: {data.me.type}</p>
                    </div>
                )
            }}
        </Query>
        );
    }
}