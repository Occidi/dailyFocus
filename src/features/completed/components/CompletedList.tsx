import CompletedTaskItem from "./CompletedTaskItem";

export type CompletedTask = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  text: string;
  createdAt: number;
  completedAt: number;
};

function CompletedList({ completed }: { completed: CompletedTask[] }) {
  return (
    <section className="rounded-lg bg-white bg-slate-900/60 border border-slate-700 p-4 sm:p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 text-slate-100">
        Completed List
      </h2>
      {completed.length === 0 ? (
        <p className="text-sm text-gray-600 text-slate-400">
          No completed tasks yet. Complete tasks from your focus list!
        </p>
      ) : (
        <ul className="divide-y divide-slate-700">
          {completed.map((task) => (
            <CompletedTaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default CompletedList;
