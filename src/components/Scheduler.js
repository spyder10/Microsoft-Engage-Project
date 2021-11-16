import { useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useChat } from "../context/ChatContext";
import { getChat } from "react-chat-engine";
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
} from "react-bootstrap";

export default function Scheduler() {
  const { authUser } = useAuth();
  const nameRef = useRef();
  const branchRef = useRef();
  const rollRef = useRef();
  const cgpaRef = useRef();
  const vaccinationStatusRef = useRef();
  const preferenceRef = useRef();

  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  async function addDetailHandler(student) {
    const response = await fetch(
      "https://working-chat-app-28c9d-default-rtdb.asia-southeast1.firebasedatabase.app/studentDetails.json",
      {
        method: "POST",
        body: JSON.stringify(student),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setLoading(true);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const student = {
      roll: rollRef.current.value,
      branch: branchRef.current.value,
      name: nameRef.current.value,
      cgpa: cgpaRef.current.value,
      vaccinationStatus: vaccinationStatusRef.current.value,
      preference: preferenceRef.current.value,
    };

    rollRef.current.value = "";
    nameRef.current.value = "";
    branchRef.current.value = "";
    cgpaRef.current.value = "";
    vaccinationStatusRef.current.value = "Choose your vaccination status";
    preferenceRef.current.value = "Choose your preference";

    addDetailHandler(student);
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Scheduler</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="center">
        <Card
          className="mt-4"
          style={{
            width: "50rem",
          }}
        >
          <Card.Body>
            <h2>Fill your preference</h2>
            <div className="mb-3">
              Your Prefernce of visiting college (odd-days/even-days) is being
              recorded here. Based on your GPA, you will be awarded your
              preference.{" "}
            </div>
            {isLoading && (
              <Alert variant="danger">Your responses have been submitted</Alert>
            )}
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" id="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" ref={nameRef} required />
              </Form.Group>
              <Form.Group className="mb-3" id="branch">
                <Form.Label>Branch</Form.Label>
                <Form.Control type="text" ref={branchRef} required />
              </Form.Group>
              <Form.Group className="mb-3" id="roll">
                <Form.Label>Roll Number</Form.Label>
                <Form.Control type="text" ref={rollRef} required />
              </Form.Group>
              <Form.Group className="mb-3" id="CGPA">
                <Form.Label>CGPA</Form.Label>
                <Form.Control type="text" ref={cgpaRef} required />
              </Form.Group>
              <Form.Select
                required
                ref={vaccinationStatusRef}
                className="mb-3"
                id="vaccinationStatus"
                size="lg"
              >
                <option>Choose your vaccination status</option>
                <option value="notVaccinated">Not Vaccinated</option>
                <option value="partiallyVaccinated">
                  Partially Vaccinated
                </option>
                <option value="fullyVaccinated">Fully Vaccinated</option>
              </Form.Select>
              <Form.Select
                required
                ref={preferenceRef}
                className="mb-3"
                aria-label="Preference"
                size="lg"
              >
                <option>Choose your preference</option>
                <option value="oddDay">Odd-Day</option>
                <option value="evenDay">Even-Day</option>
              </Form.Select>
              <Button disabled={isLoading} className="w-100 mt-3" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
