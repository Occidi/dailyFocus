import ThemeToggle from "./components/ThemeToggle.jsx";
import { TaskInput, TaskList, useTasks } from "./features/tasks";

function App() {
  const { tasks, addTask, deleteTask } = useTasks();

  return (
    <>
      <header className="w-full">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-end">
          <ThemeToggle />
        </div>
      </header>

      <main className="w-full flex-1">
        <div className="max-w-[1280px] mx-auto p-8 text-center">
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-6">
            <section className="rounded-lg p-6 shadow-sm bg-white/10 dark:bg-black/20">
              <TaskInput addTask={addTask} />
              <TaskList tasks={tasks} deleteTask={deleteTask} />
            </section>

            <section className="rounded-lg p-6 shadow-sm bg-white/10 dark:bg-black/20">
              <h2 className="text-xl font-semibold">Focus List</h2>
            </section>

            <section className="rounded-lg p-6 shadow-sm bg-white/10 dark:bg-black/20">
              <h2 className="text-xl font-semibold">Completed List</h2>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
