import React from 'react'
import { useState } from 'react'
import MoneyTypeForm from './MoneyTypeForm'
import '../Styles/DataSection.css'
import Dropdown from 'react-bootstrap/Dropdown';

function DataSection() {

    const [FormType, setFormType] = useState("")

    return (
        <div>
            <h1 id='DataSectionTitle'>
                Your Data
            </h1>

            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    {FormType === "" ? "Select Money Type" : FormType}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setFormType('Income')}>Income</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFormType('Expenditure/Debit')}>Expenditure/Debit</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFormType('Credit')}>Credit</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <MoneyTypeForm type={FormType} />
        </div>
    )
}

export default DataSection