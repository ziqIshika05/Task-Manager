import React, { useState } from 'react';
import { updateUserProfile } from '../services/api';

const Profile: React.FC = () => {
  const [email] = useState('user@example.com'); // email is readonly here
  const [name, setName] = useState('John Doe');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      setError('Passwords do not match.');
      setMessage('');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      setMessage('');
      await updateUserProfile({ name, password: password || undefined });
      setMessage('Profile updated successfully!');
      setPassword('');
      setConfirmPassword('');
    } catch {
      setError('Failed to update profile.');
      setMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-8">
      <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>

      {message && <div className="mb-4 p-3 bg-green-200 text-green-800 rounded font-medium">{message}</div>}
      {error && <div className="mb-4 p-3 bg-red-200 text-red-800 rounded font-medium">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            disabled
            className="w-full border border-gray-300 p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="name" className="block font-semibold mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block font-semibold mb-1">
            New Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Leave blank to keep current password"
            minLength={6}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block font-semibold mb-1">
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Confirm new password"
            minLength={6}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-indigo-600 text-white py-2 rounded font-semibold ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'
          }`}
        >
          {isSubmitting ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
