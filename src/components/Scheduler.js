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
import CustomOptions from "./CustomOptions";

export default function Scheduler() {
  const { authUser } = useAuth();
  const { chatConfig } = useChat();
  const nameRef = useRef();
  const branchRef = useRef();
  const rollRef = useRef();
  const cgpaRef = useRef();
  const vaccinationStatusRef = useRef();
  const preferenceRef = useRef();
  const selectedFormRef = useRef();
  const [formOptions, setFormOptions] = useState([]);
  const [preferenceOptions, setPreferenceOptions] = useState([]);

  useEffect(() => {
    console.log(formOptions);
  }, [formOptions]);

  useEffect(() => {
    const fetchForms = async () => {
      const response = await fetch(
        "https://working-chat-app-28c9d-default-rtdb.asia-southeast1.firebasedatabase.app/forms.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      let tempFormOptions = [];
      let tempPreferenceOptions = [];

      for (const key in data) {
        tempFormOptions.push(key);
      }

      setFormOptions([...tempFormOptions]);
    };
    fetchForms();
  }, []);

  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  async function addDetailHandler(student) {
    const response = await fetch(
      "https://working-chat-app-28c9d-default-rtdb.asia-southeast1.firebasedatabase.app/" +
        selectedFormRef.current.value +
        "/" +
        student.branch +
        ".json",
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

    fb.firestore
      .collection("chatUsers")
      .doc(authUser.uid)
      .update({ isfilled: true });

    addDetailHandler(student);
  };

  const fetchPreferenceOptions = async (selectedForm) => {
    const response = await fetch(
      "https://working-chat-app-28c9d-default-rtdb.asia-southeast1.firebasedatabase.app/forms/" +
        selectedForm +
        "/.json"
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();

    let tempPreferenceOptions = [];
    for (const key in data) {
      tempPreferenceOptions.push(data[key].option1);
      tempPreferenceOptions.push(data[key].option2);
    }
    console.log(tempPreferenceOptions);
    setPreferenceOptions([...tempPreferenceOptions]);
  };
  const selectedFormSubmitHandler = (e) => {
    e.preventDefault();
    console.log(selectedFormRef.current.value);
    fetchPreferenceOptions(selectedFormRef.current.value);
  };

  return (
    <>
      <CustomNavbar desk="Student's Desk"></CustomNavbar>
      <Container>
        <Row className=" justify-content-center align-self-center">
          <Col xs={8} className="mx-auto">
            <label className="my-4">
              <h3>Select the form to fill your preference</h3>{" "}
            </label>

            <Form onSubmit={selectedFormSubmitHandler}>
              <Form.Select
                aria-label="Default select example"
                ref={selectedFormRef}
                className="bg-dark text-light"
              >
                <option>Select Form</option>
                {formOptions.map((option) => {
                  return (
                    <CustomOptions value={option} text={option}></CustomOptions>
                  );
                })}

                {/* <CustomOptions
                  value={formOptions[1]}
                  text={formOptions[1]}
                ></CustomOptions> */}
              </Form.Select>
              <Container className="d-flex justify-content-center">
                <Button
                  className="mt-3 btn-outline-dark text-light"
                  variant="danger"
                  type="submit"
                >
                  Submit
                </Button>
              </Container>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className=" justify-content-center align-self-center">
          <Col xs={8} className="mx-auto">
            <Card
              className="mt-4"
              // style={{
              //   width: "50rem",
              // }}
              bg="dark"
              text="light"
            >
              <Card.Body>
                <h2 className="text-light">Fill your preference</h2>
                <div className="mb-3">
                  Your Prefernce of visiting college (odd-days/even-days) is
                  being recorded here. Based on your GPA, you will be awarded
                  your preference.{" "}
                </div>
                {chatConfig && chatConfig.isfilled && (
                  <Alert variant="danger">
                    We got your response. Thank you for filling the form.
                  </Alert>
                )}
                {/* {isLoading && (
              <Alert variant="danger">Your responses have been submitted</Alert>
            )} */}
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" id="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      className="form-bg-student"
                      type="text"
                      ref={nameRef}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" id="branch">
                    <Form.Label>Branch</Form.Label>
                    <Form.Control
                      className="form-bg-student"
                      type="text"
                      ref={branchRef}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" id="roll">
                    <Form.Label>Roll Number</Form.Label>
                    <Form.Control
                      className="form-bg-student"
                      type="text"
                      ref={rollRef}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" id="CGPA">
                    <Form.Label>CGPA</Form.Label>
                    <Form.Control
                      className="form-bg-student"
                      type="text"
                      ref={cgpaRef}
                      required
                    />
                  </Form.Group>
                  <Form.Select
                    required
                    ref={vaccinationStatusRef}
                    className="mb-3 form-bg-student"
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
                    className="mb-3 form-bg-student"
                    aria-label="Preference"
                    size="lg"
                  >
                    <option>Choose your preference</option>
                    <CustomOptions
                      value={preferenceOptions[0]}
                      text={preferenceOptions[0]}
                    ></CustomOptions>
                    <CustomOptions
                      value={preferenceOptions[1]}
                      text={preferenceOptions[1]}
                    ></CustomOptions>
                  </Form.Select>
                  <Button
                    variant="danger text-light"
                    disabled={isLoading || (chatConfig && chatConfig.isfilled)}
                    className="w-100 mt-3"
                    type="submit"
                  >
                    Submit
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
