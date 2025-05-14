import { useState } from "react";
import { toast } from "react-toastify";
import useUserStore from "../stores/userStore";
import { loginUser } from "../utils/userLogin";
import { Link } from "react-router-dom";

export default function LoginModal({ onClose }) {
  const { setUser } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const BASE_URL = import.meta.env.VITE_API_URL;
      const userData = await loginUser({ email, password, BASE_URL });
      setUser(userData);
      toast.success("Logged in!");
      onClose();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 justify-center items-center mx-auto p-4 max-w-xl"
    >
      <h2 className="text-heading-5 font-bold text-font-headline text-center w-full">
        Login
      </h2>
      <div className="flex flex-col gap-4 w-full">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="border p-2 rounded w-full"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-cta hover:bg-cta-hover text-white py-2 px-4 rounded w-full cursor-pointer"
        >
          Login
        </button>
      </div>
      <span>
        Need to register?{" "}
        <Link onClick={onClose} to="/register" className="text-cta">
          Click here
        </Link>
      </span>
    </form>
  );
}
