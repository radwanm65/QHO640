// Child.js
import { useTheme } from "./ThemeContext";

export default function Child() {
  const { darkMode, toggleDarkMode } = useTheme();

  const styles = {
    backgroundColor: darkMode ? "#222" : "#fff",
    color: darkMode ? "#fff" : "#000",
    padding: "20px",
  };

  return (
    <div style={styles}>
      <p>Dark mode is {darkMode ? "ON" : "OFF"}</p>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
    </div>
  );
}
