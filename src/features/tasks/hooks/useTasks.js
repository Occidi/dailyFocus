import useLocalStorage from "../../../hooks/useLocalStorage";

const STORAGE_KEY = "dailyFocus_tasks";

/**
 * Custom hook for managing tasks with localStorage persistence.
 *
 * @returns {Object} Task management functions and state
 * @returns {Array} tasks - Array of task objects
 * @returns {Function} addTask - Add a new task with text
 * @returns {Function} deleteTask - Delete a task by id
 */
const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, []);

  /**
   * @param {string} text - description of the task
   */
  const addTask = (text) => {
    if (!text || text.trim() === "") {
      return;
    }

    const newTask = {
      id: crypto.randomUUID(),
      text: text.trim(),
      createdAt: Date.now(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  /**
   * @param {string} id - the ID of the task we want to delete
   */
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  /**
   * @returns {Array} All tasks
   */
  const getTasks = () => tasks;

  return {
    tasks,
    addTask,
    deleteTask,
    getTasks,
  };
};

export default useTasks;
