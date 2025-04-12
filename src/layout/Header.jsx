import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-green-300">
      <h1>Holidaze</h1>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
          <li>
            <Link to={"/register"}>Register</Link>
          </li>
          <li>
            <Link to={"/profile"}>Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
