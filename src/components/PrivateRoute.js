import { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useResolved } from "../hooks/useResolved";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  const content = (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
  console.log(content);
  return { content };
}
