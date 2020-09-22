import Layout from "../components/Layout";
import { useState } from "react";
import "axios";
import Axios from "axios";

const retrieveSecret = () => {
  const [name, setName] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [responseField, setResponseField] = useState<String>("");
  const [errorField, setErrorField] = useState<String>("");

  const submit = (e) => {
    e.preventDefault();
    const url = (process.env.NEXT_PUBLIC_URL || "") + "/api";

    Axios.post(url + "/retrieve-secret", {
      name: name,
      password: password,
    })
      .then((res) => {
        if (res.data.message) {
          setResponseField(res.data.message);
          setErrorField("");
        }
      })
      .catch((error) => {
        if (error.response.data.errorMsg) {
          setErrorField(error.response.data.errorMsg);
          setResponseField("");
        }
      });
  };

  return (
    <Layout>
      <form onSubmit={submit}>
        <div className="form-container">
          <p className="text big-text">Retrieve secret</p>
          <p className="text">Name</p>
          <input
            type="text"
            className="input"
            onChange={(e) => setName(e.target.value)}
          />
          <p className="text">Password</p>
          <input
            type="password"
            className="input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" type="submit">
            Retrieve
          </button>
          {errorField && (
            <div>
              <p className="error-msg">{errorField}</p>
            </div>
          )}
          {responseField && (
            <div>
              <div className="text-field">
                <p>{responseField}</p>
              </div>
            </div>
          )}
        </div>
      </form>

      <style jsx>
        {`
          .form-container {
            width: 550px;
            margin: auto;
            margin-top: 100px;
            margin-bottom: 75px;
          }
          button {
            font-size: 1em;
            margin-left: 0;
          }
          .text-field {
            background-color: lightgrey;
            border-radius: 5px;
            padding: 5px;
          }
          .text-field p {
            margin: 0;
            font-size: 0.75em;
            font-style: italic;
          }
          .error-msg {
            color: red;
            font-size: 0.75em;
            margin-top: 0;
          }
        `}
      </style>
    </Layout>
  );
};

export default retrieveSecret;
