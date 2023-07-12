import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = ({ masterPassword, setMasterPassword }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    setError("");
    e.preventDefault();

    const body = JSON.stringify({ password });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post("/api/master/decrypt", body, config);
      setMasterPassword(password);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return masterPassword === "" ? (
    <div className="home">
      <form onSubmit={(e) => onSubmit(e)}>
        <h2>Enter master password</h2>
        <br />
        <input
          type="password"
          value={password}
          style={{ width: "100%" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button-primary" type="submit">
          Submit
        </button>
      </form>
      {error && <h2 style={{ color: "red" }}>{error}</h2>}
    </div>
  ) : (
    <div className="home">
      <Link
        className="button button-primary"
        style={{ width: "200px" }}
        to="/create"
      >
        Generate password
      </Link>{" "}
      <br />
      <Link
        className="button button-primary"
        style={{ width: "200px" }}
        to="/save"
      >
        Save to database
      </Link>{" "}
      <br />
      <Link
        className="button button-primary"
        style={{ width: "200px" }}
        to="/find"
      >
        Find password
      </Link>{" "}
      <br />
    </div>
  );
};

export default Home;
