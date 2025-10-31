import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import TaskManagement from './pages/TaskManagement';
import Profile from './pages/Profile';
import Header from './components/Header';

import { AuthContext } from './contexts/AuthContext';

const App: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Redirect logged-in users away from login/signup */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/projects" element={isAuthenticated ? <Projects /> : <Navigate to="/" />} />
        <Route path="/projects/:projectId" element={isAuthenticated ? <ProjectDetails /> : <Navigate to="/" />} />
        <Route path="/projects/:projectId/tasks" element={isAuthenticated ? <TaskManagement /> : <Navigate to="/" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
