import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/userStore";
import { loginUser } from "../utils/userLogin";
import { userRegister } from "../utils/userRegister";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
    banner: "",
    bio: "",
    venueManager: "No",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const BASE_URL = import.meta.env.VITE_API_URL;

      await userRegister(formData, BASE_URL);

      const userData = await loginUser({
        email: formData.email,
        password: formData.password,
        BASE_URL,
      });

      setUser(userData);
      toast.success("Registered successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="py-8 px-4 md:px-8 min-h-screen flex flex-col items-center gap-6">
      <h1 className="text-heading-4 flex justify-center font-bold">Register</h1>
      <form
        onSubmit={handleRegister}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto p-6 w-full bg-white rounded"
      >
        {/* Left */}
        <div className="flex flex-col gap-4">
          <label htmlFor="username" className="text-body-md">
            Name
          </label>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <label htmlFor="email" className="text-body-md">
            E-mail
          </label>
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <label htmlFor="password" className="text-body-md">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <label htmlFor="confirmPassword" className="text-body-md">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
        </div>

        {/* Right */}
        <div className="flex flex-col gap-4">
          <label htmlFor="avatar" className="text-body-md">
            Avatar url
          </label>
          <input
            name="avatar"
            type="url"
            placeholder="Avatar url"
            value={formData.avatar}
            alt={`Avatar of ${formData.username}`}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <label htmlFor="banner" className="text-body-md">
            Banner url
          </label>
          <input
            name="banner"
            type="url"
            placeholder="Banner url"
            value={formData.banner}
            alt="Profile banner"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <label htmlFor="bio" className="text-body-md">
            Tell us about yourself
          </label>
          <textarea
            name="bio"
            placeholder="Tell us about yourself"
            value={formData.bio}
            onChange={handleChange}
            rows={10}
            className="border p-2 rounded"
          />
          <div className="flex justify-between">
            <div>
              <h2 className="text-heading-6 mb-0">Venue manager?</h2>
              <p className="text-body-xs m-0">
                (Do you have a place to rent out?)
              </p>
            </div>

            <select
              name="venueManager"
              value={formData.venueManager}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Register */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-cta hover:bg-cta-hover text-white py-2 px-4 rounded"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
