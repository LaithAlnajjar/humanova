import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { LoginPayload } from "@/types/auth";
import { UserRole } from "@/types/enums";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState<LoginPayload>({ email: "", password: "" });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    global?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear errors when user types
    if (errors[e.target.name as keyof typeof errors] || errors.global) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: undefined,
        global: undefined,
      }));
    }
  };

  const validate = () => {
    const next: typeof errors = {};
    if (!form.email) next.email = "Email is required";
    if (!form.password) next.password = "Password is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
      // 1. Call Real Backend Login
      await login(form);

      // 2. Retrieve the user to check role (stored in localStorage by AuthContext)
      // Note: We parse it fresh to ensure we have the latest backend response
      const storedUser = localStorage.getItem("humanova_user");
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (!user) {
        throw new Error("Session creation failed");
      }

      // 3. Navigate based on Integer Role (Enum)
      switch (user.role) {
        case UserRole.Student:
          navigate("/dashboard/student");
          break;
        case UserRole.Volunteer:
          navigate("/dashboard/volunteer");
          break;
        case UserRole.Charity:
          navigate("/dashboard/charity");
          break;
        case UserRole.Company:
          navigate("/dashboard/company");
          break;
        case UserRole.University:
          navigate("/dashboard/university");
          break;
        case UserRole.DisabledStudent:
          navigate("/dashboard/disabled-student");
          break;
        default:
          navigate("/dashboard"); // Fallback
          break;
      }
    } catch (error: any) {
      console.error("Login Failed:", error);
      setErrors((prev) => ({
        ...prev,
        global: error.message || "Invalid email or password.",
      }));
    } finally {
      setIsLoading(false);
    }
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

          {errors.global && (
            <p className="text-[11px] text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg text-center">
              {errors.global}
            </p>
          )}

          <div className="pt-3">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in…" : "Sign in"}
            </Button>
          </div>
        </form>

        <p className="mt-4 text-[11px] text-gray-600 dark:text-gray-300">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className="font-semibold text-humanova-olive underline-offset-2 hover:underline dark:text-humanova-gold"
            onClick={() => navigate("/auth/register")}
          >
            Create one
          </button>
        </p>
      </motion.div>
    </div>
  );
};
