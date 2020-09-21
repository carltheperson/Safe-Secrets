import Layout from "../components/Layout";

const saveSecret = () => {
  return (
    <Layout>
      <div>
        <p className="text big-text">Save secret</p>
        <p className="text">Name</p>
        <input type="text" className="input" />
        <p className="text">Password</p>
        <input type="password" className="input" />
        <p className="text">Secret</p>
        <textarea className="input big-input" />
        <button className="button">Save</button>
      </div>
      <style jsx>
        {`
          div {
            width: 550px;
            margin: auto;
            margin-top: 100px;
          }
          button {
            font-size: 1em;
            margin-left: 0;
            margin-bottom: 75px;
          }
        `}
      </style>
    </Layout>
  );
};

export default saveSecret;
