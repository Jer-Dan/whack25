import React from 'react'
import './App.css'
import DataSection from './Components/DataSection'
import AISection from './Components/AISection'
import PaymentsForm from './Components/PaymentsForm'

const App = () => {
    return (
        <div id='AppDiv'>
            <div id='DataSectionDiv'>
                <DataSection />
            </div>

            <div id="PaymentsSectionDiv">
                <PaymentsForm />
            </div>

            <div id='AISectionDiv'>
                <AISection />
            </div>
        </div>
    )
}

export default App