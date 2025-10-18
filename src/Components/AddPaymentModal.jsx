import React from 'react'
import { Modal, Button } from 'react-bootstrap';

function AddPaymentModal({ show, showHandler, paymentAddingHandler }) {
    // get all cards stored from local storage earlier
    const storedCards = JSON.parse(localStorage.getItem("cards")) || [];

    const onSubmit = ({ amount, date, method }) => {
        // save payment data to parent component via handler
        paymentAddingHandler({
            amount,
            date,
            method
        });
        showHandler(false);
    }

    return (
        <Modal show={show} onHide={() => showHandler(false)}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Payment</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Enter the details of the payment.</p>
                    {/* show a drop down for cards*/}
                    <div className="form-group">
                        <label htmlFor="method">Payment Method</label>
                        <select id="method" className="form-control">
                            {storedCards.map((card, index) => (
                                <option key={index} value={card.id}>{card.name}</option>
                            ))}
                        </select>
                    </div>

                    <form>
                        <div className="form-group">
                            <label htmlFor="amount">Amount</label>
                            <input type="number" id="amount" className="form-control" />
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={() => onSubmit({
                        amount: document.getElementById("amount").value,
                        method: document.getElementById("method").value
                    })}>Add Payment</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal >
    )
}

export default AddPaymentModal;