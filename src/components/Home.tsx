import { useContext, useState } from "react";
import "./Home.scss";
import { myContext } from "../Context";
import { Moon, Sun, ToggleLeft, ToggleRight } from "lucide-react";
import Pomodoro from "./pomodoro/Pomodoro";

function Home() {
  const { theme, toggleTheme } = useContext(myContext);
  const [pomodoro, setPomodoro] = useState(false);

  const Icon1 = pomodoro ? ToggleRight : ToggleLeft;

  const Icon2 = theme === "dark" ? Sun : Moon;

  return (
    <>
      <div id="home" className={theme}>
        {pomodoro && <Pomodoro />}
        <div id="home-div">
          <p>Pomodoro</p>
          <Icon1
            onClick={() => setPomodoro(!pomodoro)}
            className="toggle-icon"
          />
        </div>
        <button onClick={toggleTheme}>
          <Icon2 />
        </button>
      </div>
    </>
  );
}

export default Home;
