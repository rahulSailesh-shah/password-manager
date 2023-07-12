import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SavePassword = (props) => {
  const [formData, setFormdata] = useState({
    password:
      props.location.state === undefined ? "" : props.location.state.password,
    email: "",
    site: "",
    username: "",
  });
  const [message, setMessage] = useState("");

  const { password, email, site, username } = formData;

  const onChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    setMessage("");
    e.preventDefault();

    const body = JSON.stringify(formData);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/password/save", body, config);
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const clearMessage = () => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="home">
      <Link to="/" style={{ marginBottom: "40px" }}>
        Go back home
      </Link>

      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <label>Password: </label>
          <input
            required
            minLength="6"
            type="password"
            className="input-width"
            value={password}
            onChange={(e) => onChange(e)}
            name="password"
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            required
            type="email"
            className="input-width"
            value={email}
            onChange={(e) => onChange(e)}
            name="email"
          />
        </div>
        <div>
          <label>Username (if applicable): </label>
          <input
            type="text"
            className="input-width"
            value={username}
            onChange={(e) => onChange(e)}
            name="username"
          />
        </div>
        <div>
          <label>Site/App name: </label>
          <input
            required
            type="text"
            className="input-width"
            value={site}
            onChange={(e) => onChange(e)}
            name="site"
          />
        </div>
        <button type="submit" className="button-primary">
          Submit
        </button>
      </form>
      {message && (
        <>
          <p>{message}</p>
          {clearMessage()}
        </>
      )}
    </div>
  );
};

export default SavePassword;
