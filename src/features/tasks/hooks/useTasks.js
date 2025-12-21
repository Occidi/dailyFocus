import useLocalStorage from "../../../hooks/useLocalStorage";
import {
  createTask,
  removeTaskById,
  addTaskToList,
} from "../utils/taskHelpers";

const STORAGE_KEY = "dailyFocus_tasks";

/**
 * Custom hook for managing the initial list of tasks
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
    const newTask = createTask(text);
    if (newTask) {
      setTasks((prevTasks) => addTaskToList(prevTasks, newTask));
    }
  };

  /**
   * @param {string} id - the ID of the task we want to delete
   */
  const deleteTask = (id) => {
    setTasks((prevTasks) => removeTaskById(prevTasks, id));
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
