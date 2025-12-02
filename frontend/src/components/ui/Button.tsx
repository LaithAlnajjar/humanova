import React from 'react';

type ButtonVariant = 'primary' | 'ghost' | 'outline';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /**
   * if true, render the child element directly (e.g. <Link />)
   * but apply the button styles to it.
   */
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
}

const baseClasses =
  'inline-flex items-center justify-center rounded-full text-xs md:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap';

const primaryClasses =
  'bg-emerald-400 text-slate-900 hover:bg-emerald-300 shadow-lg shadow-emerald-500/30 ring-offset-slate-950';

const ghostClasses =
  'bg-transparent text-emerald-200 hover:bg-emerald-500/10 border border-emerald-500/40 ring-offset-slate-950';

const outlineClasses =
  'bg-transparent text-slate-100 hover:bg-slate-900/60 border border-slate-600 ring-offset-slate-950';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  asChild = false,
  className = '',
  children,
  ...rest
}) => {
  let variantClasses: string;

  switch (variant) {
    case 'ghost':
      variantClasses = ghostClasses;
      break;
    case 'outline':
      variantClasses = outlineClasses;
      break;
    case 'primary':
    default:
      variantClasses = primaryClasses;
      break;
  }

  const combined = `${baseClasses} ${variantClasses} ${className}`.trim();

  // asChild: نطبّق ستايلات الزر على عنصر الـ child (مثلاً Link)
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement;

    return React.cloneElement(child, {
      className: [combined, child.props.className].filter(Boolean).join(' '),
      ...rest
    });
  }

  // الحالة العادية: زر <button>
  return (
    <button className={combined} {...rest}>
      {children}
    </button>
  );
};

export default Button;
