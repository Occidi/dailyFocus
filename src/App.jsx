import "./App.css";
import ThemeToggle from "./components/ThemeToggle.jsx";

function App() {
  return (
    <>
      <div className="flex justify-end">
        <ThemeToggle />
      </div>
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">Hello World</h1>
      </div>
    </>
  );
}

export default App;
