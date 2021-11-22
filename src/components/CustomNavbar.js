import {
  Navbar,
  Container,
  NavDropdown,
  Nav,
  NavbarBrand,
} from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import { useChat } from "../context/ChatContext";

import React from "react";

export default function CustomNavbar(props) {
  const { chatConfig } = useChat();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">
          <h1 className="text-danger">Scheduler</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Select Branch" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another Action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Something else
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Avatar
              className="mx-2"
              sx={{ height: "70px", width: "70px" }}
            ></Avatar>
            <Navbar.Brand className="text-light">
              <h4>
                {" "}
                {chatConfig
                  ? chatConfig.userName.charAt(0).toUpperCase() +
                    chatConfig.userName.slice(1)
                  : " "}{" "}
              </h4>
            </Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
