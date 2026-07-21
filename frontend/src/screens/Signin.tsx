import React from "react";
import { useNavigate } from "react-router-dom";
import { useHandleAuth } from "../hooks/useHandleAuth";

const Signin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();
  const { handleAuth } = useHandleAuth();

  return (
    <div className="min-h-screen grid place-items-center ">
      <div className="w-80 bg-white p-6 rounded-lg shadow-lg grid place-items-center gap-2">
        <h2 className="text-xl font-bold">Sign In</h2>
        <p>Sign in to your account.</p>

        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:gray-300 w-full"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:gray-300 w-full"
        />

        <button
          onClick={() => handleAuth("login", email, password)}
          className="w-full bg-green-500 text-white p-2 rounded-md mt-4 hover:bg-green-600 cursor-pointer"
        >
          Sign In
        </button>

        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            onClick={() => navigate("/signup")}
            className="text-green-500 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
