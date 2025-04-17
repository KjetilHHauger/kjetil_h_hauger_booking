import { useState } from "react";
import { toast } from "react-toastify";
import useUserStore from "../stores/userStore";
import { loginUser } from "../utils/userLogin";

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
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <h2 className="text-heading-5 font-bold text-font-primary text-center">
        Login
      </h2>

      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-brand-secondary hover:bg-brand-secondary-hover text-white py-2 px-4 rounded"
      >
        Login
      </button>
    </form>
  );
}
