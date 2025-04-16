import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();
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

      const payload = {
        name: formData.username,
        email: formData.email,
        password: formData.password,
        bio: formData.bio,
        venueManager: formData.venueManager === "Yes",
      };

      if (formData.avatar.trim()) {
        payload.avatar = {
          url: formData.avatar.trim(),
          alt: `${formData.username}'s avatar`,
        };
      }

      if (formData.banner.trim()) {
        payload.banner = {
          url: formData.banner.trim(),
          alt: `${formData.username}'s banner`,
        };
      }

      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.errors?.[0]?.path?.join(".") +
            ": " +
            data.errors?.[0]?.message || "Registration failed";
        throw new Error(errorMessage);
      }

      toast.success("Registered successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="py-8 px-4 md:px-8 min-h-screen flex flex-col items-center gap-6">
      <h1 className="text-heading-4 flex justify-center">Register</h1>
      <form
        onSubmit={handleRegister}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto p-6 w-full bg-white rounded"
      >
        {/* Left */}
        <div className="flex flex-col gap-4">
          <p className="text-body-md text-font-primary">Username</p>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <p className="text-body-md text-font-primary">E-mail</p>
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <p className="text-body-md text-font-primary">Password</p>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <p className="text-body-md text-font-primary">Confirm Password</p>
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
          <p className="text-body-md text-font-primary">Avatar url</p>
          <input
            name="avatar"
            type="url"
            placeholder="Avatar url"
            value={formData.avatar}
            alt={`Avatar of ${formData.username}`}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <p className="text-body-md text-font-primary">Banner url</p>
          <input
            name="banner"
            type="url"
            placeholder="Banner url"
            value={formData.banner}
            alt="Profile banner"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <p className="text-body-md text-font-primary">
            Tell us about yourself
          </p>
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
              <h2 className="text-heading-6 mb-0 text-font-primary">
                Venue manager?
              </h2>
              <p className="text-body-xs m-0 text-font-primary">
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
              className="w-full bg-brand-secondary hover:bg-brand-secondary-hover text-white py-2 px-4 rounded"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
