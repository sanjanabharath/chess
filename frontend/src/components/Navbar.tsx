import axios from "axios";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:3000/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setEmail(res.data.email))
      .catch(console.error);
  }, [token]);
  return (
    <div className="flex justify-between items-center p-4 text-white">
      <div className="font-bold text-3xl">Chessmate</div>
      <div>
        {token ? (
          <p>{email}</p>
        ) : (
          <Button className="px-6 py-2" onClick={() => navigate("/signin")}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
