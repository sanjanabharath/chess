import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center p-4 text-white">
      <div className="font-bold text-3xl">Chessmate</div>
      <div>
        <Button className="px-6 py-2" onClick={() => navigate("/signin")}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
