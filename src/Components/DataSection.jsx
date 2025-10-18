import React from 'react'
import { useState } from 'react'
import MoneyTypeForm from './MoneyTypeForm'
import '../Styles/DataSection.css'
import Dropdown from 'react-bootstrap/Dropdown';
import PersonalForm from './PersonalForm';

function calcBalance() {
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  let month = new Date().getMonth();
  let day = new Date().getDay();

  let lastDay = localStorage.getItem('lastDay') || 0;
  let monthBalance = localStorage.getItem('monthBalance') || 0;
  let monthCardInfo = JSON.parse(localStorage.getItem('monthCardInfo')) || {};
  let paymentsInMonth = localStorage.getItem('paymentsInMonth') || 0;
  let pastMonthData = JSON.parse(localStorage.getItem('pastMonthData')) || [];
}

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
