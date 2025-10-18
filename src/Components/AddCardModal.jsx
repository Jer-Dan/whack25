import React from 'react'
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

function AddCardModal({ show, showHandler, cardAddingHandler, editedCard }) {
    const onSubmit = ({ name, company, maxCredit, currentBalance, statementBalanceDay, dueDate, minFeePayment }) => {
        // save card data to parent component via handler
        cardAddingHandler({
            name,
            company,
            maxCredit,
            currentBalance,
            statementBalanceDay,
            dueDate,
            minFeePayment
        });
        showHandler(false);
    }

    return (
        <Modal show={show} onHide={() => showHandler(false)}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Card</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Enter the details of the card.</p>
                    <form>
                        <div className="form-group">
                            <label htmlFor="amount">Card Name</label>
                            <input type="text" id="amount" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Card Company</label>
                            <input type="text" id="description" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Max Credit</label>
                            <input type="number" id="amount" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Current Balance</label>
                            <input type="number" id="amount" className="form-control" />
                        </div>
                        <div className="form-group">
                            {/* 31 days scroller */}
                            <label htmlFor="statementBalanceDay">Statement Balance Day</label>
                            <input type="number" id="statementBalanceDay" className="form-control" />

                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Due Date</label>
                            <input type="number" id="amount" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Minimum Fee Payment (note)</label>
                            <input type="number" id="amount" className="form-control" />
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={() => onSubmit({ name: document.getElementById("amount").value, company: document.getElementById("description").value, maxCredit: document.getElementById("amount").value, currentBalance: document.getElementById("amount").value, statementBalanceDay: document.getElementById("statementBalanceDay").value, dueDate: document.getElementById("amount").value, minFeePayment: document.getElementById("amount").value })}>Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal >
    )
}

export default AddCardModal