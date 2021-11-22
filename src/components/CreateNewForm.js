import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useChat } from "../context/ChatContext";
import { getChat } from "react-chat-engine";
import CustomNavbar from "./CustomNavbar";
import { fb } from "../service/firebase";
import {
  Navbar,
  Card,
  Form,
  FormGroup,
  Button,
  Alert,
  Container,
  Nav,
  NavDropdown,
  Row,
  Col,
} from "react-bootstrap";

export default function CreateNewForm() {
  const nameRef = useRef();
  const firstOptionRef = useRef();
  const secondOptionRef = useRef();

  async function addIntoForms(newForm) {
    const response = await fetch(
      "https://working-chat-app-28c9d-default-rtdb.asia-southeast1.firebasedatabase.app/forms/" +
        newForm.name +
        ".json",
      {
        method: "POST",
        body: JSON.stringify(newForm),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(
      nameRef.current.value,
      firstOptionRef.current.value,
      secondOptionRef.current.value
    );

    const newForm = {
      name: nameRef.current.value,
      option1: firstOptionRef.current.value,
      option2: secondOptionRef.current.value,
    };

    nameRef.current.value = "";
    firstOptionRef.current.value = "";
    secondOptionRef.current.value = "";

    addIntoForms(newForm);
  };
  return (
    <>
      <Container>
        <Row className=" justify-content-center align-self-center">
          <Col
            xs={8}
            className="mx-auto justify-content-center align-self-center"
          >
            <Card
              className="mt-4"
              // style={{
              //   width: "50rem",
              // }}
              bg="dark"
              text="light"
            >
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" id="name">
                    <Form.Label>Name of the Form</Form.Label>
                    <Form.Control
                      className="form-bg-student"
                      type="text"
                      ref={nameRef}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" id="firstOption">
                    <Form.Label>1st Option</Form.Label>
                    <Form.Control
                      className="form-bg-student"
                      type="text"
                      ref={firstOptionRef}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" id="secondOption">
                    <Form.Label>2nd Option</Form.Label>
                    <Form.Control
                      className="form-bg-student"
                      type="text"
                      ref={secondOptionRef}
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="danger text-light"
                    className="w-100 mt-3"
                    type="submit"
                  >
                    Create New Preference Form
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
