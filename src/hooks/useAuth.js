import { fb } from "../service/firebase";
import { useState, useEffect } from "react";

function useAuth() {
  const [authUser, setAuthUser] = useState();

  const changeAuth = () => {
    setAuthUser(authUser);
  };

  useEffect(() => {
    const unsubsribe = fb.auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return unsubsribe;
  }, []);

  return {
    authUser,
    changeAuth,
  };
}
export default useAuth;
