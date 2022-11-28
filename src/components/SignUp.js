import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const submitHandler = async () => {
    if (!name || !email || !password) {
      setError(true);
      return false;
    }
    console.warn(name, email, password);
    let result = await fetch("http://localhost:3002/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if (result.name && result.email && result.password) {
      navigate("/");
    } else {
      //   alert("");
    }
    localStorage.setItem("userdata", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));

    navigate("/");
  };
  useEffect(() => {
    const auth = localStorage.getItem("userdata");
    if (auth) {
      navigate("/");
    }
  }, []);

  return (
    <div className="register">
      <h1>Register Page</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {error && !name && (
        <span className="invalid-input">Please fill Username</span>
      )}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      {error && !email && (
        <span className="invalid-input">Please Enter Email</span>
      )}
      <input
        className="inputBox"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      {error && !password && (
        <span className="invalid-input">Please Enter Password</span>
      )}
      <button className="appButton" onClick={submitHandler}>
        SignUp
      </button>
    </div>
  );
}

export default SignUp;
