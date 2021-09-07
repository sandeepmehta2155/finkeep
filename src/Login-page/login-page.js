import { useState } from "react";
import { Todo } from "./todo";
import { useAuth } from "./auth-context";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { username } = JSON.parse(localStorage.getItem("username")) || {
    username: null
  };
  const [userCredentials, setUserCredentials] = useState({
    userName: username,
    passWord: null
  });

  const { LogOut, LoginUserWithCredentials, validateUser } = useAuth();

  const navigate = useNavigate();

  function LoginHandler() {
    username
      ? LogOut()
      : LoginUserWithCredentials(
          userCredentials.userName,
          userCredentials.passWord
        );
  }

  return (
    <>
      <Todo />
      <div className="loginModal">
        <h2 className="loginHeading"> Login </h2>
        <br />
        <input
          type="name"
          value={userCredentials.userName}
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
          value={userCredentials.passWord}
          placeholder="Enter your password..."
          onChange={(e) =>
            setUserCredentials({ ...userCredentials, passWord: e.target.value })
          }
        />
        <small style={{ display: validateUser.checkPassword, color: "red" }}>
          Wrong passWord
        </small>
        <br /> <br />
        <small
          className="loginAsGuestText"
          onClick={() => {
            setUserCredentials({ userName: "guest", passWord: "guest@123" });
          }}
        >
          {" "}
          Login as a guest ?
        </small>
        <br /> <br />
        <button className="loginButton" onClick={() => LoginHandler()}>
          Login
        </button>
        <button className="signupButton" onClick={() => navigate("/signup")}>
          SignUp
        </button>
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
