import { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useResolved } from "../hooks/useResolved";
import Login from "./Login";
import SignUp from "./SignUp";
import Chat from "./Chat";
import { ChatProvider } from "../context/ChatContext";

function App() {
  const { authUser } = useAuth();
  const authResolved = useResolved();

  const history = useHistory();

  useEffect(() => {
    console.log(authUser, authResolved);
    if (authResolved) {
      history.push(!!authUser ? "/" : "/login");
    }
  }, [authResolved, authUser, history]);

  return authResolved ? (
    <div className="w-100">
      <ChatProvider authUser={authUser}>
        <Switch>
          <Route exact path="/" component={Chat}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/signup" component={SignUp}></Route>
        </Switch>
      </ChatProvider>
    </div>
  ) : (
    <> Loading... </>
  );
}

export default App;
