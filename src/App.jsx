import './App.css';
import { useTheme } from './context';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <button
        type="button"
        onClick={toggleTheme}
        className="ml-4 px-3 py-1 rounded-md border bg-gray-100 dark:bg-gray-800"
      >
        {theme}
      </button>
    </div>
  );
}

export default App;
