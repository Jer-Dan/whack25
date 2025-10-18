import React, { useEffect } from 'react'

function Splash({ onDone, duration = 2500 }) {
    useEffect(() => {
        const t = setTimeout(() => onDone && onDone(), duration)
        return () => clearTimeout(t)
    }, [onDone, duration])

    return (
        <div id="AppSplash" role="status" aria-live="polite">
            <div className="splash-center">
                <div className="splash-icon" aria-hidden="true">✨</div>
                <div className="splash-text">CredEasy</div>
            </div>
        </div>
    )
}

export default Splash
