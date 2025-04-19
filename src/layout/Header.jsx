import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserCirclePlus,
  UserCircle,
  SignIn,
  List,
  X,
} from "@phosphor-icons/react";
import Modal from "../components/Modal";
import LoginModal from "../components/LoginModal";

export default function Nav() {
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className=" px-4 py-2 flex items-center justify-between">
      <nav className="flex items-center justify-between w-full max-w-7xl mx-auto text-brand-primary">
        <Link to={"/"}>
          <div className="text-heading-5 font-bold flex items-center gap-2">
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 867.000000 900.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,900.000000) scale(0.100000,-0.100000)"
                fill="currentcolor"
                stroke="none"
              >
                <path d="M6438 8442 c-63 -33 -183 -141 -278 -253 -30 -35 -57 -66 -60 -69 -7 -7 -60 -84 -82 -118 -35 -55 -87 -168 -98 -213 -22 -88 1 -128 135 -234 97 -77 310 -299 345 -360 95 -164 94 -272 -2 -361 -40 -37 -148 -108 -243 -159 -173 -94 -255 -192 -255 -305 0 -28 7 -67 15 -87 8 -19 15 -42 15 -50 0 -8 46 -92 103 -186 56 -95 137 -244 180 -332 74 -151 87 -178 124 -265 8 -19 21 -48 28 -65 8 -16 16 -39 19 -50 3 -11 15 -26 27 -33 l22 -14 -6 104 c-12 202 -28 296 -82 478 -9 30 -19 69 -24 85 -4 17 -13 39 -18 50 -37 68 -47 112 -48 194 0 70 4 95 23 135 27 56 142 177 222 231 30 21 57 41 60 45 3 3 32 27 65 52 97 74 198 186 235 262 28 58 33 79 32 137 0 103 -38 173 -155 288 -51 50 -108 101 -129 115 -20 13 -45 32 -55 43 -10 10 -34 29 -52 43 -200 149 -289 298 -251 416 11 33 92 168 111 184 5 5 88 145 122 207 20 37 23 103 4 103 -7 0 -29 -8 -49 -18z" />
                <path d="M5856 5035 c-9 -9 -17 -17 -18 -18 -1 -1 -4 -438 -7 -972 -6 -1031 -6 -1029 -51 -1005 -11 6 -40 30 -64 53 -24 23 -131 123 -237 222 -270 252 -265 247 -281 280 -12 24 -16 95 -21 363 l-5 333 -26 34 c-24 32 -101 75 -132 75 -7 0 -28 6 -46 14 -18 8 -49 21 -70 30 -20 9 -42 16 -50 16 -13 1 -83 25 -141 48 -16 7 -34 12 -41 12 -6 0 -16 4 -21 9 -6 4 -46 20 -90 34 -44 14 -105 35 -135 47 -30 12 -84 31 -120 42 -36 12 -79 27 -97 34 -17 8 -40 14 -50 14 -10 0 -23 4 -29 9 -10 10 -58 29 -164 63 -36 11 -74 24 -85 29 -53 22 -114 41 -157 49 -27 5 -53 12 -59 15 -6 4 -29 2 -52 -3 -23 -6 -54 -13 -69 -16 -21 -5 -258 -199 -303 -250 -12 -13 -91 -85 -204 -186 -47 -41 -116 -105 -155 -141 -39 -37 -87 -79 -106 -95 -19 -16 -59 -51 -89 -79 -30 -27 -62 -57 -71 -65 -9 -8 -41 -37 -71 -65 -30 -27 -92 -84 -138 -125 -47 -41 -98 -88 -114 -104 -17 -15 -93 -85 -171 -154 -78 -69 -143 -128 -146 -132 -3 -3 -70 -64 -150 -135 -80 -71 -157 -141 -171 -155 -25 -24 -131 -120 -177 -159 -13 -11 -69 -62 -125 -114 -56 -51 -127 -115 -157 -142 -30 -26 -104 -94 -165 -150 -60 -56 -126 -115 -145 -131 -83 -68 -297 -272 -322 -307 -11 -15 -26 -55 -34 -87 -23 -99 -4 -154 100 -294 47 -63 102 -139 122 -168 53 -74 55 -77 101 -124 63 -64 109 -84 193 -84 126 0 136 7 475 355 165 169 302 311 305 315 3 4 210 216 460 471 250 255 532 542 625 639 248 256 288 293 342 322 117 64 256 60 363 -11 30 -20 138 -117 240 -217 102 -100 198 -193 214 -207 16 -15 249 -244 519 -509 579 -569 852 -836 889 -870 15 -14 249 -243 520 -510 618 -609 610 -601 688 -640 57 -29 74 -33 146 -33 68 0 89 4 135 27 65 33 118 80 189 168 28 36 68 84 87 108 19 23 49 60 67 82 77 97 311 385 316 390 3 3 23 28 45 55 22 28 53 66 70 86 39 46 51 61 170 209 55 69 106 131 113 139 42 43 93 122 108 166 32 90 18 208 -34 294 -10 17 -161 176 -334 353 -174 178 -327 335 -340 349 -110 122 -217 238 -288 310 -86 87 -230 243 -309 334 -79 92 -75 63 -81 597 -5 464 -6 477 -26 505 -12 15 -34 34 -50 42 -16 8 -37 18 -46 23 -10 4 -45 17 -79 29 -34 12 -73 28 -88 35 -14 8 -32 14 -39 14 -7 0 -20 4 -30 10 -9 5 -48 23 -87 41 -38 17 -90 40 -115 51 -25 12 -58 26 -75 33 -16 7 -59 26 -95 43 -36 17 -74 33 -85 35 -11 3 -27 8 -36 11 -10 4 -23 0 -33 -9z" />
                <path d="M2892 1932 c-7 -5 -17 -24 -22 -43 -11 -38 -14 -867 -4 -943 11 -80 -19 -76 649 -76 577 0 587 0 616 21 l29 20 0 495 c0 481 -1 495 -20 514 -20 20 -33 20 -627 20 -335 0 -614 -4 -621 -8z" />
              </g>
            </svg>
            <h1 className="text-heading-4">Holidaze</h1>
          </div>
        </Link>
        {/* Burgermenu */}
        <button className="md:hidden " onClick={() => setMenuOpen(true)}>
          <List size={28} weight="bold" />
        </button>

        {/* Desktop menu links */}
        <ul className="hidden md:flex gap-4">
          <li>
            <button
              onClick={() => setShowLogin(true)}
              className="underline cursor-pointer  hover:text-cta-icon-hover"
              title="Login"
            >
              <SignIn size={32} weight="fill" />
            </button>
          </li>
          <li>
            <Link
              className="flex items-center gap-2 text-body-md hover:text-cta-icon-hover"
              to={"/register"}
              title="Register"
            >
              <UserCirclePlus size={32} weight="fill" />
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-2 text-body-md hover:text-cta-icon-hover"
              to={"/profile"}
              title="Profile"
            >
              <UserCircle size={32} weight="fill" />
            </Link>
          </li>
          {/* ... */}
        </ul>

        {/* Mobile menu links */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
            <div className=" flex-col bg-white w-64 p-4">
              <button onClick={() => setMenuOpen(false)} className="mb-4">
                <X size={24} />
              </button>
              <ul className="flex flex-col gap-4">
                <li>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="no-underline cursor-pointer flex items-center gap-2 text-body-md"
                  >
                    <SignIn size={32} weight="fill" />
                    Login
                  </button>
                </li>
                <li>
                  <Link
                    className="flex items-center gap-2 text-body-md"
                    to={"/register"}
                  >
                    <UserCirclePlus size={32} weight="fill" />
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center gap-2 text-body-md"
                    to={"/profile"}
                  >
                    <UserCircle size={32} weight="fill" />
                    Profile
                  </Link>
                </li>
                {/* ... */}
              </ul>
            </div>
          </div>
        )}
      </nav>
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <LoginModal onClose={() => setShowLogin(false)} />
        </Modal>
      )}
    </header>
  );
}
