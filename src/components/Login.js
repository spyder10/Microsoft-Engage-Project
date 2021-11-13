import { useState } from "react";
import { fb } from "../service/firebase";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import React from "react";
import FormField from "./FormField";

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
    <div className="auth-form">
      <h1>Login</h1>
      <Formik
        onSubmit={login}
        initialValues={defaultValues}
        validateOnMount={true}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => {
          return (
            <Form>
              <FormField label="Email" type="email" name="email"></FormField>
              <FormField
                label="Password"
                type="password"
                name="password"
              ></FormField>

              <div className="auth-link-container">
                Don't have an account yet ?{" "}
                <span
                  className="auth-link"
                  onClick={() => {
                    history.push("/signup");
                  }}
                >
                  Sign Up!
                </span>
              </div>

              <button disabled={isSubmitting || !isValid} type="submit">
                {" "}
                Login{" "}
              </button>
            </Form>
          );
        }}
      </Formik>
      {!!serverError && <div className="error">{serverError}</div>}
    </div>
  );
}
