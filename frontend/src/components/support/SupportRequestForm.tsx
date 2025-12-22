import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { createSupportRequest } from '@/services/podService';
import { SupportRequest } from '@/types/pod';

export const SupportRequestForm: React.FC = () => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSent(false);
    setError(null);
    try {
      await createSupportRequest({ category, description, urgency });
      setSent(true);
      setCategory('');
      setDescription('');
      setUrgency('Medium');
    } catch (err) {
      setError('Failed to send request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel rounded-2xl px-4 py-4 text-xs text-gray-800 dark:text-gray-100"
    >
      <h2 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-50">
        Request support
      </h2>
      <p className="mb-3 text-[11px] text-gray-600 dark:text-gray-300">
        Share a bit about what you need help with. This can be a helper, navigation on
        campus, lecture notes, or exam support.
      </p>

      <div className="space-y-3">
        <Input
          label="Category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Note-taking"
        />
        <div className="space-y-1">
          <label
            htmlFor="description"
            className="text-[11px] font-medium text-gray-700 dark:text-gray-200"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="w-full rounded-xl border border-white/60 bg-white/80 px-3 py-2 text-xs text-gray-800 outline-none focus:border-humanova-olive focus:ring-1 focus:ring-humanova-gold dark:border-humanova-oliveDark dark:bg-black/60 dark:text-gray-100"
            placeholder="Describe the support you need."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="urgency"
            className="text-[11px] font-medium text-gray-700 dark:text-gray-200"
          >
            Urgency
          </label>
          <select
            id="urgency"
            name="urgency"
            value={urgency}
            onChange={(e) => setUrgency(e.target.value as 'Low' | 'Medium' | 'High')}
            className="w-full rounded-xl border border-white/60 bg-white/80 px-3 py-2 text-xs text-gray-800 outline-none focus:border-humanova-olive focus:ring-1 focus:ring-humanova-gold dark:border-humanova-oliveDark dark:bg-black/60 dark:text-gray-100"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <Button
          type="submit"
          className="px-4 py-1.5 text-[11px]"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send request'}
        </Button>
        {sent && (
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
            Request sent successfully.
          </p>
        )}
        {error && (
          <p className="text-[11px] text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    </form>
  );
};
