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
import "../../src/index.css";
import InputTextfield from "./InputTextfield";

function FormField(props) {
  return (
    // <label>
    //   {props.label}
    <>
      <label className="text-light">{props.label}</label>
      <div className="text-light">
        <Field as="input" type={props.type} name={props.name} fullWidth></Field>
        <ErrorMessage
          className="text-danger"
          component="div"
          name={props.name}
        ></ErrorMessage>
        {/* </label> */}
      </div>
    </>
  );
}
export default FormField;
