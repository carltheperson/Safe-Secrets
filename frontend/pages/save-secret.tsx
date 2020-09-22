import Layout from "../components/Layout";
import { useState } from "react";
import Axios from "axios";
import { error } from "console";

const saveSecret = () => {
  const [name, setName] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [string, setString] = useState<String>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [errorField, setErrorField] = useState<String>("");

  const submit = (e) => {
    e.preventDefault();
    const url = (process.env.NEXT_PUBLIC_URL || "") + "/api";

    Axios.post(url + "/save-secret", {
      name: name,
      password: password,
      string: string,
    })
      .then(() => {
        setErrorField("");
        setSuccess(true);
      })
      .catch((error) => {
        if (error.response.data.errorMsg) {
          setErrorField(error.response.data.errorMsg);
          setSuccess(true);
        }
      });
  };

  return (
    <Layout>
      <form onSubmit={submit}>
        <div>
          <p className="text big-text">Save secret</p>
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
          <p className="text">Secret</p>
          <textarea
            className="input big-input"
            onChange={(e) => {
              setString(e.target.value);
            }}
          />
          <button className="button" type="submit">
            Save
          </button>
          {success && <p className="saved-text">Saved</p>}
          {errorField && (
            <div>
              <p className="error-msg">{errorField}</p>
            </div>
          )}
        </div>
      </form>
      <style jsx>
        {`
          div {
            width: 550px;
            margin: auto;
            margin-top: 100px;
            margin-bottom: 75px;
          }
          button {
            font-size: 1em;
            margin-left: 0;
          }
          .error-msg {
            color: red;
            font-size: 0.75em;
            margin-top: 0;
          }
          .saved-text {
            font-size: 0.75em;
            margin-top: 0;
            color: green;
          }
        `}
      </style>
    </Layout>
  );
};

export default saveSecret;
