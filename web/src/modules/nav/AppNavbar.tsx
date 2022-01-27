import React from "react"
import { Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"


export const AppNavbar = (props) => {
    return (
        <>
            <Navbar style=
            {{display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            }}bg="primary" variant="dark" expand="lg" sticky="top">
                <Link to="/">
                {props.showLogo &&
                <Navbar.Brand>
                    <img
                        src="./logo192.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="coding camp logo"
                    />
                </Navbar.Brand>}
                <Navbar.Brand>{/*⌨️*/}{props.title}{/*🖥️*/}</Navbar.Brand>
                {/* <Navbar.Text><strong>2021 Sessions!</strong></Navbar.Text> */}
                </Link>
            </Navbar>
        </>
    )
}