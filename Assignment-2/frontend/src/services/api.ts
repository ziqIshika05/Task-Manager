const API_BASE = "http://localhost:5228/api";

interface Task {
  title: string;
  estimatedHours: number;
  dueDate: string;
  dependencies: string[];
}

export const updateUserProfile = async (data: { name: string; password?: string }) => {
  const token = localStorage.getItem('token') ?? '';
  const response = await fetch(`${API_BASE}/user/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update profile');
  }
  return response.json();
};

export const fetchProjectTasks = async (projectId: number) => {
  const token = localStorage.getItem('token') ?? '';
  const response = await fetch(`${API_BASE}/projects/${projectId}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json(); // Expected array of tasks
};

export const createTask = async (projectId: number, taskData: { title: string; dueDate?: string }) => {
  const token = localStorage.getItem('token') ?? '';
  const response = await fetch(`${API_BASE}/projects/${projectId}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  return response.json(); // Created task
};

export const updateTask = async (
  projectId: number,
  taskId: number,
  taskData: { title?: string; dueDate?: string; isCompleted?: boolean }
) => {
  const token = localStorage.getItem('token') ?? '';
  const response = await fetch(`${API_BASE}/projects/${projectId}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return response.json();
};

export const deleteTask = async (projectId: number, taskId: number) => {
  const token = localStorage.getItem('token') ?? '';
  const response = await fetch(`${API_BASE}/projects/${projectId}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
  return true;
};

export const fetchSmartSchedule = async (projectId: number, tasks: Task[]) => {
  const token = localStorage.getItem('token') ?? '';
  const response = await fetch(`http://localhost:5228/api/v1/projects/${projectId}/schedule`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ tasks }),
  });
  if (!response.ok) throw new Error('Failed to get schedule');
  return response.json();
};

export const fetchUserProjects = async () => {
  const token = localStorage.getItem('token') ?? '';
  const response = await fetch(`${API_BASE}/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json(); // Expected array of projects
};

export const createProject = async (projectData: { title: string; description?: string }) => {
  const token = localStorage.getItem('token') ?? '';
  const response = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    throw new Error('Failed to create project');
  }
  return response.json(); // Created project
};

export const updateProject = async (projectId: number, projectData: { title?: string; description?: string; status?: string }) => {
  const token = localStorage.getItem('token') ?? '';
  const response = await fetch(`${API_BASE}/projects/${projectId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    throw new Error('Failed to update project');
  }
  return response.json();
};

export const deleteProject = async (projectId: number) => {
  const token = localStorage.getItem('token') ?? '';
  const response = await fetch(`${API_BASE}/projects/${projectId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete project');
  }
  return true;
};
