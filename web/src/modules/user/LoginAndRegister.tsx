import { gql } from "apollo-boost";
import React from "react";
import { ApolloProvider, Mutation, Query } from "react-apollo";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, Redirect, RouteComponentProps } from "react-router-dom";
import {
  LoginMutation,
  LoginMutationVariables,
  LogoutMutation,
  MeQuery,
} from "../../schemaTypes";
import { meQuery } from "./MeView";

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`

const logoutMutation = gql`
  mutation LogoutMutation {
    logout
  }
`

export class LoginAndRegister extends React.PureComponent {
  state = {
    email: "",
    password: "",
    validated: false,
    emailError: false,
    success: false,
  };

  handlechange = (e: any) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  validateForm = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
    event.preventDefault();
  };

  render() {
    
    return (
      <Container>
        <Card
          style={{ marginTop: "10px", borderWidth: "3px", borderRadius: "8px" }}
          as={Col}
          md={{ span: 8, offset: 2 }}
        >
          <Container
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              marginLeft: "0px",
            }}
          >
            <Row style={{ padding: "0px" }}>
              <Query<MeQuery> query={meQuery}>
                {({ client, loading, error, data }) => {
                  if (error || loading || !data.me) {
                    
                      return (
                        <>
                          <Col
                            md={6}
                            style={{ borderRight: "2px solid #ececec" }}
                          >
                            <Row className="row h-100">
                              <Col
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                className="my-auto"
                              >
                                <h4 style={{ textAlign: "center" }}>
                                  Click here to register!
                                </h4>

                                <Link to="/register">
                                  <Button variant="outline-primary" size="lg">
                                    Register
                                  </Button>
                                </Link>
                              </Col>
                            </Row>
                          </Col>
                          <Col md={6}>
                            <h4 style={{ textAlign: "center" }}>
                              Already have an account?
                            </h4>
                            <Mutation<LoginMutation, LoginMutationVariables>
                              mutation={loginMutation}
                            >
                              {(mutate) => (
                                <Form
                                  noValidate
                                  validated={this.state.validated}
                                  onSubmit={async (event) => {
                                    this.validateForm(event);

                                    if (event.currentTarget.checkValidity()) {
                                      let variables = { ...this.state };
                                      delete variables.validated;
                                      delete variables.emailError;
                                      delete variables.success;
                                      const response = await mutate({
                                        variables: this.state,
                                      });
                                      console.log(response);
                                      if (response.data.login != null) {
                                        this.setState({ success: true });
                                        client.resetStore();
                                      } else {
                                        this.setState({ emailError: true });
                                      }
                                    }
                                  }}
                                >  {this.state.success && <Redirect to="/login"/>}
                                  {/* <Form.Row> */}
                                  <Form.Group controlId="formUsername">
                                    <Form.Label>Username/Email</Form.Label>

                                    <Form.Control
                                      required
                                      type="text"
                                      name="email"
                                      onChange={this.handlechange}
                                      placeholder="account username/email"
                                      isInvalid={this.state.emailError}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      {this.state.emailError &&
                                        "username/password invalid!"}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                  {/* </Form.Row> */}
                                  {/* <Form.Row> */}

                                  <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                      required
                                      type="password"
                                      name="password"
                                      onChange={this.handlechange}
                                      placeholder="password"
                                    />
                                  </Form.Group>
                                  {/* </Form.Row> */}
                                  <Button
                                    variant="primary"
                                    style={{ alignContent: "center" }}
                                    type="submit"
                                  >
                                    Log in
                                  </Button>
                                </Form>
                              )}
                            </Mutation>
                          </Col>
                        </>
                      );
                    } else if (data.me && data.me.type === "unpaid") {
                      return (
                        <Col
                          md={12}
                        >
                          <Row className="row h-100">
                            <Col
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              className="my-auto"
                            >
                              <h4 style={{ textAlign: "center" }}>
                                Click here to resume/retry checkout.
                              </h4>

                              <Link to="/checkout">
                                <Button variant="outline-primary" size="lg">
                                  Checkout
                                </Button>
                              </Link>
                            </Col>
                          </Row>
                        </Col>
                      );
                    } else {
                        return (
                            <Col md={12}>
                                <Row className="row h-100">
                                <Col
                                    style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    }}
                                    className="my-auto"
                                >
                                    <h4 style={{ textAlign: "center" }}>
                                    Thanks for signing up, {data.me.parent_first_name}!
                                    </h4>
                                    <p></p>
                                    <Link to="/code">
                                      <Button variant="outline-success" size="lg">Go to App</Button>
                                    </Link> 
                                    <br></br>
                                    <Mutation<LogoutMutation> mutation={logoutMutation}>
                                      {(mutate) => {
                          
                                        return (
                                          <Button variant="outline-primary" size="lg" onClick={async (event) => {
                                            const response = await mutate();
                                            console.log(response);
                                            client.resetStore();
                                          }


                                        }>
                                          Log out
                                        </Button>
                                        )
                                      }}
                                      
                                    </Mutation>
                                    
                                    
                                    
                                    {/* <Link to="/me">
                                    <Button variant="outline-primary" size="lg">
                                        Account
                                    </Button>
                                    </Link> */}
                                </Col>
                                </Row>
                            </Col>
                        );
                  }
                }}
              </Query>
            </Row>
          </Container>
        </Card>
      </Container>
    );
  }
}
