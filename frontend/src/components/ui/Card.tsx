import React from 'react';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
}

export const Card: React.FC<CardProps> = ({ as: Tag = 'div', className, children, ...props }) => {
  return (
    <Tag
      className={clsx(
        'glass-panel rounded-2xl px-4 py-4 sm:px-5 sm:py-5 text-sm',
        'transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};
