import { Field, ErrorMessage } from "formik";
import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";

function FormField(props) {
  return (
    // <label>
    //   {props.label}
    <>
      <Field
        as={TextField}
        label={props.label}
        type={props.type}
        name={props.name}
        fullWidth
      ></Field>
      <ErrorMessage
        className="error"
        component="div"
        name={props.name}
      ></ErrorMessage>
      {/* </label> */}
    </>
  );
}
export default FormField;
