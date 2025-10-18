import React from 'react'

function IncomeForm() {
  return (
    <div>
        <h2>Income Form</h2>
        <form>
            <div>
                <label htmlFor="amount">Amount:</label>
                <input type="number" id="amount" name="amount" required />
            </div>
            <div>
                <label htmlFor="source">Source:</label>
                <input type="text" id="source" name="source" required />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default IncomeForm