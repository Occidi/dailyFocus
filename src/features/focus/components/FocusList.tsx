import FocusTaskItem from "./FocusTaskItem";
import type { Task } from "../../tasks/utils/taskHelpers";

function FocusList({
  focusList,
  onComplete,
}: {
  focusList: Task[];
  onComplete: (taskId: string) => void;
}) {
  return (
    <section className="rounded-lg bg-slate-900/60 border border-slate-200 border-slate-700 p-4 sm:p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 text-slate-100">
        Focus List
      </h2>
      {focusList.length === 0 ? (
        <p className="text-sm text-gray-600 text-slate-400">
          No tasks in focus. Add tasks from your task list to get started!
        </p>
      ) : (
        <>
          <p className="text-xs text-gray-500 text-slate-400 mb-3">
            {focusList.length} of 4
          </p>
          <ul className="divide-y divide-slate-700">
            {focusList.map((task) => (
              <FocusTaskItem
                key={task.id}
                task={task}
                onComplete={onComplete}
              />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default FocusList;
