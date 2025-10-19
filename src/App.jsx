import { React, useEffect, useState } from 'react'
import './App.css'
import DataSection from './Components/DataSection'
import AISection from './Components/AISection'
import PaymentsForm from './Components/PaymentsForm'
import PurchasesForm from './Components/PurchasesForm'
import ThemeToggle from './Components/ThemeToggle'
import ScoreWidget from './Components/ScoreWidget'
import Splash from './Components/Splash'
import ChartWidget from './Components/ChartWidget'
import Onboarding from './Components/Onboarding'

const App = () => {
    let [score, setScore] = useState(null);
    let [showSplash, setShowSplash] = useState(true);
    // set which button is onboarding and not dimmed
    let [isOnboarding, setIsOnboarding] = useState("Default");
    //  -1 = off, 0 = personal, 1 = add card, 2 = add payment, 3 = add purchase, 4 = ai review
    let [onboardingStep, setOnboardingStep] = useState(isOnboarding === 'Default' ? 0 : -1);

    const handleOnboardingComplete = (e) => {
        setIsOnboarding(e);
        if (e === "Complete") {
            localStorage.setItem('onboardingComplete', true);
        }
    }

    useEffect(() => {
        // check onboardingComplete in localStorage
        const onboardingStatus = localStorage.getItem('onboardingComplete');
        if (onboardingStatus) {
            setIsOnboarding("Complete");
        }
    }, []);

    const advanceOnboarding = () => {
        setOnboardingStep(s => {
            const next = s + 1
            if (next > 4) {
                setIsOnboarding('Complete')
                localStorage.setItem('onboardingComplete', 'true')
                return -1
            }
            return next
        })
    }

    // Check if onboarding is complete through localStorage on app load
    useEffect(() => {
        const onboardingStatus = localStorage.getItem('onboardingComplete');
        const isOnboardingComplete = onboardingStatus === 'true';
        if (isOnboardingComplete) {
            setIsOnboarding("Complete");
            setOnboardingStep(-1); // ensure overlay is hidden when already completed
        }
    }, []);

    return (
        <>
            {showSplash ? (
                <Splash onDone={() => setShowSplash(false)} />
            ) : (
                <div id='AppDiv'>
                    {onboardingStep >= 0 && <Onboarding step={onboardingStep} onNext={advanceOnboarding} />}
                    <div id='DataSectionDiv'>
                        <DataSection isOnboarding={isOnboarding} handleOnboardingComplete={handleOnboardingComplete} />
                    </div>
                    <div id="PaymentsColumn">
                        <div id="PaymentsSectionDiv">
                            <PaymentsForm isOnboarding={isOnboarding} handleOnboardingComplete={handleOnboardingComplete} />
                        </div>
                        <div id="PurchasesSectionDiv">
                            <PurchasesForm isOnboarding={isOnboarding} handleOnboardingComplete={handleOnboardingComplete} />
                        </div>
                    </div>

                    <div id='AISectionDiv'>
                        <AISection setScore={setScore} isOnboarding={isOnboarding} handleOnboardingComplete={handleOnboardingComplete} />
                    </div>

                    <div id='ScoreWidgetDiv'>
                        <ScoreWidget score={score} isOnboarding={isOnboarding} handleOnboardingComplete={handleOnboardingComplete} />
                    </div>

                    <div id='ChartWidget'>
                        <ChartWidget/>
                    </div>

                    <ThemeToggle />
                </div>
            )}
        </>
    )
}

export default App
