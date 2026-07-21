import React from "react";
import { useNavigate } from "react-router-dom";
import { useHandleAuth } from "../hooks/useHandleAuth";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { handleAuth } = useHandleAuth();
  return (
    <div className="min-h-screen grid place-items-center ">
      <div className="w-80 bg-white p-6 rounded-lg shadow-lg grid place-items-center gap-2">
        <h2 className="text-xl font-bold">Register</h2>
        <p>Register to create an account.</p>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:gray-300 w-full"
        />
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
          onClick={() => handleAuth("register", email, password)}
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
