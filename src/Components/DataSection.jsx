import React from 'react'
import { useState } from 'react'
import MoneyTypeForm from './MoneyTypeForm'
import '../Styles/DataSection.css'
import Dropdown from 'react-bootstrap/Dropdown';
import PersonalForm from './PersonalForm';

function DataSection() {

    const [FormType, setFormType] = useState("")

    return (
        <div>
            <h1 id='DataSectionTitle'>
                Your Data
            </h1>

            <PersonalForm />

            <MoneyTypeForm type={FormType} />
        </div>
    )
}

export default DataSection