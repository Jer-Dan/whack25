import { React, useState } from 'react'
import './App.css'
import DataSection from './Components/DataSection'
import AISection from './Components/AISection'
import PaymentsForm from './Components/PaymentsForm'
import PurchasesForm from './Components/PurchasesForm'
import ThemeToggle from './Components/ThemeToggle'
import ScoreWidget from './Components/ScoreWidget'

const App = () => {
    let [score, setScore] = useState(null);

    return (
        <div id='AppDiv'>
            <div id='DataSectionDiv'>
                <DataSection />
            </div>
            <div id="PaymentsColumn">
                <div id="PaymentsSectionDiv">
                    <PaymentsForm />
                </div>
                <div id="PurchasesSectionDiv">
                    <PurchasesForm />
                </div>
            </div>

            <div id='AISectionDiv'>
                <AISection setScore={setScore} />
            </div>

            <div id='ScoreWidgetDiv'>
                <ScoreWidget score={score} />
            </div>
            <ThemeToggle />
        </div>
    )
}

export default App
