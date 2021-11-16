import React from "react";
import { Card } from "react-bootstrap";

export default function StudentDetailItem(props) {
  console.log(props.name);
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.branch}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {props.roll}
          </Card.Subtitle>
          <Card.Text>{props.preference}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
