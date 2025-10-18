import React from 'react'
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

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
                            <label htmlFor="name">Card Name</label>
                            <input type="text" id="name" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Card Company</label>
                            <input type="text" id="description" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="maxCredit">Max Credit</label>
                            <input type="number" id="maxCredit" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="currentBalance">Current Balance</label>
                            <input type="number" id="currentBalance" className="form-control" />
                        </div>
                        <div className="form-group">
                            {/* 31 days scroller */}
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip>the day your statement balance is due each month</Tooltip>}
                            >
                                <label htmlFor="statementBalanceDay">Statement Balance Day</label>
                            </OverlayTrigger>

                            <input type="number" id="statementBalanceDay" className="form-control" />

                        </div>
                        <div className="form-group">
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip>the day your payment is due each month</Tooltip>}
                            >
                                <label htmlFor="dueDate">Due Date</label>
                            </OverlayTrigger>
                            <input type="number" id="dueDate" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="minFeePayment">Minimum Fee Payment (note)</label>
                            <input type="number" id="minFeePayment" className="form-control" />
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={() => onSubmit({ name: document.getElementById("name").value, company: document.getElementById("description").value, maxCredit: document.getElementById("maxCredit").value, currentBalance: document.getElementById("currentBalance").value, statementBalanceDay: document.getElementById("statementBalanceDay").value, dueDate: document.getElementById("dueDate").value, minFeePayment: document.getElementById("minFeePayment").value })}>Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal >
    )
}

export default AddCardModal
