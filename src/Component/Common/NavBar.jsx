import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function NavBar() {
  return (
      <Navbar bg="light" expand="lg">
          <Container>
              <Navbar.Brand href="/">User Management</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                      <Nav.Link href="/users">Users</Nav.Link>
                      <Nav.Link href="/students">Students</Nav.Link>
                    
                  </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>
  );
}

export default NavBar