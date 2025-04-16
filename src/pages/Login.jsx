import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import useUserStore from "../stores/userStore";
import { loginUser } from "../utils/userLogin";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const BASE_URL = import.meta.env.VITE_API_URL;

      const userData = await loginUser({
        email,
        password,
        BASE_URL,
      });

      setUser(userData);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="py-16 px-4 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-heading-3 font-bold mb-6">Login</h1>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm flex flex-col gap-4 bg-white p-6 rounded"
      >
        <div>
          <label htmlFor="email" className="block mb-1 text-body-md">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-body-md">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-brand-secondary hover:bg-brand-secondary-hover text-white py-2 px-4 rounded"
        >
          Login
        </button>

        <p className="text-center text-xs text-font-secondary mt-2">
          Need an account?{" "}
          <Link to="/register" className="underline text-font-primary">
            Join Holidaze
          </Link>
        </p>
      </form>
    </section>
  );
}
