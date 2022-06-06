import React, { useState, useLayoutEffect, createContext } from "react";

const ThemeContext = createContext({
  dark: false,
  toggle: () => {},
});

export default ThemeContext;

export function ThemeProvider(props) {
  // keeps state of the current chosen theme
  const [dark, setDark] = useState(false);

  // paints the app before it renders elements
  useLayoutEffect(() => {
    const lastTheme = window.localStorage.getItem("darkTheme");

    if (lastTheme === "true") {
      setDark(true);
      applyTheme(darkTheme);
    }

    if (!lastTheme || lastTheme === "false") {
      setDark(false);
      applyTheme(lightTheme);
    }
    // if state changes, repaints the app
  }, [dark]);

  // here is the connection to change the lightTheme const to css
  const applyTheme = (theme) => {
    const root = document.getElementsByTagName("body")[0];
    root.style.cssText = theme.join(";");
  };

  const toggle = () => {
    setDark(!dark);
    window.localStorage.setItem("darkTheme", !dark);
  };

  /* theme colors ---------------------------------------- */

  const lightTheme = [
    "--color-text: RGB(0, 0, 0)",
    "--color-accent: RGB(165, 32, 25)",
    "--color-bg-tint: RGB(244, 241, 241)",
    "--color-accent-combo: RGB(254, 208, 0)",
    "--color-accent-light: rgba(249, 182, 11, 0.2)",
    "--color-basic-bg: RGB(255, 255, 255)",
    "--color-grey: RGB(119, 119, 119)",
    "--color-light-green: RGB(27, 204, 92)",
    "--color-green: RGB(6, 122, 70)",
  ];

  const darkTheme = [
    "--color-text: RGB(255, 255, 255)",
    "--color-accent: RGB(254, 208, 0)",
    "--color-bg-tint: RGB(244, 241, 241)",
    "--color-accent-combo: RGB(165, 32, 25)",
    "--color-accent-light: rgba(249, 182, 11, 0.2)",
    "--color-basic-bg: RGB(165, 32, 25)",
    "--color-grey: RGB(119, 119, 119)",
    "--color-light-green:  RGB(6, 122, 70)",
    "--color-green: RGB(27, 204, 92)",
  ];

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
