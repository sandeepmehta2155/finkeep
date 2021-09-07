import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const UserContext = createContext();

export function UserAuthProvider({ children }) {
  const navigate = useNavigate();
  const { login } = localStorage.getItem("login") || {
    login: false
  };
  const [isUserLoggedIn, setUserLogIn] = useState(login);

  const [validateUser, setUserValidation] = useState({
    userExists: "none",
    checkPassword: "none",
    userauth: "none"
  });

  function LogOut() {
    localStorage.removeItem("username");
    localStorage.removeItem("notearray");
    localStorage.removeItem("login");

    setUserLogIn(false);

    setUserValidation({
      userauth: "none",
      userExists: "none",
      checkPassword: "none"
    });

    setTimeout(() => navigate("/login"), 2000);
  }

  async function LoginUserWithCredentials(username, password) {
    const response = await axios.get(
      `https://finkeep-backend.sandeepmehta215.repl.co/userauth/${username}?username=${username}&password=${password}`
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
      setUserLogIn(true);
      localStorage.setItem("username", JSON.stringify({ username: username }));

      localStorage.setItem("login", JSON.stringify({ login: true }));

      localStorage.setItem(
        "notearray",
        JSON.stringify({ notearray: response.data.user })
      );

      setTimeout(() => navigate("/"), 1000);
    }
  }

  return (
    <UserContext.Provider
      value={{ LoginUserWithCredentials, validateUser, LogOut, isUserLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(UserContext);
};
