import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5228/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const data = await response.json();
      // Assuming backend returns { token: "jwt_token_here" }

      login(data.token); // Save JWT token in AuthContext and localStorage

      navigate('/dashboard'); // Redirect to dashboard page after login
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 via-indigo-900 to-black p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-lg rounded-lg p-10 max-w-md w-full space-y-6"
        aria-label="Login form"
      >
        <h2 className="text-4xl font-extrabold text-indigo-400 text-center mb-8">
          Welcome Back!
        </h2>

        {error && (
          <div className="bg-red-600 text-white p-3 rounded mb-4 text-center font-semibold" role="alert">
            {error}
          </div>
        )}

        <label htmlFor="email" className="block mb-2 text-indigo-300 font-semibold">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-4 py-3 rounded-md bg-gray-800 border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-indigo-100 placeholder-indigo-500"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-invalid={!!error}
        />

        <label htmlFor="password" className="block mb-2 text-indigo-300 font-semibold">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full px-4 py-3 rounded-md bg-gray-800 border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-indigo-100 placeholder-indigo-500"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-invalid={!!error}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-bold py-3 rounded-md shadow-md hover:shadow-indigo-500/60"
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>

        <p className="text-center text-indigo-400 mt-4 text-sm">
          New here?{' '}
          <a href="/signup" className="text-indigo-500 hover:text-indigo-300 font-semibold">
            Create an account
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
