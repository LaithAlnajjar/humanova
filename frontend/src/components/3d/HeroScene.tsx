import React from 'react';

/**
 * Temporary placeholder for the 3D hero scene.
 * This version لا تستخدم three.js أو @react-three/fiber
 * عشان نحل مشكلة الـ runtime error أولاً.
 */
export const HeroScene: React.FC = () => {
  return (
    <div className="w-full h-[260px] md:h-[320px] rounded-3xl glass-panel flex items-center justify-center">
      <div className="text-center text-xs text-gray-700 dark:text-gray-200">
        <p className="font-semibold mb-1">Humanova 3D hero placeholder</p>
        <p className="text-[11px] opacity-80">
          three.js will be wired later بعد ما نصفّي موضوع النسخ.
        </p>
      </div>
    </div>
  );
};
