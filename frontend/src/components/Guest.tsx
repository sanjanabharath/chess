import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { guestAtom } from "../atoms/guest";

const Guest = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useRecoilState(guestAtom);

  const joinGame = () => {
    setUsername(username);
    navigate("/game");
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="w-80 bg-white p-6 rounded-lg shadow-lg grid place-items-center gap-2">
        <h2 className="text-xl font-bold">Sign In</h2>

        <p>Join using a guest account.</p>

        <input
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full"
        />

        <button
          onClick={joinGame}
          className="w-full bg-[#C97B4A] text-white p-2 rounded-md mt-4 hover:[#b13f00] cursor-pointer"
        >
          Join as Guest
        </button>
      </div>
    </div>
  );
};

export default Guest;
