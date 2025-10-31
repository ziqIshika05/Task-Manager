import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center my-4">
    <svg className="animate-spin h-8 w-8 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  </div>
);

const Signup: React.FC = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1500)); // simulate API call
      alert('Account created successfully!');
      navigate('/');
    } catch {
      setError('Signup failed. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-900 via-teal-900 to-gray-900 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg rounded-lg p-10 max-w-md w-full space-y-6"
      >
        <h2 className="text-4xl font-extrabold text-teal-300 text-center mb-8">Create Account</h2>
        {error && (
          <div
            role="alert"
            className="bg-red-600 text-white p-3 rounded mb-4 text-center font-semibold"
          >
            {error}
          </div>
        )}
        <label htmlFor="email" className="block mb-2 text-teal-300 font-semibold">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-gray-800 border border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 text-teal-100 placeholder-teal-500"
        />
        <label htmlFor="password" className="block mb-2 text-teal-300 font-semibold">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-gray-800 border border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 text-teal-100 placeholder-teal-500"
        />
        <label htmlFor="confirmPassword" className="block mb-2 text-teal-300 font-semibold">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-gray-800 border border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 text-teal-100 placeholder-teal-500"
        />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 transition-colors text-white font-bold py-3 rounded-md shadow-md hover:shadow-teal-500/60"
            disabled={isLoading}
          >
            Sign Up
          </button>
        )}
        <p className="text-center text-teal-400 mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/" className="text-teal-500 hover:text-teal-300 font-semibold">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
