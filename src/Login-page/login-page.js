import axios from "axios";
import { useState } from "react";
import { Todo } from "./todo";

export const LoginPage = () => {
  const { username } = JSON.parse(localStorage.getItem("username")) || {
    username: null
  };

  const [validateUser, setUserValidation] = useState({
    userExists: "none",
    checkPassword: "none",
    userauth: "none"
  });

  const [userCredentials, setUserCredentials] = useState({
    userName: username,
    passWord: null
  });

  async function CallLogin() {
    const response = await axios.get(
      `https://finkeep-backend.sandeepmehta215.repl.co/userauth/id?username=${userCredentials.userName}&password=${userCredentials.passWord}`
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

    if (response.data.message === "user auth is successfull")
      setUserValidation({
        userauth: "block",
        userExists: "none",
        checkPassword: "none"
      });
    console.log(response.data);
  }
  return (
    <>
      <Todo />
      <div className="loginModal">
        <h2 className="loginHeading"> Login </h2>
        <br />
        <input
          type="name"
          placeholder="Enter your username..."
          onChange={(e) =>
            setUserCredentials({ ...userCredentials, userName: e.target.value })
          }
        />{" "}
        <small style={{ display: validateUser.userExists, color: "red" }}>
          {" "}
          User doesn't exists{" "}
        </small>
        <br /> <br />
        <input
          type="password"
          placeholder="Enter your password..."
          onChange={(e) =>
            setUserCredentials({ ...userCredentials, passWord: e.target.value })
          }
        />
        <small style={{ display: validateUser.checkPassword, color: "red" }}>
          Wrong passWord
        </small>
        <br />
        <br />
        <button className="loginButton" onClick={() => CallLogin()}>
          Login
        </button>
        <button className="signupButton">SignUp</button>
        <br />
        <br />
        <small style={{ display: validateUser.userauth, color: "green" }}>
          {" "}
          User Logged in successfully
          <span role="img" aria-labelledby="tick">
            {" "}
            ✅
          </span>
        </small>
      </div>
    </>
  );
};
