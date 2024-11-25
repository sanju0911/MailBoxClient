import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ fontWeight: "bold", fontSize: "1.5rem" }}
        >
          MyApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/home" className="mx-2">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="mx-2">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="mx-2">
              Signup
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
