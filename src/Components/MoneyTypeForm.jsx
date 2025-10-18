import React from 'react'
import IncomeForm from './IncomeForm'
import DebitForm from './DebitForm'
import CreditForm from './CreditForm'


function MoneyTypeForm({ type }) {
    return (
        <div>
                    {type === 'Income' && <IncomeForm /> }
                    {type === 'Expenditure/Debit' && <DebitForm />}
                    {type === 'Credit' && <CreditForm />}
        </div>
    )
}

export default MoneyTypeForm