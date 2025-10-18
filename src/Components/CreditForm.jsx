import React from 'react'

function CreditForm() {
  return (
    <div>
        <h2>Credit Form</h2>
        <form>
            <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input type="number" id="amount" className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input type="text" id="description" className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default CreditForm