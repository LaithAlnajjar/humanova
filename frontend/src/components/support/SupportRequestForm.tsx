import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface SupportRequestFormValues {
  course: string;
  campusArea: string;
  typeOfSupport: string;
  preferredTime: string;
}

interface Props {
  onSubmitMock?: (values: SupportRequestFormValues) => void;
}

export const SupportRequestForm: React.FC<Props> = ({ onSubmitMock }) => {
  const [values, setValues] = useState<SupportRequestFormValues>({
    course: '',
    campusArea: '',
    typeOfSupport: '',
    preferredTime: ''
  });
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'note') {
      setNote(value);
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    onSubmitMock?.(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel rounded-2xl px-4 py-4 text-xs text-gray-800 dark:text-gray-100"
    >
      <h2 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-50">
        Request support on campus
      </h2>
      <p className="mb-3 text-[11px] text-gray-600 dark:text-gray-300">
        Share a bit about where and how you would like help. This can be a helper, navigation on
        campus, lecture notes, or exam support.
      </p>

      <div className="space-y-3">
        <Input
          label="Course or activity"
          name="course"
          value={values.course}
          onChange={handleChange}
          placeholder="e.g. Data Structures lecture"
        />
        <Input
          label="Campus area"
          name="campusArea"
          value={values.campusArea}
          onChange={handleChange}
          placeholder="e.g. Building A, 3rd floor"
        />
        <Input
          label="Type of support"
          name="typeOfSupport"
          value={values.typeOfSupport}
          onChange={handleChange}
          placeholder="Mobility, note taking, communication..."
        />
        <Input
          label="Preferred time"
          name="preferredTime"
          value={values.preferredTime}
          onChange={handleChange}
          placeholder="e.g. Sunday 10–12"
        />
        <div className="space-y-1">
          <label
            htmlFor="note"
            className="text-[11px] font-medium text-gray-700 dark:text-gray-200"
          >
            Extra notes (optional)
          </label>
          <textarea
            id="note"
            name="note"
            rows={3}
            className="w-full rounded-xl border border-white/60 bg-white/80 px-3 py-2 text-xs text-gray-800 outline-none focus:border-humanova-olive focus:ring-1 focus:ring-humanova-gold dark:border-humanova-oliveDark dark:bg-black/60 dark:text-gray-100"
            placeholder="Anything else that would help us match the right helper to you."
            value={note}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <Button
          type="submit"
          className="px-4 py-1.5 text-[11px]"
        >
          Send request (mock)
        </Button>
        {sent && (
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
            Request recorded (mock).
          </p>
        )}
      </div>
    </form>
  );
};
