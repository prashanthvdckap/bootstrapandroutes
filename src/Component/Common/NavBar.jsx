import React, { useContext } from 'react'
import { Container, Nav, Navbar } from "react-bootstrap";
import { UserContext } from '../../Context/UserContext';

function NavBar() {
    const { user } = useContext(UserContext);
    console.log(user)
  return (
      <Navbar bg="light" expand="lg">
          <Container>
              <Navbar.Brand href="/">User Management</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                      <Nav.Link href="/users">Users {user.length > 0 ? user[0].firstName.value : ""}</Nav.Link>
                      <Nav.Link href="/students">Students</Nav.Link>
                    
                  </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>
  );
}

export default NavBar