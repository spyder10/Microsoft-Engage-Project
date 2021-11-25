import { useState } from "react";
import { fb } from "../service/firebase";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import React from "react";
import FormField from "./FormField";
import Typed from "react-typed";
import {
  Grid,
  Paper,
  Typography,
  Link as MaterialLink,
} from "@material-ui/core";
import "../../src/index.css";

const paperStyle = {
  padding: 20,
  background: "#000000",
  opacity: "0.7",
  color: "white",
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

  //Validations of the entered email and password using YUP
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
    <>
      <header className="showcase">
        <div className="showcase-top row">
          <h1 className="text-danger text-center mt-3">Scheduler</h1>
        </div>
        <div className="showcase-content box">
          <h2 className="text-danger">
            Microsoft Engage Mentorship Program 2021
          </h2>
          <Typed
            className="typed-text"
            strings={[
              "Take Preference Surveys",
              "Visualize Student Preferences",
              "Benificial for 50% Attendence Model",
              "Collaborate with students",
              "Make Preference/Attendence Sheets",
            ]}
            typeSpeed={40}
            backspeed={60}
            loop
          />
        </div>
        <div className="bg-col">
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            style={{
              minHeight: "100vh",
              zIndex: 90,
              position: "absolute",
              maxWidth: "450px",
              height: "630px",
              marginLeft: "50%",
              borderRadius: "10px",
              boxSizing: "border-box",
              transform: "translateX(-50%) translateY(10%)",
            }}
          >
            <Paper style={paperStyle}>
              <div>
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
                                className="auth-link text-danger font-weight-bold"
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
                          className="btn btn-dark mt-3"
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
        </div>
      </header>
      <footer class="footer">
        <h6 className="text-center mt-4">Contact Us</h6>
      </footer>
    </>
  );
}
