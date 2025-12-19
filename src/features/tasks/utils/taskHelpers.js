/**
 * Creates a new task object with generated ID and timestamp.
 *
 * @param {string} text - The task description
 * @returns {Object|null} New task object or null if text is invalid
 */
export const createTask = (text) => {
  if (!text || text.trim() === "") {
    return null;
  }

  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    createdAt: Date.now(),
  };
};

/**
 * Filters out a task by ID from a task array.
 *
 * @param {Array} tasks - Array of task objects
 * @param {string} id - The ID of the task to remove
 * @returns {Array} New array without the specified task
 */
export const removeTaskById = (tasks = [], id = "") =>
  tasks.filter((task) => task.id !== id);

/**
 * Adds a task to an array of tasks.
 *
 * @param {Array} tasks - Existing array of tasks
 * @param {Object} task - Task object to add
 * @returns {Array} New array with the task added
 */
export const addTaskToList = (tasks = [], task) => {
  if (!Array.isArray(tasks) || !task) {
    throw new Error("trying to call addTaskToList with wrong parameters");
  }

  return [...tasks, task];
};
