import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

const Guest = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function submit() {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      navigate("/game");
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="w-80 bg-white p-6 rounded-lg shadow-lg grid place-items-center gap-2">
        <h2 className="text-xl font-bold">Sign In</h2>

        <p>Sign in to your account.</p>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full"
        />

        <button
          onClick={submit}
          className="w-full bg-[#C97B4A] text-white p-2 rounded-md mt-4 hover:[#b13f00] cursor-pointer"
        >
          Sign In
        </button>

        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#C97B4A] hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Guest;
