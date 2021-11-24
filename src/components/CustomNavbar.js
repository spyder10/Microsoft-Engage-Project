import {
  Navbar,
  Container,
  Badge,
  NavDropdown,
  Button,
  Nav,
  NavbarBrand,
} from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import { useChat } from "../context/ChatContext";
import { Link } from "react-router-dom";
import { fb } from "../service/firebase";

import React from "react";

export default function CustomNavbar(props) {
  const { chatConfig } = useChat();
  const logOutHandler = () => {
    fb.auth.signOut();
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">
          <h1 className="text-danger">Scheduler</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <h5 className="mt-2 mx-4">
              <Link to="/" className="text-decoration-none">
                Chat Room{" "}
              </Link>
            </h5>
            <h3>
              <Badge bg="secondary">{props.desk}</Badge>
            </h3>
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
            <Button
              className="btn-outline-dark text-light"
              variant="secondary"
              onClick={logOutHandler}
            >
              Log Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
