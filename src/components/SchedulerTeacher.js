import { useCallback, useState, useEffect, useRef } from "react";
import CustomNavbar from "./CustomNavbar";
import { Container, Button, Card, Form } from "react-bootstrap";
import StudentDetailItem from "./StudentDetailItem";

export default function SchedulerTeacher() {
  const [details, setdetails] = useState([]);
  const selectedBranchRef = useRef();

  const fetchStudentHandler = async (selectedBranch) => {
    const response = await fetch(
      "https://working-chat-app-28c9d-default-rtdb.asia-southeast1.firebasedatabase.app/studentDetails/" +
        selectedBranch +
        ".json"
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();

    const studentList = [];
    for (const key in data) {
      studentList.push({
        id: key,
        ...data[key],
      });
    }

    setdetails(studentList);
  };
  const content = details.map((studentData) => {
    return (
      <StudentDetailItem
        {...studentData}
        key={studentData.id}
      ></StudentDetailItem>
    );
  });
  const handlebranchSelect = (e) => {
    e.preventDefault();
    fetchStudentHandler(selectedBranchRef.current.value);
  };
  return (
    <>
      <CustomNavbar></CustomNavbar>
      <Container>
        <Form onSubmit={handlebranchSelect}>
          <Form.Select
            aria-label="Default select example"
            ref={selectedBranchRef}
          >
            <option>Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
          </Form.Select>
          <Button className="w-100 mt-3" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
      {/* <Card>
        <Button onClick={fetchStudentHandler}>Fetch Student preferences</Button>
      </Card> */}
      <Card>{content}</Card>
    </>
  );
}
