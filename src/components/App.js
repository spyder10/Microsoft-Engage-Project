import { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Chat from "./Chat";
import SchedulerTeacher from "./SchedulerTeacher";
import { ChatProvider } from "../context/ChatContext";
import Scheduler from "./Scheduler";
import useAuth from "../hooks/useAuth";

function App() {
  const { authUser } = useAuth();

  const history = useHistory();

  // If the authUser is not defined, Move to login Page first.
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
          <Route path="/scheduler_teacher" component={SchedulerTeacher}></Route>
        </Switch>
      </ChatProvider>
    </div>
  );
}

export default App;
