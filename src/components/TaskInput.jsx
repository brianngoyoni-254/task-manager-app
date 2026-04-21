function TaskInput({ newTask, setNewTask, onAdd }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Enter a task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onAdd();
          }
        }}
      />

      <button onClick={onAdd} disabled={!newTask.trim()}>
        Add
      </button>
    </div>
  );
}

export default TaskInput;