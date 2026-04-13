import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/10 dark:border-white/5"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <Sun size={20} className="text-amber-400" />
      ) : (
        <Moon size={20} className="text-blue-600" />
      )}
    </button>
  );
};

export default ThemeToggle;
