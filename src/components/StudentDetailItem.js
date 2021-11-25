import React from "react";
import { Card } from "react-bootstrap";

export default function StudentDetailItem(props) {
  return (
    <>
      <Card className="mx-3 my-2" bg="dark" text="light">
        <Card.Body>
          <Card.Title>{props.name.toUpperCase()}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.branch}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {props.roll}
          </Card.Subtitle>
          <Card.Text>
            GPA: {props.cgpa} <br></br> Preference: {props.preference}{" "}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
