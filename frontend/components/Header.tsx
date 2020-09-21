import Link from "next/link";

const Header = () => {
  return (
    <div>
      <div className="container">
        <Link href="/">
          <h1>🔒 Safe Secrets</h1>
        </Link>
        <ul>
          <li>
            <Link href="/save-secret">
              <a>Save secret</a>
            </Link>
          </li>
          <li>
            <Link href="/retrieve-secret">
              <a>Retrieve secret</a>
            </Link>
          </li>
        </ul>
      </div>
      <style jsx>
        {`
          h1 {
            font-family: "Roboto", Arial, Helvetica, sans-serif;
            font-size: 2em;
            margin: 10px;
            cursor: pointer;
          }
          ul {
            display: flex;
            list-style-type: none;
            margin-left: auto;
          }
          a {
            text-decoration: none;
            color: #686868;
            margin-right: 50px;
            font-family: "Roboto", Arial, Helvetica, sans-serif;
            font-weight: bold;
            font-size: 0.85em;
          }
          .container {
            display: flex;
          }
        `}
      </style>
    </div>
  );
};

export default Header;
