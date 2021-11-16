import { useEffect, useState } from "react";
import { Link, Route, Switch, useHistory, Redirect } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import { useResolved } from "../hooks/useResolved";
import Login from "./Login";
import SignUp from "./SignUp";
import Chat from "./Chat";
import { ChatProvider } from "../context/ChatContext";
import Scheduler from "./Scheduler";
import PrivateRoute from "./PrivateRoute";
import useAuth from "../hooks/useAuth";

function App() {
  // const { authUser } = useAuth();
  // const authResolved = useResolved();

  // const history = useHistory();

  // useEffect(() => {
  //   console.log(authUser, authResolved);
  //   if (authResolved) {
  //     history.push(!!authUser ? "/" : "/login");
  //   }
  // }, [authResolved, authUser, history]);
  const { authUser } = useAuth();

  const history = useHistory();
  useEffect(() => {
    if (authUser) {
      history.push("/");
    } else {
      history.push("/login");
    }
  }, [authUser, history]);

  return (
    <div className="w-100">
      <ChatProvider authUser={authUser}>
        <Switch>
          <Route exact path="/" component={Chat}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/scheduler" component={Scheduler}></Route>
        </Switch>
      </ChatProvider>
    </div>
  );
}

export default App;
