import { AppProvider } from "./app-provider";
import { AppRouting } from "./app-roiting";
import "./global.css";

function App() {
  return (
    <AppProvider>
      <AppRouting />
    </AppProvider>
  );
}

export default App;
