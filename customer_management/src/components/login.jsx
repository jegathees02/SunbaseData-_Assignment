import React, { useState, useEffect } from "react";
import axios from "axios";
import '../assets/css/login.css';

const Login = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    // Get the token from the local storage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make a POST request to the authentication API
    const url = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp";
    const data = {
      login_id: loginId,
      password: password
    };
    const response = await axios.post(url, data);

    if (response.status === 200) {
      // The authentication was successful, store the token in the local storage
      setToken(response.data.token);
      localStorage.setItem("token", token);

      // Redirect to the customer list screen
      window.location.href = "/customers";
    } else {
      // The authentication failed
      console.log(response.error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          placeholder="Login ID"
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
