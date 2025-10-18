import React from 'react'
import MoneyTypeForm from './MoneyTypeForm'
import '../Styles/DataSection.css'

function DataSection() {
  return (
    <div>
        <h1 id='DataSectionTitle'>
            Your Data
        </h1>
        
        <MoneyTypeForm/>
    </div>
  )
}

export default DataSection