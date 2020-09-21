import Layout from "../components/Layout";

const retrieveSecret = () => {
  return (
    <Layout>
      <div>
        <p className="text big-text">Retrieve secret</p>
        <p className="text">Name</p>
        <input type="text" className="input" />
        <p className="text">Password</p>
        <input type="password" className="input" />
        <button className="button">Retrieve</button>
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

export default retrieveSecret;
