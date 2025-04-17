import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import LoginModal from "../components/LoginModal";

export default function Nav() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <header className="bg-brand-primary px-4 py-2 flex items-center justify-between">
      <h1 className="text-heading-5 font-bold text-white">Holidaze</h1>
      <nav>
        <ul className="flex gap-4 text-font-primary text-body-md items-center">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <button onClick={() => setShowLogin(true)} className="underline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentcolor"
                viewBox="0 0 256 256"
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"></path>
              </svg>
            </button>
          </li>
          <li>
            <Link to={"/register"}>Register</Link>
          </li>
          <li>
            <Link to={"/profile"}>Profile</Link>
          </li>
        </ul>
      </nav>
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <LoginModal onClose={() => setShowLogin(false)} />
        </Modal>
      )}
    </header>
  );
}
