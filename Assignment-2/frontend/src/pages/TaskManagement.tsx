import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchProjectTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/api";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
}

const TaskManagement: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      if (!projectId) return;
      setLoading(true);
      try {
        const backendTasks = await fetchProjectTasks(Number(projectId));
        setTasks(backendTasks);
      } catch (err) {
        setError("Failed to fetch tasks.");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [projectId]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const toggleComplete = async (taskId: number) => {
    const task = tasks.find((task) => task.id === taskId);
    if (!task || !projectId) return;
    try {
      const updated = await updateTask(Number(projectId), taskId, {
        isCompleted: !task.completed,
      });
      setTasks(
        tasks.map((t) =>
          t.id === taskId ? { ...t, completed: updated.isCompleted } : t
        )
      );
    } catch {
      setError("Failed to update task completion.");
    }
  };

  const handleAddTask = async () => {
    if (!newTaskTitle.trim() || !projectId) {
      setError("Please enter a task title.");
      return;
    }
    try {
      const created = await createTask(Number(projectId), {
        title: newTaskTitle,
        dueDate: newTaskDueDate || undefined,
      });
      setTasks([...tasks, created]);
      setNewTaskTitle("");
      setNewTaskDueDate("");
      setError("");
    } catch {
      setError("Failed to create task.");
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (!projectId) return;

    try {
      await deleteTask(Number(projectId), taskId);
      setTasks(tasks.filter((t) => t.id !== taskId));
      setError("");
    } catch {
      setError("Failed to delete task.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-indigo-600 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded ${
            filter === "completed" ? "bg-indigo-600 text-white" : "bg-gray-200"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded ${
            filter === "pending" ? "bg-indigo-600 text-white" : "bg-gray-200"
          }`}
        >
          Pending
        </button>
      </div>

      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="New task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="border p-2 rounded flex-grow"
        />
        <input
          type="date"
          value={newTaskDueDate}
          onChange={(e) => setNewTaskDueDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAddTask}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      {loading ? (
        <div>Loading tasks...</div>
      ) : (
        <ul>
          {filteredTasks.map(({ id, title, completed, dueDate }) => (
            <li
              key={id}
              className="mb-3 flex justify-between items-center p-3 border rounded hover:shadow"
            >
              <div>
                <input
                  id={`task-${id}`}
                  type="checkbox"
                  checked={completed}
                  onChange={() => toggleComplete(id)}
                  className="mr-3"
                />
                <label
                  htmlFor={`task-${id}`}
                  className={completed ? "line-through text-gray-500" : ""}
                >
                  {title}
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-400">Due: {dueDate}</div>
                <button
                  className="text-red-500 hover:text-red-700 font-bold"
                  onClick={() => handleDeleteTask(id)}
                  aria-label={`Delete task ${title}`}
                  title="Delete task"
                >
                  &times;
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskManagement;
