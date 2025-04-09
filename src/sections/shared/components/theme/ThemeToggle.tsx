import React from 'react'
import {useTheme} from '../../context/ThemeContext.tsx'
import {SunIcon} from "@/sections/shared/components/theme/SunIcon.tsx";
import {MoonIcon} from "@/sections/shared/components/theme/MoonIcon.tsx";

export const ThemeToggle: React.FC = () => {
    const {theme, toggleTheme} = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? (
                <SunIcon/>
            ) : (
                <MoonIcon/>
            )}
        </button>
    )
}
