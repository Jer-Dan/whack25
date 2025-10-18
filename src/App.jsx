import React from 'react'
import './App.css'
import DataSection from './Components/DataSection'
import AISection from './Components/AISection'
import PaymentsForm from './Components/PaymentsForm'
import PurchasesForm from './Components/PurchasesForm'
import ThemeToggle from './Components/ThemeToggle'
import ScoreWidget from './Components/ScoreWidget'

const App = () => {
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
                <AISection />
            </div>

            <div id='ScoreWidgetDiv'>
                <ScoreWidget score={85} />
            </div>
            <ThemeToggle />
        </div>
    )
}

export default App