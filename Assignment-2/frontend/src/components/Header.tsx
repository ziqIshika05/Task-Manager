import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-indigo-700 text-white p-4 flex justify-between items-center shadow-md">
      <div className="font-bold text-xl">Task Manager</div>
      <nav className="space-x-4">
        {!isAuthenticated ? (
          <>
            <Link to="/" className={location.pathname === '/' ? 'font-bold' : ''}>Login</Link>
            <Link to="/signup" className={location.pathname === '/signup' ? 'font-bold' : ''}>Signup</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'font-bold' : ''}>Dashboard</Link>
            <Link to="/projects" className={location.pathname.startsWith('/projects') ? 'font-bold' : ''}>Projects</Link>
            <Link to="/profile" className={location.pathname === '/profile' ? 'font-bold' : ''}>Profile</Link>
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
