import React from 'react';

const Dashboard: React.FC = () => {
  // Sample data; replace with real API data in future
  const projects = [
    { id: 1, name: 'Project Apollo', tasks: 12, completed: 8 },
    { id: 2, name: 'Project Zephyr', tasks: 7, completed: 7 },
    { id: 3, name: 'Project Orion', tasks: 20, completed: 14 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {projects.map(({ id, name, tasks, completed }) => (
          <div
            key={id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold mb-2">{name}</h2>
            <div>
              <p className="text-gray-600">Tasks: {tasks}</p>
              <p className="text-gray-600">Completed: {completed}</p>
              <p className="text-green-600 font-semibold mt-2">
                {((completed / tasks) * 100).toFixed(0)}% Complete
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
