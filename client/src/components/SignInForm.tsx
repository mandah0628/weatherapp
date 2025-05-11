"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function SignInForm({ showForm }: { showForm: (form: "login" | "register") => void }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  type ClientErrors = {
    email?: string;
    password?: string;
  };
  const [clientErrors, setClientErrors] = useState<ClientErrors>({});
  const [serverError, setServerError] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const cardClass = "bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur-sm";

  const { Login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setClientErrors({});
    setServerError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formErrors: { [key: string]: string } = {};

    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!emailRegex.test(email)) {
      formErrors.email = "Invalid email format";
    } else if (email === "") {
      formErrors.email = "Email is required";
    }

    if (password === "") {
      formErrors.password = "Password is required";
    } else if (password.length < 8) {
      formErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(formErrors).length !== 0) {
      setClientErrors(formErrors);
      return;
    }

    try {
      setSubmitting(true);
      
      await Login(email, password);
    } catch (error: any) {
      console.error(error.response);
      setServerError(error.response?.data?.error || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`p-4 ${cardClass}`}>
      <h2 className="text-xl font-bold mb-4 text-center">Sign In</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* email */}
        <div>
          <label htmlFor="email" className="block font-medium mb-1">Email</label>
          <input
            value={formData.email}
            onChange={handleChange}
            id="email"
            name="email"
            type="email"
            required
            className={`w-full px-3 py-2 border rounded-xl focus:outline-none  ${
              clientErrors.email ? "border-red-500" : "border-gray-400"
            }`}
          />
          {clientErrors.email && (
            <p className="text-red-500 text-sm mt-1 font-bold ">{clientErrors.email}</p>
          )}
        </div>


        {/* password */}
        <div>
          <label htmlFor="password" className="block font-medium mb-1">Password</label>
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
          {clientErrors.password && (
            <p className="text-red-500 text-sm mt-1 font-bold ">{clientErrors.password}</p>
          )}
        </div>


        {serverError && (
          <p className="text-red-500 text-sm mt-1 font-bold ">{serverError}</p>
        )}

        {/* login button */}
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          {submitting ? "Signing in..." : "Sign In"}
        </button>
      </form>


      {/* register section */}
      <div className="mt-6 text-center">
        <p className="mb-2">Don’t have an account?</p>
        <button
          onClick={() => showForm("register")}
          className="text-blue-600 font-semibold hover:underline cursor-pointer hover:font-bold"
        >
          Register
        </button>
      </div>
    </div>
  );
}
