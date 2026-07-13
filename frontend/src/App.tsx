import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./screens/Landing";
import Game from "./screens/Game";
import Signup from "./screens/Signup";
import Signin from "./screens/Signin";

function App() {
  return (
    <div className="h-screen bg-slate-900 background">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/game" element={<Game />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
