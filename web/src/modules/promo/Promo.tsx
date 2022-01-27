import React from "react"
import { Col, Container, Row, Image, Jumbotron, Card, ListGroup } from "react-bootstrap"
import { LoginAndRegister } from "../user/LoginAndRegister"
import { ReferralTracker } from "../user/ReferralTracker"
import './promo.css'

export const Promo = () => {
    return (
        <div className="codingcamp">
            <Container>
                    <ReferralTracker/>
                    <Card style={{marginTop: '100px', marginBottom: '100px', borderWidth: '3px', borderRadius: '8px'}}as={Col} md={{span: 8, offset: 2}}>
                        <h1>Creative Coding with JavaScript</h1>
                        <h4 style={{color: '#889888'}}>Summer 2021</h4>
                    </Card>
                    
                    <Container>
                        
                        <Row>
                            <Col md={{span: 6, order: 6}}  className="my-auto">
                                <h2>What is it?</h2>
                                <p style={{textAlign: 'left'}}>This camp will teach students in the 6th-8th grade how to create 
                                 apps and games using JavaScript!
                                The campers will learn the fundamentals of coding
                                and create unique projects using a graphical environment called <a href="http://p5js.org">p5js</a>. Each day, 
                                the campers will learn the process of planning a project, writing code, testing, and discussing 
                                their solutions. The camp will take place entirely online, 
                                using Zoom and my learning platform to have daily discussions, working time,
                                and time to ask questions. This session will be fun for students who 
                                took my camp last year, and also for those new to coding!</p>
                            </Col>
                            <Col xs={{order: 12}} md={{span:6, order:12}} className="my-auto">
                                <Image src="./promo/ocean.jpg" fluid rounded/>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col xs={{order: 12}} md={{span:6, order:1}} className="my-auto">
                                <Image src="./promo/trees.jpg" fluid rounded/>
                            </Col>
                            <br/>
                            <Col md={{span: 6, order: 6}} className="my-auto">
                                <h2>Project-Based Activities</h2>
                                <p style={{textAlign: 'left'}}>The camp will be filled with lots of different projects, 
                                meaning that campers will leave with a strong understanding of how to make their own JavaScript programs. This camp website is used alongside our Zoom calls and includes examples, 
                                interactive activities,  
                                exercises to work on outside of class,
                                and resources to help build coding skills after this summer session.
                                </p>
                                <h4>
                                    Here's some of the topics campers will learn!
                                </h4>
                                <ul style={{paddingLeft: 20, textAlign: 'left'}}>
                                    <li>JavaScript Commands</li>
                                    <li>Control-Flow Programming</li>
                                    <li>User Interaction</li>
                                    <li>Graphics</li>
                                    <li>Top Down Design</li>
                                </ul>
                            </Col>
                        </Row>
                        
                        <hr/>
                        <h2>What Students and Parents Say</h2>
                        
                        <Row>
                            <Col md={4} className="mx-auto my-auto customer-quote">
                                <h4 style={{color: '#89D0EF', textAlign: 'center'}}>
                                <strong style={{fontFamily: 'open-sans', fontStyle: ''}}>"</strong>
                                I really enjoyed Adam's coding camp. I learned a lot and can't wait to do it again this summer!
                                <strong style={{ fontFamily: 'open-sans', fontStyle: ''}}>"</strong>
                                </h4>
                                <h5 style={{textAlign: 'right'}}>- Hazel, Student</h5>
                            </Col>
                            
                            <Col md={4} className="mx-auto my-auto customer-quote">
                                <h4 style={{color: '#B789EF', textAlign: 'center'}}>
                                <strong style={{fontFamily: 'open-sans', fontStyle: ''}}>"</strong>
                                Adam put together a curriculum that was both challenging and fun for my middle schooler! He learned many important skills while having fun with his friends.
                                <strong style={{ fontFamily: 'open-sans', fontStyle: ''}}>"</strong>
                                </h4>
                                <h5 style={{textAlign: 'right'}}>- Roxana, Parent</h5>
                            </Col>
                            
                            <Col md={4} className="mx-auto my-auto customer-quote">
                                <h4 style={{color: '#89D0EF', textAlign: 'center'}}>
                                <strong style={{fontFamily: 'open-sans', fontStyle: ''}}>"</strong>
                                This camp was fun and engaging and I learned lots of useful knowledge about coding.
                                <strong style={{ fontFamily: 'open-sans', fontStyle: ''}}>"</strong>
                                </h4>
                                <h5 style={{textAlign: 'right'}}>- Henry, Student</h5>
                            </Col>
                            
                        </Row>
                        <hr/>
                        <Row>
                            <Col md={12} className="my-auto">
                                <h2>More Details</h2>
                                <ul style={{paddingLeft: 20, textAlign: 'left'}}>
                                    <li>Session is 5 days, Monday through Friday, 2 hours a day from 10am-12pm</li>
                                    <li>Weeks of June 28th, July 26th, and August 2nd</li>
                                    <li>Curriculum will be taught via Zoom and camp.bigoaklabs.com, with online activites to complete outside of class.</li>
                                    <li>$129 per student</li>
                                </ul>
                                <p>If you have any questions, feel free to contact me at <a href="mailto:adam@kalayjian.org">adam@kalayjian.org</a>!</p>
                            </Col>
                        </Row>
                        
                        <LoginAndRegister></LoginAndRegister>
                        <hr/>
                        
                        <Row>
                            
                            <Col xs md={9} className="mx-auto my-2">
                                <div className="row h-100">
                                <div id="col" className="col-md-12 my-auto">
                                <p>Hi! I'm Adam Kalayjian. 
                                    I've worked with many programming languages including JavaScript, Java, and Python, created a wide variety of programming projects 
                                    and assisted in multiple coding classes including AP Computer Science A and Advanced Computer Science Structure and Interpretation.
                                    I will graduate from Carlmont High School in June and will be attending Worcester Polytechnic Institute in the fall.
                                </p>
                                <a href="https://bigoaklabs.com">You can check out some of my projects here.</a>
                                </div>
                                </div>
                            </Col>
                            <Col md={3}>
                                <Image src="./promo/me-lowres.jpg" fluid rounded/>
                            </Col>
                        </Row>
                        
                        <br></br>
                        <p></p>
                    </Container>
            </Container>
        </div>
    )
}