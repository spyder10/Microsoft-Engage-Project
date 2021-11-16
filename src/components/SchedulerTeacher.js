import { useCallback, useState, useEffect, useRef } from "react";
import CustomNavbar from "./CustomNavbar";
import { Container, Button, Card, Form } from "react-bootstrap";
import StudentDetailItem from "./StudentDetailItem";
import BasicTable from "./SchedulerTeacherTable";
import { FieldArray } from "formik";

export default function SchedulerTeacher() {
  const [details, setdetails] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [oddTableData, setOddTableData] = useState([]);
  const [evenTableData, setEvenTableData] = useState([]);
  const selectedBranchRef = useRef();

  const generateTablesHandler = () => {
    if (details.length > 0) {
      var arr = [...details];
      arr.sort((a, b) => (a.cgpa < b.cgpa ? 1 : -1));

      let max_val_odd = arr.length / 2;
      let max_val_even = arr.length - max_val_odd;
      let odd_count = 0;
      let even_count = 0;

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].preference === "oddDay") {
          if (odd_count < max_val_odd) {
            arr[i] = { ...arr[i], assignedPreference: "Odd Day" };
            odd_count++;
          } else {
            arr[i] = { ...arr[i], assignedPreference: "Even Day" };
            even_count++;
          }
        } else {
          if (even_count < max_val_even) {
            arr[i] = { ...arr[i], assignedPreference: "Even Day" };
            even_count++;
          } else {
            arr[i] = { ...arr[i], assignedPreference: "Odd Day" };
            odd_count++;
          }
        }
      }
      let oddDayTable = [];
      let evenDayTable = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].assignedPreference === "Odd Day") {
          oddDayTable.push({ ...arr[i] });
        } else {
          evenDayTable.push({ ...arr[i] });
        }
      }
      console.log(oddDayTable);
      console.log(evenDayTable);
      console.log(arr);
      setTableData([...arr]);
      setOddTableData([...oddDayTable]);
      setEvenTableData([...evenDayTable]);
    }
  };

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
      <Button variant="outline-primary" onClick={generateTablesHandler}>
        Generate tables
      </Button>{" "}
      {/* {tableData.length > 0 && <BasicTable tableData={tableData} caption="List of students"></BasicTable>} */}
      {oddTableData.length > 0 && (
        <BasicTable
          tableData={oddTableData}
          caption="Attendence Sheet for Odd-Days(Mon/Wed/Fri)"
        ></BasicTable>
      )}
      {evenTableData.length > 0 && (
        <BasicTable
          tableData={evenTableData}
          caption="Attendence Sheet for Even-Days(Tue/Thu/Sat)"
        ></BasicTable>
      )}
    </>
  );
}
