import React from 'react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-white/20 bg-white/60 py-4 text-xs text-gray-600 backdrop-blur-md dark:bg-black/60 dark:text-gray-300">
      <div className="container flex flex-col items-center justify-between gap-2 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {t('brand')} · All rights reserved.
        </p>
        <p className="text-[11px] text-gray-500 dark:text-gray-400">
          Built for inclusive volunteering, training & accessibility.
        </p>
      </div>
    </footer>
  );
};
