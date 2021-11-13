import { Field, ErrorMessage } from "formik";
import React from "react";

function FormField(props) {
  return (
    <label>
      {props.label}

      <Field type={props.type} name={props.name}></Field>
      <ErrorMessage
        className="error"
        component="div"
        name={props.name}
      ></ErrorMessage>
    </label>
  );
}
export default FormField;
