"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email}),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to send reset link.");
      } else {
        toast.success("Reset link sent! Check your email.");
      }

    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Forgot Password</h2>

        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Back to{" "}
          <a href="/auth/signin" className="text-blue-600 font-medium hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
