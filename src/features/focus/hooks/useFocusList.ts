import useLocalStorage from "../../../hooks/useLocalStorage";
import { removeTaskById, addTaskToList } from "../../tasks/utils/taskHelpers";

const STORAGE_KEY = "dailyFocus_focusList";
const MAX_FOCUS_TASKS = 4;

/**
 * Custom hook for managing the focus list
 * Focus list is limited to a maximum of 4 tasks.
 *
 * @returns {Object} Focus list management functions and state
 * @returns {Array} focusList - Array of task objects
 * @returns {Function} addToFocus - Add a task to focus list
 * @returns {Function} removeFromFocus - Remove a task from focus list
 * @returns {Function} canAddToFocus - Check if focus list has room
 */
const useFocusList = () => {
  const [focusList, setFocusList] = useLocalStorage(STORAGE_KEY, []);

  /**
   * @param {Object} task - task object to add to focus list
   * @returns {boolean} true if added, false if list is full
   */
  const addToFocus = (task) => {
    if (!task || focusList.length >= MAX_FOCUS_TASKS) {
      return false;
    }

    setFocusList((prevList) => addTaskToList(prevList, task));

    return true;
  };

  /**
   * @param {string} id - the ID of the task to remove from focus
   */
  const removeFromFocus = (id) => {
    setFocusList((prevList) => removeTaskById(prevList, id));
  };

  /**
   * @returns {boolean} true if focus list has room for more tasks
   */
  const canAddToFocus = () => focusList.length < MAX_FOCUS_TASKS;

  return {
    focusList,
    addToFocus,
    removeFromFocus,
    canAddToFocus,
  };
};

export default useFocusList;
