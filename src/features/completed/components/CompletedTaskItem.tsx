import { formatRelativeTime } from "../utils/completedHelpers";

function CompletedTaskItem({ task }) {
  return (
    <li className="py-3 px-2 group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-sm sm:text-base font-medium text-gray-500 dark:text-slate-400 line-through group-hover:no-underline group-hover:text-gray-900 group-hover:dark:text-slate-100 transition-colors">
            {task.text}
          </p>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
            {formatRelativeTime(task.completedAt)}
          </p>
        </div>
      </div>
    </li>
  );
}

export default CompletedTaskItem;
