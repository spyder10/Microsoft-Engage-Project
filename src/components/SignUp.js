import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import FormField from "../components/FormField";
import * as Yup from "yup";
import { Card, Container } from "react-bootstrap";
import { useState } from "react";
import { fb } from "../service/firebase";
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
    width: 400,
    margin: "0 auto",
  };

  const validationSchema = Yup.object().shape({
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
                  <FormField label="Role" type="text" name="role"></FormField>

                  <Grid container className="my-3">
                    <Typography>
                      Already got an account?{" "}
                      <MaterialLink>
                        <span
                          className="auth-link"
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
  );
}
export default SignUp;
