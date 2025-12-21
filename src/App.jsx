import ThemeToggle from "./components/ThemeToggle.jsx";
import { TaskInput, TaskList, useTasks } from "./features/tasks";
import useFocusList from "./features/focus/hooks/useFocusList";
import useCompleted from "./features/completed/hooks/useCompleted";
import FocusList from "./features/focus/components/FocusList";
import CompletedList from "./features/completed/components/CompletedList";

function App() {
  const { tasks, addTask, deleteTask } = useTasks();
  const { focusList, addToFocus, removeFromFocus, canAddToFocus } =
    useFocusList();
  const { completed, addToCompleted } = useCompleted();

  const handleAddToFocus = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task && addToFocus(task)) {
      deleteTask(taskId);
    }
  };

  const handleCompleteTask = (taskId) => {
    const task = focusList.find((t) => t.id === taskId);
    if (task) {
      addToCompleted(task);
      removeFromFocus(taskId);
    }
  };

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
              <TaskList
                tasks={tasks}
                deleteTask={deleteTask}
                onAddToFocus={handleAddToFocus}
                canAddToFocus={canAddToFocus()}
              />
            </section>

            <section className="rounded-lg p-6 shadow-sm bg-white/10 dark:bg-black/20">
              <FocusList
                focusList={focusList}
                onComplete={handleCompleteTask}
              />
            </section>

            <section className="rounded-lg p-6 shadow-sm bg-white/10 dark:bg-black/20">
              <CompletedList completed={completed} />
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
