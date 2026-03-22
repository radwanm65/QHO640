// App.js
import { ThemeProvider } from "./ThemeContext";
import Main from "./Main";
import ExampleComponent from "./ExampleComponent";

export default function App() {
  return (
    <ThemeProvider>
      <Main />
      <ExampleComponent />
    </ThemeProvider>
  );
}
