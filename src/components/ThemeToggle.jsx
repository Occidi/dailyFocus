import { useTheme } from '../context';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    const Icon = theme === 'dark' ? Sun : Moon;
    const iconClass = theme === 'dark' ? 'text-yellow-300' : 'text-gray-800';

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-md border bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
            aria-label="Toggle theme"
            title="Toggle theme"
        >
            <Icon size={20} className={iconClass} />
        </button>
    );
}
