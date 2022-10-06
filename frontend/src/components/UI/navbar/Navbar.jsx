import React, {useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from "../../../context"
import MyButton from '../button/MyButton'
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap'

const MyNavbar = function () {
  const {isAuth, setIsAuth} = useContext(AuthContext)

  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem('auth')
  }

	return(
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">OpenWEC</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/sources">
              <Nav.Link>Sources</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/data">
              <Nav.Link>Data</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/posts">
              <Nav.Link>Posts</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

	)
}

export default MyNavbar


