import React, { useEffect } from 'react';
import {Row, Col, Container, Button, Modal, Form, Card} from 'react-bootstrap'
import moment from 'moment';
import { Redirect, RouteComponentProps, useLocation } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Mutation, Query } from 'react-apollo';
import { DatesQuery, FullRegisterMutation, MeQuery } from '../../schemaTypes';
import { FullRegisterMutationVariables } from './../../schemaTypes';
import { meQuery } from './MeView';

const fullRegisterMutation = gql`  
    mutation FullRegisterMutation(
        $email: String!, 
        $username: String!
        $password: String!, 
        $parent_first_name: String!, 
        $parent_last_name: String!,
        $child_first_name: String!,
        $child_last_name: String!,
        $child_grade: String!
        $signup_date: String!
    ) {
        register_full
        (
            email: $email, 
            username: $username
            password: $password, 
            parent_last_name: $parent_last_name,
            parent_first_name: $parent_first_name,
            child_last_name: $child_last_name,
            child_first_name: $child_first_name,
            child_grade: $child_grade,
            signup_date: $signup_date
        )
        {
            id
            email
        }
    }
`

const datesQuery = gql`
    query DatesQuery {
        dates {
            date
            capacity
            students
        }
    }
`


export class FullRegisterView extends React.PureComponent<RouteComponentProps<{}>> {
    
    
    state = {
            email: '',
            username: '',
            password: '',
            parent_first_name: '',
            parent_last_name: '',
            child_first_name: '',
            child_last_name: '',
            child_grade: '',
            signup_date: '',
            validated: false,
            emailError: false,
    }
    

    handlechange = (e: any) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    validateForm = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();   
            event.stopPropagation();
        } 
        this.setState({validated: true})
        event.preventDefault();
    }

    render () {
        return (
        <Container>
            <ScrollToTop/>
            
            <Card style={{marginTop: '10px', borderWidth: '3px', borderRadius: '8px'}}as={Col} md={{span: 12, offset: 0}}>
                <Container style={{margin: '10px'}}>
            <Query<MeQuery> query={meQuery}>
            {({loading, error, data}) => {
                if (!loading && !error) {
                    if (!(data.me)) {
                        return null;
                    }

                    if (data.me.type === "unpaid") {
                        return <Redirect to={'/checkout'}/>
                    }

                    return (
                        <Redirect to={'/me'}/>
                    )
                } else {
                    return null;
                }
            }}
        </Query>
            <Row>
                <Col md={12}>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Sign Up Information
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Mutation<FullRegisterMutation, FullRegisterMutationVariables> mutation = {fullRegisterMutation}>
                {mutate => (
                    
            <Form noValidate validated={this.state.validated} onSubmit={async (event) => {
                        this.validateForm(event);
                        
                        if (event.currentTarget.checkValidity()) {
                            let variables = {...this.state};
                            delete variables.validated;
                            delete variables.emailError;
                            const response = await mutate({
                                variables: this.state
                            });
                            console.log(response);
                            if (response.data.register_full != null) {
                                this.props.history.push("checkout")
                            } else {
                                this.setState({emailError: true})
                            }
                        }
                    }}>

                <Form.Label>Child information</Form.Label>
                <Form.Row>    
                    <Form.Group as={Col} md="6" controlId="formChildFN">   
                        <Form.Control required onChange={this.handlechange} name="child_first_name" type="name" placeholder="Child First Name" />
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="formChildLN">
                        <Form.Control required onChange={this.handlechange} name="child_last_name" type="name" placeholder="Child Last Name" />
                    </Form.Group>
                </Form.Row>

                <Form.Label>Parent information</Form.Label>
                <Form.Row>    
                    <Form.Group as={Col} md="6" controlId="formParentFN">   
                        <Form.Control required onChange={this.handlechange} name="parent_first_name" type="name" placeholder="Parent First Name" />
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="formParentLN">
                        <Form.Control required onChange={this.handlechange} name="parent_last_name" type="name" placeholder="Parent Last Name" />
                    </Form.Group>
                </Form.Row>

                

                <Form.Group controlId="formEmail" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type="email" name="email" isInvalid={this.state.emailError} onChange={this.handlechange} placeholder="Parent email" />
                    <Form.Control.Feedback type="invalid" >
                    {this.state.emailError && "email already registered!"}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                
                
                <Form.Row>
                <Query<DatesQuery> query={datesQuery}>
                {({loading, data, error}) => {
                    
                    if (!loading) return (<Form.Group as={Col} md="6" controlId="formDates">
                    <fieldset onChange={this.handlechange}>
                        <Form.Label>Week</Form.Label>    
                        
                        {data && data.dates.map((item, index) => {

                            if (item.capacity > item.students) {
                                return (
                                    <Form.Check 
                                        type="radio" 
                                        label={DatesDisplay({date: item.date}) + " (" + (item.capacity-item.students) + " spots left!)"} 
                                        value={item.date}
                                        name="signup_date"
                                        id={item.date}
                                        required
                                        key={index}
                                    />
                                )
                            } else {
                                return (
                                    <Form.Check 
                                        type="radio" 
                                        label={DatesDisplay({date: item.date})} 
                                        value={item.date}
                                        name="signup_date"
                                        id={item.date}
                                        disabled
                                        required
                                        key={index}
                                    />
                                )
                            }
                        })}
                        </fieldset>
                    </Form.Group>)
                    else if (!error) return (<h3>loading...</h3>)
                    else return (<p>{error.message}</p>)}
                }
                </Query>

                <Form.Group as={Col} md="6" controlId="formGrade">
                    <fieldset onChange={this.handlechange}>
                        <Form.Label>Fall 2021 Grade Level</Form.Label>    
                        {["6th","7th","8th"].map((item, index) => {
                            return (
                                <Form.Check 
                                    type="radio" 
                                    label={item} 
                                    value={item}
                                    name="child_grade"
                                    id={item}
                                    required
                                    key={index}
                                />
                            )
                        })}
                        </fieldset>
                    </Form.Group>
                </Form.Row>
                {/* <Mutation<FullRegisterMutation, FullRegisterMutationVariables> mutation = {fullRegisterMutation}>
                {mutate => (
                    <Button variant="primary" onClick={async () => {
                        
                        let variables = this.state;
                        delete variables.validated;
                        const response = await mutate({
                            variables: this.state
                        });
                        console.log(response);
                        if (response.data.register_full === true) {
                            this.props.history.push("login");
                        } else {
                            this.setState({error: 'email already in use!'})
                        }
                    }}>
                        Submit
                </Button>)}
                
                </Mutation> */}
               
            <Modal.Title id="contained-modal-title-vcenter">
              Student Account Registration
            </Modal.Title>
          
                <Form.Row>
                <Form.Group as={Col} md="6" controlId="formUsername" >
                    <Form.Label>Account Username</Form.Label>
                    <Form.Control required type="text" name="username" onChange={this.handlechange} placeholder="Account username" />
                    <Form.Text className="text-muted">
                    This account will be used by your child to sign into codingcamp.bigoaklabs.com.
                </Form.Text>
                </Form.Group>
                
                <Form.Group as={Col} md="6" controlId="formPassword" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" name="password" onChange={this.handlechange} placeholder="Account password" />
                </Form.Group>
                    
                </Form.Row>
                <Button variant="primary" type="submit">Checkout</Button>
                <Form.Text className="text-muted">
                    You will be redirected to Stripe's Secure Checkout.
                </Form.Text>
            </Form>
            )}
            </Mutation>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer> */}
        </Col>
        </Row>
        </Container>
        </Card>
        </Container>
        
        
      );
      
    }
}

function DatesDisplay(props) {

    let start = moment(props.date,"YYYY/MM/DD");
    let end = moment(props.date,"YYYY/MM/DD").add(4,'days');
    return start.format("MMMM D") + " - " + end.format("MMMM D");

}

function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }