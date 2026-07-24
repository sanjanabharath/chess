import { api } from "../api/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Crown, LogIn, ChevronDown, LogOut } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    api
      .get("/me")
      .then((res) => {
        setEmail(res.data.email);
        setIsAuthenticated(true);
      })
      .catch(() => {
        // token was invalid/expired — treat the user as logged out
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      });
  }, []);

  function handleNavClick() {
    if (isAuthenticated) {
      setIsOpen((prev) => !prev);
    } else {
      navigate("/signin");
    }
  }

  function handleLogout() {
    setIsOpen(false);
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setEmail("");
    navigate("/");
  }

  return (
    <nav className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-2">
        <Crown
          className="w-6 h-6"
          style={{ color: "var(--ember)" }}
          strokeWidth={1.75}
        />
        <span className="cm-display text-xl font-medium tracking-tight">
          Chessmate
        </span>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={handleNavClick}
          className="cm-btn-ghost flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium max-w-[220px]"
        >
          {isAuthenticated ? (
            <>
              <span className="truncate">{email}</span>
              <ChevronDown
                className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                strokeWidth={1.75}
              />
            </>
          ) : (
            <>
              <LogIn className="w-4 h-4" strokeWidth={1.75} />
              Sign in
            </>
          )}
        </button>

        {isAuthenticated && isOpen && (
          <div className="cm-card absolute right-0 mt-2 w-44 rounded-md shadow-lg overflow-hidden">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 text-left px-4 py-2.5 text-sm"
              style={{ color: "var(--check)" }}
            >
              <LogOut className="w-4 h-4" strokeWidth={1.75} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
