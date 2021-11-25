import { Field, ErrorMessage } from "formik";
import React from "react";
import "../../src/index.css";

function FormField(props) {
  return (
    <>
      <label className="text-light">{props.label}</label>
      <div className="text-light">
        <Field as="input" type={props.type} name={props.name} fullWidth></Field>
        <ErrorMessage
          className="text-danger"
          component="div"
          name={props.name}
        ></ErrorMessage>
      </div>
    </>
  );
}
export default FormField;
