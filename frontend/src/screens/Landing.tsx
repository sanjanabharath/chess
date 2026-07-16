import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Navbar from "../components/Navbar";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div>
      {" "}
      <Navbar />
      <img src="/hand_left.png" alt="Chess hand" className="left_hand" />
      <img src="/hand_right.png" alt="Chess hand" className="right_hand" />
      <div className="flex justify-center">
        <div className="pt-48 max-w-screen-lg items-center text-center">
          <div className="grid grid-cols-1 gap-4 md:grid-row-2 text-4xl text-slate-50 font-semibold">
            <div className="">
              “Chess holds its master in its own bonds, shackling the mind and
              brain so that the inner freedom of the very strongest must
              suffer.” ~{" "}
              <span className="font-bold italic">Albert Einstein</span>
            </div>
            <div className="">
              <div className="mt-4 flex justify-center">
                <Button className="px-6 py-3" onClick={() => navigate("/game")}>
                  Play Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
