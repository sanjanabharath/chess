import { useAuth } from "../context/AuthContext"; // adjust path

const API_BASE = "http://localhost:3000"; // adjust to your actual base path

type AuthEndpoint = "login" | "register";

export function useHandleAuth() {
  const { login } = useAuth();

  const handleAuth = async (
    endpoint: AuthEndpoint,
    email: string,
    password: string,
  ) => {
    try {
      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message || "Something went wrong");
        return false;
      }

      login(data.token);
      return true;
    } catch (err) {
      console.log("Network error. Please try again.");
      return false;
    } finally {
      console.log(false);
    }
  };

  return { handleAuth };
}
