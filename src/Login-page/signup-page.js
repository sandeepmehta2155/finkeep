import { useState } from "react";
import { Todo } from "./todo";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordReInput, setpasswordReInput] = useState("");

  const [userExists, setUserExists] = useState("none");

  const [type, setType] = useState("password");

  const [passwordMatches, setPasswordMatch] = useState("none");

  const [invalidUser, setInvalidUser] = useState("none");

  const [signUpSuccess, setSignUpSuccess] = useState("none");

  const navigate = useNavigate();

  const SignUpHandler = async () => {
    setUserExists("block");
    const response = await axios.post(
      "https://finkeep-backend.sandeepmehta215.repl.co/adduser",
      {
        username: username,
        password: password
      }
    );

    response.data.message === "Invalid username"
      ? setInvalidUser("block")
      : setInvalidUser("none");

    response.data.message === "user exists"
      ? setUserExists("block")
      : setUserExists("none");

    if (response.data.success === true) {
      setUserExists("none");
      setPasswordMatch("none");
      setInvalidUser("none");
      setSignUpSuccess("block");

      setTimeout(() => navigate("/"), 800);
    }
    console.log(response.data);
  };

  return (
    <>
      {" "}
      <Todo />
      <div className="loginModal">
        <h2 className="loginHeading"> SignUp </h2>
        <br />
        <input
          type="name"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <small style={{ display: userExists, color: "red" }}>
          {" "}
          User exists{" "}
        </small>
        <small style={{ display: invalidUser, color: "red" }}>
          Invalid user
        </small>
        <br /> <br />
        <input
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br /> <br />
        <input
          type={type}
          placeholder="Re-enter your password..."
          onChange={(e) => setpasswordReInput(e.target.value)}
        />
        <br />{" "}
        <input
          id="check"
          type="checkbox"
          onClick={() => {
            if (type === "password") setType("text");
            else setType("password");
          }}
        />
        <small style={{ display: passwordMatches, color: "red" }}>
          Password doesn't match
        </small>
        <br />
        <br />
        <button className="loginButton" onClick={() => navigate("/login")}>
          Login
        </button>
        <button
          className="signupButton"
          onClick={() => {
            if (passwordReInput === password && passwordReInput !== "")
              SignUpHandler();
            else if (password !== passwordReInput || password === "")
              setPasswordMatch("block");
            else setpasswordReInput("none");
          }}
        >
          Add User
        </button>
        <br />
        <br />
        <small style={{ display: signUpSuccess }}>
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
