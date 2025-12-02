import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  const id = props.id ?? props.name ?? undefined;

  return (
    <div className="space-y-1 text-left">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={clsx(
          'w-full rounded-xl border bg-white/70 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-humanova-olive focus:ring-1 focus:ring-humanova-gold dark:border-humanova-oliveDark dark:bg-black/40 dark:text-gray-50',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-[11px] text-red-500">{error}</p>}
    </div>
  );
};
