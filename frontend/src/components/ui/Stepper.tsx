import React from "react";
import clsx from "clsx";

interface StepperProps {
  steps: string[];
  activeIndex: number;
}

export const Stepper: React.FC<StepperProps> = ({ steps, activeIndex }) => {
  return (
    <div className="flex items-center justify-center gap-2 text-xs">
      {steps.map((label, index) => {
        const isActive = index === activeIndex;
        const isCompleted = index < activeIndex;

        return (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={clsx(
                  "flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold",
                  isCompleted &&
                    "border-humanova-olive bg-humanova-olive text-white dark:border-humanova-gold dark:bg-humanova-gold dark:text-black",
                  isActive &&
                    !isCompleted &&
                    "border-humanova-olive bg-white text-humanova-olive dark:border-humanova-gold dark:bg-black dark:text-humanova-gold",
                  !isActive &&
                    !isCompleted &&
                    "border-gray-300 bg-white text-gray-500 dark:border-gray-600 dark:bg-black dark:text-gray-400"
                )}
              >
                {index + 1}
              </div>
              <span className="text-[10px] text-gray-600 dark:text-gray-300">
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="mx-1 h-px flex-1 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600" />
            )}
          </div>
        );
      })}
    </div>
  );
};
