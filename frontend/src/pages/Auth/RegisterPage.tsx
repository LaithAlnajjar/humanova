import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Stepper } from '@/components/ui/Stepper';
import { mockRegister } from '@/services/authService';
import { RegisterPayload, UserRole } from '@/types/auth';

const STEPS = ['Account', 'Role', 'Details'];

const ROLE_OPTIONS: { id: UserRole; label: string }[] = [
  { id: 'student', label: 'Student' },
  { id: 'volunteer', label: 'Volunteer' },
  { id: 'charity', label: 'Charity / NGO' },
  { id: 'company', label: 'Company' },
  { id: 'university', label: 'University' },
  { id: 'disabled_student', label: 'Student with disability' }
];

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [payload, setPayload] = useState<RegisterPayload>({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: mockRegister,
    onSuccess: () => {
      navigate('/auth/login');
    }
  });

  const setField = (field: keyof RegisterPayload, value: string) => {
    setPayload((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    const next: Record<string, string> = {};
    if (step === 0) {
      if (!payload.name) next.name = 'Name is required';
      if (!payload.email) next.email = 'Email is required';
      if (!payload.password) next.password = 'Password is required';
    } else if (step === 2) {
      if (payload.role === 'charity' || payload.role === 'company') {
        if (!payload.organizationName) {
          next.organizationName = 'Organization name is required';
        }
      }
      if (payload.role === 'university' && !payload.universityName) {
        next.universityName = 'University name is required';
      }
      if (payload.role === 'disabled_student' && !payload.accessibilityNotes) {
        next.accessibilityNotes = 'Please describe your accessibility needs';
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    mutation.mutate(payload);
  };

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-10">
      <motion.div
        className="glass-panel w-full max-w-xl rounded-3xl px-6 py-6 sm:px-8 sm:py-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <h1 className="mb-1 text-xl font-semibold text-gray-900 dark:text-gray-50">
          Join the Humanova ecosystem
        </h1>
        <p className="mb-4 text-xs text-gray-600 dark:text-gray-300">
          Create a role-aware account so we can tailor your dashboard and experience.
        </p>

        <div className="mb-5">
          <Stepper steps={STEPS} activeIndex={step} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step-account"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                <Input
                  label="Full name"
                  name="name"
                  value={payload.name}
                  onChange={(e) => setField('name', e.target.value)}
                  error={errors.name}
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={payload.email}
                  onChange={(e) => setField('email', e.target.value)}
                  error={errors.email}
                />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={payload.password}
                  onChange={(e) => setField('password', e.target.value)}
                  error={errors.password}
                />
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-role"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="grid gap-3 sm:grid-cols-2"
              >
                {ROLE_OPTIONS.map((role) => {
                  const active = payload.role === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setField('role', role.id)}
                      className={`rounded-2xl border px-3 py-3 text-left text-xs transition ${
                        active
                          ? 'border-humanova-olive bg-humanova-cream/70 shadow-md dark:border-humanova-gold dark:bg-humanova-oliveDark/70'
                          : 'border-gray-300 bg-white/70 hover:border-humanova-olive/70 dark:border-gray-600 dark:bg-black/40 dark:hover:border-humanova-gold/60'
                      }`}
                    >
                      <div className="font-semibold text-gray-900 dark:text-gray-50">
                        {role.label}
                      </div>
                      <div className="mt-1 text-[11px] text-gray-600 dark:text-gray-300">
                        Tailored dashboard and experience.
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                {(payload.role === 'charity' || payload.role === 'company') && (
                  <Input
                    label="Organization name"
                    name="organizationName"
                    value={payload.organizationName ?? ''}
                    onChange={(e) => setField('organizationName', e.target.value)}
                    error={errors.organizationName}
                  />
                )}

                {payload.role === 'university' && (
                  <Input
                    label="University name"
                    name="universityName"
                    value={payload.universityName ?? ''}
                    onChange={(e) => setField('universityName', e.target.value)}
                    error={errors.universityName}
                  />
                )}

                {payload.role === 'disabled_student' && (
                  <Input
                    label="Accessibility notes"
                    name="accessibilityNotes"
                    placeholder="Briefly describe the support you may need on campus."
                    value={payload.accessibilityNotes ?? ''}
                    onChange={(e) => setField('accessibilityNotes', e.target.value)}
                    error={errors.accessibilityNotes}
                  />
                )}

                {payload.role === 'student' || payload.role === 'volunteer' ? (
                  <p className="text-[11px] text-gray-600 dark:text-gray-300">
                    You can always update your profile later with more details about your skills and
                    interests.
                  </p>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>

          {mutation.isError && (
            <p className="text-[11px] text-red-500">
              {(mutation.error as Error).message || 'Registration failed. Try again.'}
            </p>
          )}

          <div className="flex items-center justify-between pt-3">
            <Button
              type="button"
              variant="ghost"
              className="px-3 py-1.5"
              onClick={step === 0 ? () => navigate('/auth/login') : prevStep}
            >
              {step === 0 ? 'Back to login' : 'Back'}
            </Button>

            {step < STEPS.length - 1 ? (
              <Button type="button" className="px-4 py-1.5" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="px-4 py-1.5"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? 'Creating account…' : 'Create account'}
              </Button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};
