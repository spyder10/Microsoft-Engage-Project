import { fb } from "../service/firebase";
import { useState, useEffect } from "react";

function useAuth() {
  const [authUser, setAuthUser] = useState();

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
  };
}
export default useAuth;
