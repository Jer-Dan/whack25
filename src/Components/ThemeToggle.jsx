import React, { useEffect, useState } from 'react'

function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        try {
            const saved = localStorage.getItem('theme')
            return saved || 'light'
        } catch (e) {
            return 'light'
        }
    })

    useEffect(() => {
        document.documentElement.classList.remove('theme-light', 'theme-dark')
        document.documentElement.classList.add(`theme-${theme}`)
        try { localStorage.setItem('theme', theme) } catch (e) {}
    }, [theme])

    const toggle = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))

    return (
        <button
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            onClick={toggle}
            id="ThemeToggleButton"
        >
            {theme === 'light' ? '🌞' : '🌙'}
        </button>
    )
}

export default ThemeToggle
