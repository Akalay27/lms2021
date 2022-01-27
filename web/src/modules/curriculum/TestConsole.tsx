import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import '../../utils/p5-javascript';
import { Col, Container, Row } from "react-bootstrap";
import Iframe from 'react-iframe'
import codePreview from '../../codePreview.js'
import '../../styles/problem.css'

export const TestConsole = () => {
    const [code, setCode] = useState("loading code...")
    const [previewCode, setPreviewCode] = useState(code);
    const [lastUpdateTime, setLastUpdateTime] = useState(new Date().getTime())

    useEffect(() => {
        const updatePreviewInterval = setInterval(() => {
            let newUpdateTime = new Date().getTime();
            if (newUpdateTime-lastUpdateTime > 1000) {
                setLastUpdateTime(newUpdateTime)
                setPreviewCode(code);
                console.log("Updating preview...")
            }
        }, 1000);
        return () => clearInterval(updatePreviewInterval);
    })

    

    return (
        <Container fluid>
            <Row>
                <Col md={6}>
                    <CodeMirror
                        value={code}
                        options={{
                            mode: 'javascript',
                            theme: 'material',
                            lineNumbers: true
                        }}
                        onBeforeChange={(editor, data, value) => {
                            setCode(value);
                        }}
                        onChange={(editor, data, value) => {
                            setLastUpdateTime(new Date().getTime());                        
                        }}
                    />
                </Col>
                <Col md={6}>
                    
                    <iframe 
                        title="Code Preview" 
                        sandbox="allow-scripts allow-pointer-lock allow-same-origin allow-popups allow-forms allow-modals allow-downloads"
                        srcDoc={codePreview.replace("{code}",previewCode)}
                    /> 
                </Col>
            </Row>
            
        </Container>
        
    )
}
