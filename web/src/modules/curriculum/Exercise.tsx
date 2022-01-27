import React, { useEffect, useState } from "react";
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import '../../utils/p5-javascript';
import { Button, Card, Col, Container, Navbar, Row } from "react-bootstrap";
import codePreview from '../../codePreview.js'
import '../../styles/exercise.css'
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "react-apollo";
import { GetCodeEntryQuery, GetCodeEntryQueryVariables, GetExerciseQuery, GetExerciseQueryVariables, SaveCodeEntryMutationVariables } from "../../schemaTypes";
import { SaveCodeEntryMutation } from './../../schemaTypes';
import moment from "moment";
import { PreviewConsole } from "./PreviewConsole";
import { ArticleDisplay } from "./ArticleDisplay";

const getCodeEntryQuery = gql`
    query GetCodeEntryQuery($uid: Int) {
        get_code_entry (uid: $uid) {
            code
            date_changed
            exercise_uid
            user
            status
        }
    }
`

const saveCodeEntryMutation = gql`
    mutation SaveCodeEntryMutation($exercise_uid: Int!, $code: String!, $status: String) {
        save_code_entry (exercise_uid: $exercise_uid, code: $code, status: $status)
    }

`

const getExerciseQuery = gql`
    query GetExerciseQuery($uid: Int) {
        get_exercise (uid: $uid) {
            uid
            title
            article
            id
        }
    }
`


export const Exercise = (props) => {
    const {loading: getEntryLoading, error: getEntryError, data: entry} = useQuery<GetCodeEntryQuery,GetCodeEntryQueryVariables>(getCodeEntryQuery, {
        variables: {uid: props.exercise_uid},
        onCompleted: (data) => {
            setCode(data.get_code_entry.code)
            setStatus(data.get_code_entry.status)
            props.exercises_refresh();
        },
        onError: (error) => {
            setCode(error.message);
        }
    });
    const {loading: getExerciseLoading, error: getExerciseError, data: exercise} = useQuery<GetExerciseQuery, GetExerciseQueryVariables>(getExerciseQuery, {
        variables: {uid: props.exercise_uid}
    })
    
    const [saveEntry, { data: saveEntryResult }] = useMutation<SaveCodeEntryMutation,SaveCodeEntryMutationVariables>(saveCodeEntryMutation);



    const [code, setCode] = useState("// loading...")
    const [previewCode, setPreviewCode] = useState(code);
    const [lastUpdateTime, setLastUpdateTime] = useState(new Date().getTime())
    const [consoleOutput, setConsoleOutput] = useState("");
    const [status, setStatus] = useState("opened")
    
    useEffect(() => {

        // code preview updater
        const updatePreviewInterval = setInterval(async () => {
            if (entry) {
                let newUpdateTime = new Date().getTime();
                if (newUpdateTime-lastUpdateTime > 500) {
                    if (previewCode !== code || entry.get_code_entry.status !== status) {
                        setPreviewCode(code);
                        setConsoleOutput("");
                        console.log("Updating preview...")
                        entry.get_code_entry.code = code;
                        entry.get_code_entry.status = status;
                        await saveEntry({variables: {...entry.get_code_entry}});
                        props.exercises_refresh();
                    }
                }
            }
        }, 200);

        // iframe error listener
        const onError = (event) => {
            if (event.data.source === "sketch" || event.data.source === "") {
                setConsoleOutput(event.data.messages[0].log[0].data)
            }
            console.log(event.data)
        }

        window.addEventListener('message', onError);

        return () => {
            clearInterval(updatePreviewInterval);
            window.removeEventListener('message', onError)
        }
    })

    return (
        <div> 
            <Navbar style=
            {{display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            }}bg="primary" variant="dark" expand="lg">
            <Navbar.Brand>{/*⌨️*/}{(!getExerciseLoading && !getExerciseError) ? exercise.get_exercise.title : "Loading exercise..."}{/*🖥️*/}</Navbar.Brand>
        </Navbar>
        <Container className="h-100" fluid>
            
            <Row className="h-50">
                <Col md={6}>
                    <div>
                    <CodeMirror
                        value={code}
                        options={{
                            mode: 'javascript',
                            theme: 'material',
                            lineNumbers: true
                        }}
                        className="main-editor"
                        
                        onBeforeChange={(editor, data, value) => {
                            setCode(value);
                        }}
                        onChange={(editor, data, value) => {
                            setLastUpdateTime(new Date().getTime());                        
                        }}
                    />
                    </div>
                </Col>
                <Col md={6}>
                    
                    <iframe 
                        title="Code Preview" 
                        sandbox="allow-scripts allow-pointer-lock allow-same-origin allow-popups allow-forms allow-modals allow-downloads"
                        srcDoc={codePreview.replace("{code}",previewCode)}
                    /> 
                    
                </Col>
            </Row>
            <Row className="h-50">
                
                <Col md={6}>
                <Container className="h-50">
                    <p className="last-updated">Last Saved: {moment(lastUpdateTime).format('MMMM Do, h:mm A')}</p>
                    
                    
                    {!getExerciseLoading && (
                        <div>
                            <h3 className="instructions-title" style={{textAlign: 'center'}}><strong>Instructions</strong></h3>
                            <ArticleDisplay markdown={exercise.get_exercise.article} />
                            <Button className="completedButton" variant={(status === "opened") ? "outline-success" : "success"}onClick={() => {
                                
                                if (status === "opened")
                                    setStatus("finished");
                                else
                                    setStatus("opened");

                                setLastUpdateTime(new Date().getTime())
                                
                            }}>
                                {(status === "opened") ? "Mark as Complete" : "Completed"}
                            </Button>
                        </div>
                        
                    )
                    }
                    </Container>
                </Col>
                
                <Col md={6}>
                    <Card>
                        <PreviewConsole output={consoleOutput}/>
                    </Card>
                </Col>
            </Row>
            
        </Container>
        </div>
    )
}
