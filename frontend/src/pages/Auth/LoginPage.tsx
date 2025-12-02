import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { mockLogin } from '@/services/authService';
import { useAuth } from '@/context/AuthContext';
import { LoginPayload } from '@/types/auth';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState<LoginPayload>({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const mutation = useMutation({
    mutationFn: mockLogin,
    onSuccess: (user) => {
      login({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      });
      navigate('/dashboard');
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const next: typeof errors = {};
    if (!form.email) next.email = 'Email is required';
    if (!form.password) next.password = 'Password is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate(form);
  };

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-10">
      <motion.div
        className="glass-panel w-full max-w-md rounded-3xl px-6 py-6 sm:px-8 sm:py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <h1 className="mb-1 text-xl font-semibold text-gray-900 dark:text-gray-50">
          Welcome back to Humanova
        </h1>
        <p className="mb-5 text-xs text-gray-600 dark:text-gray-300">
          Log in to continue exploring opportunities and your dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          {mutation.isError && (
            <p className="text-[11px] text-red-500">
              {(mutation.error as Error).message || 'Login failed. Try again.'}
            </p>
          )}

          <div className="pt-3">
            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? 'Signing in…' : 'Sign in'}
            </Button>
          </div>
        </form>

        <p className="mt-4 text-[11px] text-gray-600 dark:text-gray-300">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            className="font-semibold text-humanova-olive underline-offset-2 hover:underline dark:text-humanova-gold"
            onClick={() => navigate('/auth/register')}
          >
            Create one
          </button>
        </p>
      </motion.div>
    </div>
  );
};
