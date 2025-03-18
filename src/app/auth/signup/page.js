"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { z } from "zod";

// Define the validation schema with Zod
const SignUpSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate the individual field on change
    const fieldSchema = SignUpSchema.shape[name];

    try {
      fieldSchema.parse(value);
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (error) {
      setFormErrors((prev) => ({ ...prev, [name]: error.errors?.[0]?.message || error.message }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the entire form
    const validation = SignUpSchema.safeParse(formData);

    if (!validation.success) {
      // Extract only the error messages
      const errorMessages = validation.error.errors.map((err) => err.message);

      // Map field-specific errors for UI display
      const fieldErrors = {};
      validation.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setFormErrors(fieldErrors);
      return;
    }

    // No validation errors, proceed with API request
    try {
      const response = await axios.post("/api/signup", formData);
      console.log(response.data);
      // const res = await fetch("/api/signup", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ ...formData, role: "user" }),
      // });
      toast.success(`Welcome ${formData.username}, You signed up!`);

      setFormData({
        username: "",
        email: "",
        password: "",
        role: "user",
      });

      setFormErrors({});
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Error signing up. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Register Now
        </h2>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-gray-700 font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className={`w-full p-3 border ${
                formErrors.username ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring focus:ring-blue-300`}
            />
            {formErrors.username && (
              <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full p-3 border ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring focus:ring-blue-300`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full p-3 border ${
                formErrors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring focus:ring-blue-300`}
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Redirect to Sign In */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/auth/signin" className="text-blue-600 font-medium hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
