import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Users2, Radio, ArrowRight, LogIn } from "lucide-react";
import Navbar from "../components/Navbar";

const SquareDivider = ({ litIndex = 5 }: { litIndex?: number }) => {
  const squares = Array.from({ length: 12 });
  return (
    <div className="square-divider" aria-hidden="true">
      {squares.map((_, i) => (
        <span
          key={i}
          className={
            "square-cell" +
            (i === litIndex
              ? " square-cell--lit"
              : i % 2 === 0
                ? " square-cell--dark"
                : "")
          }
        />
      ))}
    </div>
  );
};

const Landing = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Checked on every mount, so returning to "/" after logging in or out
  // (e.g. via browser back button) always reflects the current session.
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Play now -> straight to the game. If the token is missing or has
  // expired, ProtectedRoute (wrapping "/game") bounces the user to
  // /signin automatically, so this is safe to call unconditionally.
  function handlePlay() {
    navigate("/game");
  }

  // Nav button doubles as "Sign in" when logged out and "go to my game"
  // when already logged in, instead of sending an authenticated user
  // back through the sign-in form.
  function handleNavClick() {
    navigate(isAuthenticated ? "/game" : "/signin");
  }

  function handleSignInGhost() {
    navigate("/signin");
  }

  return (
    <div className="cm-root">
      {/* ---------------- Nav ---------------- */}
      <Navbar />

      {/* ---------------- Hero ---------------- */}
      <section className="relative px-6 sm:px-10 pt-12 sm:pt-20 pb-16 sm:pb-24 max-w-6xl mx-auto text-center">
        <div className="cm-board-bg" />
        <div
          className="cm-glow"
          style={{
            background: "var(--hunter)",
            width: 420,
            height: 420,
            top: -80,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        <div className="relative">
          <p className="cm-eyebrow text-xs sm:text-sm font-semibold uppercase mb-5">
            Real-time chess, no download
          </p>

          <h1 className="cm-display text-4xl sm:text-6xl md:text-7xl leading-[1.05] font-medium max-w-3xl mx-auto">
            Every game is decided
            <br />
            <span style={{ color: "var(--ember)" }}>one square at a time.</span>
          </h1>

          <p
            className="mt-6 text-base sm:text-lg max-w-xl mx-auto"
            style={{ color: "var(--mist)" }}
          >
            Play live, ranked matches against opponents around the world.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handlePlay}
              className="cm-btn-primary w-full sm:w-auto flex items-center justify-center gap-2 rounded-md px-7 py-3.5 text-base font-semibold cursor-pointer"
            >
              Play now
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
            {!isAuthenticated && (
              <button
                onClick={handleSignInGhost}
                className="cm-btn-ghost w-full sm:w-auto rounded-md px-7 py-3.5 text-base font-medium cursor-pointer"
              >
                I already have an account
              </button>
            )}
          </div>
        </div>
      </section>

      <SquareDivider litIndex={5} />
    </div>
  );
};

export default Landing;
