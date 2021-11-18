import { useState } from "react";
import { fb } from "../service/firebase";
import { useHistory, Redirect, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import React from "react";
import FormField from "./FormField";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link as MaterialLink,
} from "@material-ui/core";
import { Card } from "react-bootstrap";

const paperStyle = {
  padding: 20,
  // height: "73vh",
  width: 400,
  margin: "0 auto",
};

export default function Login() {
  const history = useHistory();
  const [serverError, setServerError] = useState("");

  const defaultValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const login = ({ email, password }, { setSubmitting }) => {
    fb.auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (!res.user) {
          setServerError(
            "We're having trouble logging you in. Please try again."
          );
        }
      })
      .catch((err) => {
        if (err.code === "auth/wrong-password") {
          setServerError("Invalid credentials");
        } else if (err.code === "auth/user-not-found") {
          setServerError("No account for this email");
        } else {
          setServerError("Something went wrong :(");
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Paper style={paperStyle}>
        <div className="auth-form">
          <Grid align="center">
            <h2 className="my-4 font-weight-bold-display-4 ">Login</h2>
          </Grid>
          <Formik
            onSubmit={login}
            initialValues={defaultValues}
            validateOnMount={true}
            validationSchema={validationSchema}
          >
            {({ isValid, isSubmitting }) => {
              return (
                <Form>
                  <FormField
                    label="Email"
                    type="email"
                    name="email"
                  ></FormField>
                  <FormField
                    label="Password"
                    type="password"
                    name="password"
                  ></FormField>

                  <Grid container className="my-3">
                    <Typography>
                      Don't have an account yet ?{" "}
                      <MaterialLink>
                        <span
                          className="auth-link"
                          onClick={() => {
                            history.push("/signup");
                          }}
                        >
                          Sign Up!
                        </span>
                      </MaterialLink>
                    </Typography>
                  </Grid>

                  <button
                    className="btn btn-dark mt-3 align-items-center"
                    disabled={isSubmitting || !isValid}
                    type="submit"
                  >
                    {" "}
                    Login{" "}
                  </button>
                </Form>
              );
            }}
          </Formik>
          {!!serverError && <div className="error">{serverError}</div>}
        </div>
      </Paper>
    </Grid>
  );
}
