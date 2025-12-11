import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="container py-10 text-center">
        <p>Please log in to see profile information.</p>
        <Link to="/login" className="text-humanova-blue hover:underline">
          Go to Login
        </Link>
      </div>
    );
  }

  // Generic profile page for any logged-in user.
  // Specific views are now handled within the dashboard layouts.
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <p>Your role is: <strong>{user.role}</strong>.</p>
      <p className="mt-4">
        You can manage your detailed profile in your dashboard.
      </p>
      <Link
        to={`/dashboard/${user.role}`}
        className="mt-4 inline-block text-humanova-blue hover:underline"
      >
        Go to my Dashboard
      </Link>
    </div>
  );
};
