import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProjectTasks } from '../services/api';


interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
}

interface ProjectDetailsType {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
}

interface Project {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
}

const mockProjectDetails: ProjectDetailsType = {
  id: 0,
  name: "Mock Project",
  description: "This is a mock project description.",
  tasks: [
    { id: 1, title: "Mock Task 1", completed: false, dueDate: "2024-01-01" },
    { id: 2, title: "Mock Task 2", completed: true, dueDate: "2024-02-01" },
  ],
};


const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<ProjectDetailsType>(mockProjectDetails);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProjectDetails = async () => {
      try {
        setLoading(true);
        if (projectId === '0') {
          setProject(mockProjectDetails);
        } else {
          const tasks = await fetchProjectTasks(Number(projectId));
          setProject({ ...mockProjectDetails, id: Number(projectId), tasks });
        }
      } catch {
        setError('Failed to fetch project details.');
      } finally {
        setLoading(false);
      }
    };

    if (projectId) loadProjectDetails();
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-4xl mx-auto text-red-600 font-semibold text-center">{error}</div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
      <p className="mb-6 text-gray-700">{project.description}</p>

      <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
      <ul>
        {project.tasks.map(({ id, title, completed, dueDate }) => (
          <li
            key={id}
            className={`p-3 mb-3 rounded border flex justify-between items-center ${
              completed ? 'bg-green-100 border-green-400' : 'bg-red-50 border-red-300'
            }`}
          >
            <span className={`font-semibold ${completed ? 'line-through text-green-700' : 'text-red-700'}`}>
              {title}
            </span>
            <span className="text-sm italic text-gray-500">Due: {dueDate}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetails;
