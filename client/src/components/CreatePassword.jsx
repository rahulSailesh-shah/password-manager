import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

const alpha = "abcdefghijklmnopqrstuvwxyz";
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberCharacter = "1234567890";
const special = "!@#$%^&*_-+=";

const CreatePassword = () => {
  const [length, setLength] = useState(8);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [specialCharacters, setSpecialCharacters] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const createPassword = () => {
    let chars = alpha;
    let password = "";
    chars += upperCase ? upper : "";
    chars += number ? numberCharacter : "";
    chars += specialCharacters ? special : "";

    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(password);
  };

  const displayCopied = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="home">
      <Link to="/" style={{ marginBottom: "40px" }}>
        Go back home
      </Link>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPassword();
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <p>Length:&nbsp;&nbsp;</p>
          <input
            style={{ width: "100px" }}
            type="number"
            placeholder="8"
            value={length}
            name="length"
            onChange={(e) => setLength(e.target.value)}
            min="6"
          />
        </div>

        <p>
          <input
            type="checkbox"
            defaultChecked={upperCase}
            onChange={() => setUpperCase(!upperCase)}
          />
          &nbsp; Include upper case
        </p>

        <p>
          <input
            type="checkbox"
            defaultChecked={number}
            onChange={() => setNumber(!number)}
          />
          &nbsp;Include numbers
        </p>

        <p>
          <input
            type="checkbox"
            defaultChecked={specialCharacters}
            onChange={() => setSpecialCharacters(!specialCharacters)}
          />
          &nbsp;Include special characters
        </p>

        <button className="button-primary" type="submit">
          Generate
        </button>
      </form>
      {password && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <h1>{password}</h1>
          <div>
            <CopyToClipboard text={password} onCopy={() => displayCopied()}>
              <button
                className="button-primary"
                style={{ marginRight: "10px" }}
              >
                Copy to clipboard
              </button>
            </CopyToClipboard>

            <Link
              to={{
                pathname: "/save",
                state: {
                  password,
                },
              }}
            >
              <button className="button-primary">Save to database</button>
            </Link>
            {copied && (
              <p style={{ textAlign: "center", color: "steelblue" }}>Copied</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePassword;
