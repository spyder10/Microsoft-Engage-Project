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
    <Container className="mt-3 mb-3">
      <Card>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <caption>{props.caption}</caption>
            <TableHead>
              <TableRow>
                <TableCell>Roll Number</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Branch</TableCell>
                <TableCell align="right">Assigned Preference</TableCell>
                <TableCell align="right">CGPA</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.tableData.map((student) => (
                <TableRow
                  key={student.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {student.roll}
                  </TableCell>
                  <TableCell align="right">{student.name}</TableCell>
                  <TableCell align="right">{student.branch}</TableCell>
                  <TableCell align="right">
                    {student.assignedPreference}
                  </TableCell>
                  <TableCell align="right">{student.cgpa}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}
