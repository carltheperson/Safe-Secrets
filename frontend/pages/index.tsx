import Layout from "../components/Layout";
import Link from "next/link";

const index = () => {
  return (
    <Layout>
      <div>
        <p className="text">
          Your secret is safe with us! All secrets you trust with us, will
          always be saved using AES encryption.
        </p>
        <Link href="/save-secret">
          <button className="button">Save secret</button>
        </Link>
        <Link href="/retrieve-secret">
          <button className="button">Retrieve secret</button>
        </Link>
      </div>
      <img src="/key.png" alt="key" />
      <style jsx>
        {`
          div {
            width: 1000px;
            font-size: 1.35em;
            text-align: center;
            margin: auto;
            margin-top: 15vh;
          }
          img {
            position: absolute;
            bottom: 0;
          }
        `}
      </style>
    </Layout>
  );
};

export default index;
