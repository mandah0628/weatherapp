"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function RegisterForm({ showForm }: { showForm: (form: "login" | "register") => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  type ClientErrors = {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  const [clientErrors, setClientErrors] = useState<ClientErrors>({});
  const [serverError, setServerError] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const cardClass = "bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur-sm";
  const { Register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setClientErrors({});
    setServerError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const formErrors: { [key: string]: string } = {};

      const name = formData.name.trim();
      const email = formData.email.trim();
      const password = formData.password.trim();
      const confirmPassword = formData.confirmPassword.trim();

      if (!emailRegex.test(email)) {
        formErrors.email = "Invalid email format";
      } else if (email === "") {
        formErrors.email = "Email is required";
      }

      if (name === "") {
        formErrors.name = "Name is required";
      }

      if (password === "") {
        formErrors.password = "Password is required";
      } else if (password.length < 8) {
        formErrors.password = "Password must be at least 8 characters";
      }

      if (confirmPassword === "") {
        formErrors.confirmPassword = "Please confirm your password";
      } else if (confirmPassword !== password) {
        formErrors.confirmPassword = "Passwords must match";
      }

      if (Object.keys(formErrors).length !== 0) {
        setClientErrors(formErrors);
        return;
      }

      await Register(name, email, password);
    } catch (error: any) {
      console.error(error);
      setServerError(error.response?.data?.error || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`p-4 ${cardClass}`}>
      <h1 className="text-xl font-bold mb-4 text-center">Register</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* name */}
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Name
          </label>
          <input
            value={formData.name}
            onChange={handleChange}
            id="name"
            name="name"
            type="text"
            required
            className={`w-full px-3 py-2 border rounded-xl focus:outline-none ${
              clientErrors.name ? "border-red-500" : "border-gray-400"
            }`}
          />
          {clientErrors.name && <p className="text-red-500 font-bold text-sm mt-1">{clientErrors.name}</p>}
        </div>

        {/* email */}
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            value={formData.email}
            onChange={handleChange}
            id="email"
            name="email"
            type="email"
            required
            className={`w-full px-3 py-2 border rounded-xl focus:outline-none ${
              clientErrors.email ? "border-red-500" : "border-gray-400"
            }`}
          />
          {clientErrors.email && <p className="text-red-500 font-bold  text-sm mt-1">{clientErrors.email}</p>}
        </div>

        {/* password */}
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            value={formData.password}
            onChange={handleChange}
            id="password"
            name="password"
            type="password"
            required
            className={`w-full px-3 py-2 border rounded-xl focus:outline-none ${
              clientErrors.password ? "border-red-500" : "border-gray-400"
            }`}
          />
          {clientErrors.password && <p className="text-red-500 font-bold  text-sm mt-1">{clientErrors.password}</p>}
        </div>


        {/* confirm password */}
        <div>
          <label htmlFor="confirmPassword" className="block mb-1 font-medium">
            Confirm Password
          </label>
          <input
            value={formData.confirmPassword}
            onChange={handleChange}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className={`w-full px-3 py-2 border rounded-xl focus:outline-none ${
              clientErrors.confirmPassword ? "border-red-500" : "border-gray-400"
            }`}
          />
          {clientErrors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1 font-bold ">{clientErrors.confirmPassword}</p>
          )}
        </div>

        {serverError && <p className="text-red-500 font-bold text-sm mt-1">{serverError}</p>}

        {/* submit button */}
        <button
          type="submit"
          disabled={submitting}
          className="bg-green-600 text-white py-2 rounded cursor-pointer hover:bg-green-700 disabled:opacity-50"
        >
          {submitting ? "Registering..." : "Register"}
        </button>
      </form>
      
      {/* sign in section */}
      <div className="mt-6 text-center">
        <p className="mb-2">Already have an account?</p>
        <button
          onClick={() => showForm("login")}
          className="text-blue-600 font-semibold hover:underline cursor-pointer hover:font-bold"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
