import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const UserContext = createContext();

export function UserAuthProvider({ children }) {
  const navigate = useNavigate();

  const [validateUser, setUserValidation] = useState({
    userExists: "none",
    checkPassword: "none",
    userauth: "none"
  });

  async function LoginUserWithCredentials(username, password) {
    const response = await axios.get(
      `https://finkeep-backend.sandeepmehta215.repl.co/userauth/id?username=${username}&password=${password}`
    );

    if (response.data.message === "user not found")
      setUserValidation({
        ...validateUser,
        checkPassword: "none",
        userExists: "block"
      });

    if (response.data.message === "password entered is wrong")
      setUserValidation({
        ...validateUser,
        userExists: "none",
        checkPassword: "block"
      });

    if (response.data.message === "user auth is successfull") {
      setUserValidation({
        userauth: "block",
        userExists: "none",
        checkPassword: "none"
      });

      localStorage.setItem("username", JSON.stringify({ username: username }));

      setTimeout(() => navigate("/"), 1000);
    }
  }

  function LogOut() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    setUserValidation({
      userauth: "none",
      userExists: "none",
      checkPassword: "none"
    });

    setTimeout(() => navigate("/login"), 2000);
  }
  return (
    <UserContext.Provider
      value={{ LoginUserWithCredentials, validateUser, LogOut }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(UserContext);
};
