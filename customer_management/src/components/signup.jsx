import React, { useState, useEffect } from "react";
import axios from "axios";
import '../assets/css/signup.css';

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
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
      login_id: email,
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
    <div className="signup-container">
      <h1 className="signup-title">Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="signup-input"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="signup-input"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="signup-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="signup-input"
        />
        <button type="submit" className="signup-button">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
