import useLocalStorage from "../../../hooks/useLocalStorage";
import {
  addTaskToList,
  addCompletionTimestamp,
} from "../../tasks/utils/taskHelpers";

const STORAGE_KEY = "dailyFocus_completed";

/**
 * Custom hook for managing completed tasks
 *
 * @returns {Object} Completed list management functions and state
 * @returns {Array} completed - Array of completed task objects
 * @returns {Function} addToCompleted - Add a task to completed list
 */
const useCompleted = () => {
  const [completed, setCompleted] = useLocalStorage(STORAGE_KEY, []);

  /**
   * @param {Object} task - task object to add to completed list
   */
  const addToCompleted = (task) => {
    if (!task) {
      return;
    }

    const taskWithTimestamp = addCompletionTimestamp(task);
    setCompleted((prevList) => addTaskToList(prevList, taskWithTimestamp));
  };

  return {
    completed,
    addToCompleted,
  };
};

export default useCompleted;
