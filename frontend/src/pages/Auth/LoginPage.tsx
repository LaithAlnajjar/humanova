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
  const { login } = useAuth(); // Use the REAL auth context

  const [form, setForm] = useState<LoginPayload>({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 1. Perform Real Login
      await login(form);

      // 2. Check stored user to determine redirection
      const stored = localStorage.getItem("humanova_user");
      const user = stored ? JSON.parse(stored) : null;

      if (!user) throw new Error("Login failed");

      // 3. Redirect to your EXISTING Mock Dashboards based on Enum
      switch (user.role) {
        case UserRole.Student:
          navigate("/dashboard/student");
          break;
        case UserRole.Company:
          navigate("/dashboard/company");
          break;
        case UserRole.Volunteer:
          navigate("/dashboard/volunteer");
          break;
        case UserRole.Charity:
          navigate("/dashboard/charity");
          break;
        case UserRole.University:
          navigate("/dashboard/university");
          break;
        default:
          navigate("/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      setError("Invalid email or password");
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
      >
        <h1 className="mb-1 text-xl font-semibold text-gray-900 dark:text-gray-50">
          Welcome back
        </h1>
        <p className="mb-5 text-xs text-gray-600 dark:text-gray-300">
          Log in to continue exploring opportunities.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {error && <p className="text-xs text-red-500 text-center">{error}</p>}

          <div className="pt-3">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in…" : "Sign in"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
