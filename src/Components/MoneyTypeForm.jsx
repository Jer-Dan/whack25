import React from 'react'
import IncomeForm from './IncomeForm'


function MoneyTypeForm({ type }) {
    return (
        <div>
            {type === 'Income' && <IncomeForm />}
        </div>
    )
}

export default MoneyTypeForm