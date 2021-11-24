import { useCallback, useState, useEffect, useRef } from "react";
import CustomNavbar from "./CustomNavbar";
import { Container, Button, Card, Form, Row, Col } from "react-bootstrap";
import StudentDetailItem from "./StudentDetailItem";
import BasicTable from "./SchedulerTeacherTable";
import { Pie, defaults } from "react-chartjs-2";
import { FieldArray } from "formik";
import CreateNewForm from "./CreateNewForm";
import CustomOptions from "./CustomOptions";

export default function SchedulerTeacher() {
  const [details, setdetails] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [oddTableData, setOddTableData] = useState([]);
  const [evenTableData, setEvenTableData] = useState([]);
  const selectedBranchRef = useRef();
  const selectedFormRef = useRef();
  const [chartDataArray, setChartDataArray] = useState([]);
  const [chartThings, setChartThings] = useState(false);
  const [branchThings, setBranchThings] = useState(false);
  const [form, setForm] = useState("");
  const [formOptions, setFormOptions] = useState([]);
  const [preferenceOptions, setPreferenceOptions] = useState([]);

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
      console.log(tempFormOptions);
      setFormOptions([...tempFormOptions]);
    };
    fetchForms();
  }, []);

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

  const generateTablesHandler = () => {
    if (details.length > 0) {
      var arr = [...details];
      arr.sort((a, b) => (a.cgpa < b.cgpa ? 1 : -1));

      let max_val_odd = arr.length / 2;
      let max_val_even = arr.length - max_val_odd;
      let odd_count = 0;
      let even_count = 0;

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].preference === preferenceOptions[0]) {
          if (odd_count < max_val_odd) {
            arr[i] = { ...arr[i], assignedPreference: preferenceOptions[0] };
            odd_count++;
          } else {
            arr[i] = { ...arr[i], assignedPreference: preferenceOptions[1] };
            even_count++;
          }
        } else {
          if (even_count < max_val_even) {
            arr[i] = { ...arr[i], assignedPreference: preferenceOptions[1] };
            even_count++;
          } else {
            arr[i] = { ...arr[i], assignedPreference: preferenceOptions[0] };
            odd_count++;
          }
        }
      }
      let oddDayTable = [];
      let evenDayTable = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].assignedPreference === preferenceOptions[0]) {
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
      "https://working-chat-app-28c9d-default-rtdb.asia-southeast1.firebasedatabase.app/" +
        form +
        "/" +
        selectedBranch +
        ".json"
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    console.log(data);
    let option1Count = 0;
    let option2Count = 0;

    const studentList = [];
    for (const key in data) {
      studentList.push({
        id: key,
        ...data[key],
      });
      if (data[key].preference === preferenceOptions[0]) {
        option1Count++;
      } else {
        option2Count++;
      }
    }
    setChartDataArray([option1Count, option2Count]);
    setChartThings(true);
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

  const selectedFormHandler = (e) => {
    e.preventDefault();
    setForm(selectedFormRef.current.value);
    fetchPreferenceOptions(selectedFormRef.current.value);
    console.log(selectedFormRef.current.value);
    setBranchThings(true);
  };

  return (
    <>
      <CustomNavbar desk="Teacher's Desk"></CustomNavbar>
      <Container>
        <Row>
          <Col>
            <Container>
              <label className="my-4">
                <h3>Select the Preference form to view the results</h3>{" "}
              </label>

              <Form onSubmit={selectedFormHandler}>
                <Form.Select
                  aria-label="Default select example"
                  ref={selectedFormRef}
                  className="bg-dark text-light"
                >
                  <option>Select Form</option>
                  {formOptions.map((option) => {
                    return (
                      <CustomOptions
                        value={option}
                        text={option}
                      ></CustomOptions>
                    );
                  })}
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
            </Container>
          </Col>
          <Col>
            <CreateNewForm></CreateNewForm>
          </Col>
        </Row>
      </Container>
      {branchThings && (
        <Container>
          <label className="my-4">
            <h3>Select the branch below to view responses of the students</h3>{" "}
          </label>

          <Form onSubmit={handlebranchSelect}>
            <Form.Select
              aria-label="Default select example"
              ref={selectedBranchRef}
              className="bg-dark text-light"
            >
              <option>Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
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
        </Container>
      )}
      {/* <Card>
        <Button onClick={fetchStudentHandler}>Fetch Student preferences</Button>
      </Card> */}

      <Container>
        <Row>
          <Col sm={8}>
            {" "}
            <Container className="d-flex my-4 infoCards"> {content}</Container>
          </Col>
          <Col sm={4}>
            <div className="my-4">
              <Pie
                data={{
                  labels: [...preferenceOptions],
                  datasets: [
                    {
                      label: "# of votes",
                      data: [...chartDataArray],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                height={400}
                width={600}
                options={{
                  maintainAspectRatio: false,
                  // scales: {
                  //   yAxes: [
                  //     {
                  //       ticks: {
                  //         beginAtZero: true,
                  //       },
                  //     },
                  //   ],
                  // },
                  legend: {
                    labels: {
                      fontSize: 25,
                    },
                  },
                  plugins: {
                    title: {
                      display: chartThings,
                      color: "#e6e6e6",
                      text: "Graphs stating preference of students",
                    },
                    legend: {
                      display: chartThings,
                    },
                  },
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>

      {chartThings && (
        <Container className="d-flex justify-content-center">
          <Button variant="danger text-light" onClick={generateTablesHandler}>
            Assign Preferences according to CGPA
          </Button>{" "}
        </Container>
      )}

      {/* {tableData.length > 0 && <BasicTable tableData={tableData} caption="List of students"></BasicTable>} */}
      {oddTableData.length > 0 && (
        <BasicTable
          tableData={oddTableData}
          caption="Assigned Preference 1"
        ></BasicTable>
      )}
      {evenTableData.length > 0 && (
        <BasicTable
          tableData={evenTableData}
          caption="Assigned Preference 2"
        ></BasicTable>
      )}
    </>
  );
}
