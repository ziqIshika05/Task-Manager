import React from "react";
import { TaskItem } from "../types/TaskItem";

interface TaskListProps {
  tasks: TaskItem[];
  toggleCompletion: (task: TaskItem) => void;
  deleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleCompletion, deleteTask }) => {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map(task => (
        <li
          key={task.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 8,
            borderBottom: "1px solid #ccc",
          }}
        >
          <div
            onClick={() => toggleCompletion(task)}
            style={{
              textDecoration: task.isCompleted ? "line-through" : "none",
              cursor: "pointer",
              flex: 1,
              fontSize: 18
            }}
            title="Click to toggle completion"
          >
            {task.description}
          </div>
          <button
            onClick={() => deleteTask(task.id)}
            style={{
              marginLeft: 10,
              color: "red",
              border: "1px solid #b00",
              backgroundColor: "#fff",
              borderRadius: 4,
              padding: "4px 12px",
              cursor: "pointer"
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
