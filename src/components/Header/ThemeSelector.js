import React, { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import { IoMdMoon as Moon, IoMdSunny as Sun } from "react-icons/io";

export default function ThemeSelector() {
  const { dark, toggle } = useContext(ThemeContext);

  return (
    <div className="theme">
    <button className="sun-moon" onClick={() => toggle()}>
      <Sun className={`icon ${!dark ? "active" : ""}`} />
      <Moon className={`icon ${dark ? "active" : ""}`} />
    </button>
    </div>
  );
}
