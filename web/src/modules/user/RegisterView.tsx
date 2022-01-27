import { Mutation } from '@apollo/react-components';
import * as React from 'react'
import { gql } from 'apollo-boost'
import { RegisterMutation, RegisterMutationVariables } from '../../schemaTypes';
import { RouteComponentProps } from 'react-router';


const registerMutation = gql`
    mutation RegisterMutation($email: String!, $password: String!) {
        register(email: $email, password: $password)
    }
`
// replaced by FullRegisterView
export class RegisterView extends React.PureComponent<RouteComponentProps<{}>> {
    
    state = {
        email: '',
        password: '',
        error: null
    }
    
    handleChange = (e: any) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    render () {
        const {password, email} = this.state
        return (
            <Mutation<RegisterMutation, RegisterMutationVariables> mutation = {registerMutation}>
                {mutate => (
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    {this.state.error && <h4>{this.state.error}</h4>}
                    <div>
                        <input
                            type="email"
                            name="email" 
                            placeholder="email" 
                            value={email} 
                            onChange={this.handleChange} />
                    </div>
                    <div>
                    <input
                        type="password"
                        name="password" 
                        placeholder="password" 
                        value={password} 
                        onChange={this.handleChange} />
                    </div>
                    <div>
                        <button onClick={async () => {
                            const response = await mutate({
                                variables: this.state
                            });
                            if (response.data.register) {
                                this.props.history.push("login");
                            } else {
                                this.setState({error: 'email already in use!'})
                            }
                        }}>register</button>
                    </div>
                </div>
            )}</Mutation>
        )
    }
}