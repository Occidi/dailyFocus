import useLocalStorage from "../../../hooks/useLocalStorage";
import {
  createTask,
  removeTaskById,
  addTaskToList,
  type Task,
} from "../utils/taskHelpers";
import type { Dispatch, SetStateAction } from "react";

const STORAGE_KEY = "dailyFocus_tasks";

/**
 * Custom hook for managing the initial list of tasks
 *
 * @returns {Object} Task management functions and state
 * @returns {Array} tasks - Array of task objects
 * @returns {Function} addTask - Add a new task with text
 * @returns {Function} deleteTask - Delete a task by id
 */
const useTasks = (): {
  tasks: Task[];
  addTask: (text: string) => void;
  deleteTask: (id: string) => void;
  getTasks: () => Task[];
} => {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, []) as [
    Task[],
    Dispatch<SetStateAction<Task[]>>,
  ];

  const addTask = (text: string) => {
    const newTask = createTask(text);
    if (newTask) {
      setTasks((prevTasks) => addTaskToList(prevTasks, newTask));
    }
  };

  /**
   * @param {string} id - the ID of the task we want to delete
   */
  const deleteTask = (id: string) => {
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
