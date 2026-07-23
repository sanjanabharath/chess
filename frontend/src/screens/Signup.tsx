import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function submit() {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await api.post("/auth/register", {
        email,
        password,
      });

      alert("Account created successfully.");
      navigate("/signin");
    } catch (error: any) {
      alert(error.response?.data?.message || "Registration failed");
    }
  }
  return (
    <div className="min-h-screen grid place-items-center ">
      <div className="w-80 bg-white p-6 rounded-lg shadow-lg grid place-items-center gap-2">
        <h2 className="text-xl font-bold">Register</h2>
        <p>Register to create an account.</p>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:gray-300 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:gray-300 w-full"
        />

        <button
          className="w-full bg-green-500 text-white p-2 rounded-md mt-4 hover:bg-green-600 cursor-pointer"
          onClick={submit}
        >
          Register
        </button>

        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <a
            onClick={() => navigate("/signin")}
            className="text-green-500 hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
