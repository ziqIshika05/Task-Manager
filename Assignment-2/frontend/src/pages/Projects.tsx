import React, { useState, useEffect } from 'react';
import { fetchUserProjects } from '../services/api';
import { Link } from 'react-router-dom';

interface Project {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
}

const mockProject: Project = {
  id: 0,
  name: 'Mock Project',
  description: 'This is a mock project for demonstration.',
  status: 'active',
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([mockProject]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await fetchUserProjects();
        // Append fetched projects after mock
        setProjects([mockProject, ...projectsData]);
      } catch {
        setError('Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="max-w-4xl mx-auto p-4 text-center text-red-600 font-semibold">{error}</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Your Projects</h1>
      <ul>
        {projects.map(({ id, name, description, status }) => (
          <li key={id} className="bg-white rounded p-4 mb-3 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-bold">
              <Link to={`/projects/${id}`} className="hover:underline text-indigo-600">
                {name}
              </Link>
            </h2>
            <p className="text-gray-600">{description}</p>
            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                status === 'active'
                  ? 'bg-green-200 text-green-800'
                  : status === 'completed'
                  ? 'bg-gray-300 text-gray-800'
                  : 'bg-yellow-200 text-yellow-800'
              }`}
            >
              {status.toUpperCase()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
