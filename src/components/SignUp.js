import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import FormField from "../components/FormField";
import * as Yup from "yup";
import { Card, Container } from "react-bootstrap";
import { useState } from "react";
import { fb } from "../service/firebase";
import Typed from "react-typed";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link as MaterialLink,
} from "@material-ui/core";

function SignUp() {
  const history = useHistory();
  const [serverError, setServerError] = useState("");

  const defaultValues = {
    email: "",
    password: "",
    userName: "",
    verifyPassword: "",
  };
  const paperStyle = {
    padding: 20,
    // height: "73vh",
    background: "#000000",
    opacity: "0.7",
    color: "white",
    width: 400,
    margin: "0 auto",
  };

  const validationSchema = Yup.object().shape({
    role: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Must be at least 8 characters"),
    verifyPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    userName: Yup.string()
      .required("Required")
      .matches(/^\S*$/, "No spaces")
      .min(3, "Must be at least 3 characters"),
  });

  const signup = ({ email, userName, password, role }, { setSubmitting }) => {
    fb.auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        if (res?.user?.uid) {
          fetch("/api/createUser", {
            method: "POST",
            body: JSON.stringify({
              userName,
              userId: res.user.uid,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((body) => {
            fb.firestore
              .collection("chatUsers")
              .doc(res.user.uid)
              .set({ userName, avatar: "", role, isfilled: false });
          });
        } else {
          setServerError(
            "We're having trouble signing you up. Please try again."
          );
        }
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          setServerError("An account with this email already exists");
        } else {
          setServerError(
            "We're having trouble signing you up. Please try again."
          );
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
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
          justifyContent="center"
          alignItems="center"
          style={{
            minHeight: "100vh",
            zIndex: 90,
            position: "relative",
            maxWidth: "450px",
            height: "630px",
            marginLeft: "50%",
            borderRadius: "10px",
            boxSizing: "border-box",
            transform: "translateX(-50%)",
          }}
        >
          <Paper style={paperStyle}>
            <div className="auth-form">
              <Grid align="center">
                <h2 className="my-4 font-weight-bold-display-4 ">Sign Up</h2>
              </Grid>

              <Formik
                onSubmit={signup}
                validateOnMount={true}
                initialValues={defaultValues}
                validationSchema={validationSchema}
              >
                {({ isValid, isSubmitting }) => {
                  return (
                    <Form>
                      <FormField
                        label="User Name"
                        type="text"
                        name="userName"
                      ></FormField>
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
                      <FormField
                        label="Verify Password"
                        type="password"
                        name="verifyPassword"
                      ></FormField>
                      {/* <FormField
                        label="Role"
                        type="text"
                        name="role"
                      ></FormField> */}
                      <div className="text-light">
                        <label>Role (Student/Teacher)</label>
                        <Field
                          as="select"
                          name="role"
                          fullWidth
                          className="bg-dark text-light mx-3 my-3 dropdown btn  btn-secondary"
                        >
                          <option className="dropdown-item text-light">
                            Select Role
                          </option>
                          <option
                            className="dropdown-item text-light"
                            value="student"
                          >
                            Student
                          </option>
                          <option
                            className="dropdown-item text-light"
                            value="teacher"
                          >
                            Teacher
                          </option>
                        </Field>
                        <ErrorMessage
                          className="text-danger"
                          component="div"
                          name="role"
                        ></ErrorMessage>
                      </div>
                      <Grid container className="my-3">
                        <Typography>
                          Already got an account?{" "}
                          <MaterialLink>
                            <span
                              className="auth-link text-danger font-weight-bold"
                              onClick={() => history.push("/login")}
                            >
                              Log In!
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
                        SignUp{" "}
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
  );
}
export default SignUp;
