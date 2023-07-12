import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FindPassword = () => {
  const [email, setEmail] = useState("");
  const [site, setSite] = useState("");
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const findByEmail = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({ email });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      setErrorMessage("");
      setData("");
      setEmail("");
      const res = await axios.post("/api/password/find/email", body, config);
      setData(res.data.data);
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  const findBySite = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({ site });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      setErrorMessage("");
      setData("");
      setSite("");
      const res = await axios.post("/api/password/find/site", body, config);
      setData(res.data.data);
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  return (
    <div className="center-top">
      <Link to="/" style={{ marginBottom: "40px" }}>
        Go back home
      </Link>
      <form style={{ display: "flex" }} onSubmit={(e) => findByEmail(e)}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Find By Email-ID"
          required
          style={{ width: "250px" }}
        />
        <button
          type="submit"
          className="button-primary"
          style={{ marginLeft: "15px" }}
        >
          Find
        </button>
      </form>
      <form style={{ display: "flex" }} onSubmit={(e) => findBySite(e)}>
        <input
          value={site}
          onChange={(e) => setSite(e.target.value)}
          type="text"
          placeholder="Find By App/Site name"
          required
          style={{ width: "250px" }}
        />
        <button
          type="submit"
          className="button-primary"
          style={{ marginLeft: "15px" }}
        >
          Find
        </button>
      </form>
      <div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
      {data && (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>App/ Site</th>
              <th>Password</th>
            </tr>
          </thead>

          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.email}</td>
                <td>{d.username}</td>
                <td>{d.site}</td>
                <td>{d.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FindPassword;
