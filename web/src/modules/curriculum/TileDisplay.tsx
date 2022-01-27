import React, { useCallback, useState } from "react"
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import { GetAllExercisesQuery } from "../../schemaTypes";
import "../../styles/tileDisplay.css";
import { Button, Card, Container, Navbar, Row } from "react-bootstrap";
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { Exercise } from "./Exercise";
import { Link } from 'react-router-dom';

const getAllExercises = gql`
   query GetAllExercisesQuery {
       get_all_exercises {
           uid
           id
           title
           status
       }
   } 
`

export const TileDisplay = (props) => {

    const {loading, error, data, refetch} = useQuery<GetAllExercisesQuery>(getAllExercises, {
        // fetchPolicy: "no-cache"
    });
    const refetchFromExercise = useCallback(() =>
        setTimeout(() => {
            refetch();
        },0), [refetch]
    );
    
    if (!loading) {
        return (

            <div className="exerciseContainer">
                <Switch>
                    {data.get_all_exercises.map((value,index) => {

                        return (
                            <Route path={"/code/exercise/"+value.id}>
                                <Exercise exercises_refresh={refetchFromExercise}exercise_uid={value.id}/>
                            </Route>
                        )
                    })}
                    
                    <Route path={"/code/"}>
                        <div className="menuPositioning">
                        <h1>Menu</h1>
                        <Container className="tileDisplay">
                            
                            {data.get_all_exercises.map((value, index) => {
                            
                            return (
                                <Link to={"/code/exercise/" + value.id} style={{ textDecoration: 'none' }}>
                                <span className={"squareCard largeSize box-shadow hvr-grow " + value.status} key={value.id.toString()}>
                                    <strong>
                                        {value.id}
                                    </strong>
                                </span>
                                </Link>
                            )
                        })}
                        </Container>
                        </div>
                    </Route>

                </Switch>
                <Route path={"/code/exercise"}>
           
                    <Container className="tileDisplay bottomPositioning">
                        <Link to="/code">
                            <Button variant="outline-secondary" size="lg" style={{marginRight: "5pt"}}>Menu</Button>
                        </Link>
                        {data.get_all_exercises.map((value, index) => {
                        
                        return (
                            <NavLink to={"/code/exercise/" + value.id} activeClassName="currentExercise" style={{ textDecoration: 'none' }}>
                                <span className={"squareCard smallSize box-shadow hvr-grow " + value.status} key={value.id.toString()}>
                                    <strong>
                                        {value.id}
                                    </strong>
                                </span>
                            </NavLink>
                            )
                        })}
                    </Container>

                    </Route>
            </div>
            
        )
        
    } else if (loading && !error) {
        return <h1>loading...</h1>
    } else if (error) {
        return <Redirect to="/login"/>
    }

}