import * as React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Card, Container } from "react-bootstrap";

export default function BasicTable(props) {
  return (
    <Container className="mt-5 mb-5 ">
      <Card className="text-light bg-dark">
        <Card.Title align="center"> {props.caption} </Card.Title>
        <TableContainer className="bg-dark" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="text-light">Roll Number</TableCell>
                <TableCell align="right" className="text-light">
                  Name
                </TableCell>
                <TableCell align="right" className="text-light">
                  Branch
                </TableCell>
                <TableCell align="right" className="text-light">
                  Assigned Preference
                </TableCell>
                <TableCell align="right" className="text-light">
                  CGPA
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.tableData.map((student) => (
                <TableRow
                  key={student.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="text-light" component="th" scope="row">
                    {student.roll}
                  </TableCell>
                  <TableCell align="right" className="text-light">
                    {student.name}
                  </TableCell>
                  <TableCell align="right" className="text-light">
                    {student.branch}
                  </TableCell>
                  <TableCell align="right" className="text-light">
                    {student.assignedPreference}
                  </TableCell>
                  <TableCell align="right" className="text-light">
                    {student.cgpa}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}
