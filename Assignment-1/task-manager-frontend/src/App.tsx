import React, { useEffect, useState } from "react";
import axios from "axios";
import { TaskItem } from "./types/TaskItem";

const API_URL = "http://localhost:5256/api/tasks";

type Filter = "all" | "completed" | "active";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get<TaskItem[]>(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
    setLoading(false);
  };

  const addTask = async () => {
    if (!newTaskDescription.trim()) return;
    setLoading(true);
    try {
      const newTask = { description: newTaskDescription, isCompleted: false };
      const response = await axios.post<TaskItem>(API_URL, newTask);
      console.log("Add Task Response:", response.data);// check
      setTasks([...tasks, response.data]);
      setNewTaskDescription("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
    
    setLoading(false);
  };

  const toggleCompletion = async (task: TaskItem) => {
    setLoading(true);
    try {
      const updatedTask = { ...task, isCompleted: !task.isCompleted };
      const response = await axios.put<TaskItem>(`${API_URL}/${task.id}`, updatedTask);
      setTasks(tasks.map(t => (t.id === task.id ? response.data : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
    setLoading(false);
  };

  const deleteTask = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    setLoading(false);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.isCompleted;
    if (filter === "active") return !task.isCompleted;
    return true;
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Task Manager</h1>

      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Add new task description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTask();
            }
          }}
          style={styles.input}
          disabled={loading}
        />
        <button
          onClick={addTask}
          style={
            loading || !newTaskDescription.trim()
              ? styles.addButtonDisabled
              : styles.addButton
          }
          disabled={loading || !newTaskDescription.trim()}
        >
          Add Task
        </button>
      </div>

      <div style={styles.filterContainer}>
        {(["all", "completed", "active"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            disabled={loading}
            style={
              filter === f ? styles.activeFilterButton : styles.filterButton
            }
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>


      {loading ? (
        <div style={styles.loading}>Loading...</div>
      ) : filteredTasks.length > 0 ? (
        <ul style={styles.taskList}>
          {filteredTasks.map((task) => (
            <li key={task.id} style={styles.taskItem}>
              <label
                style={
                  task.isCompleted
                    ? styles.taskCompleted
                    : { ...styles.taskText }
                }
              >
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => toggleCompletion(task)}
                  style={styles.checkbox}
                />
                {task.description}
              </label>
              <button
                onClick={() => deleteTask(task.id)}
                style={styles.deleteButton}
                title="Delete task"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.noTasksText}>No tasks to show.</p>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 600,
    margin: "20px auto",
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
    flexWrap: "wrap",
    gap: 10,
  },
  input: {
    flexGrow: 1,
    fontSize: 16,
    padding: "10px 14px",
    borderRadius: 6,
    border: "1px solid #ccc",
    outline: "none",
    boxSizing: "border-box",
    minWidth: 200,
  },
  addButton: {
    padding: "10px 18px",
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  addButtonDisabled: {
    padding: "10px 18px",
    fontWeight: "bold",
    fontSize: 16,
    color: "#ccc",
    backgroundColor: "#aaa",
    border: "none",
    borderRadius: 6,
    cursor: "not-allowed",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 15,
    marginBottom: 20,
  },
  filterButton: {
    padding: "8px 16px",
    borderRadius: 20,
    border: "1.5px solid #007bff",
    backgroundColor: "white",
    color: "#007bff",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  },
  activeFilterButton: {
    padding: "8px 16px",
    borderRadius: 20,
    border: "1.5px solid #004085",
    backgroundColor: "#004085",
    color: "white",
    cursor: "default",
    fontWeight: "bold",
  },
  loading: {
    fontSize: 20,
    color: "#007bff",
    textAlign: "center",
  },
  taskList: {
    listStyle: "none",
    padding: 0,
  },
  taskItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 12px",
    borderBottom: "1px solid #ddd",
    fontSize: 18,
  },
  taskText: {
    userSelect: "none",
    cursor: "pointer",
    flexGrow: 1,
  },
  taskCompleted: {
    textDecoration: "line-through",
    color: "#6c757d",
    fontStyle: "italic",
    userSelect: "none",
    cursor: "pointer",
    flexGrow: 1,
  },
  checkbox: {
    marginRight: 12,
    transform: "scale(1.2)",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "5px 14px",
    borderRadius: 6,
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  noTasksText: {
    textAlign: "center",
    fontSize: 18,
    fontStyle: "italic",
    color: "#888",
  },
};

export default App;
