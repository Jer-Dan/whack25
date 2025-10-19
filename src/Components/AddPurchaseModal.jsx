import React from 'react'
import { Modal, Button } from 'react-bootstrap';

function AddPurchaseModal({ show, showHandler, purchaseAddingHandler }) {
    // get all cards stored from local storage earlier
    const storedCards = JSON.parse(localStorage.getItem("cards")) || [];

    const onSubmit = ({ amount, method, date }) => {
        // save purchase data to parent component via handler
        purchaseAddingHandler({
            amount,
            method,
            date,
        });
        showHandler(false);
    }

    return (
        <Modal show={show} onHide={() => showHandler(false)}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Purchase</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Enter the details of the purchase.</p>
                    {/* show a drop down for cards*/}
                    <div className="form-group">
                        <label htmlFor="method">Purchase Method</label>
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

                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <input type="date" id="date" className="form-control" />
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={() => onSubmit({
                        amount: document.getElementById("amount").value,
                        method: document.getElementById("method").value,
                        date: document.getElementById("date").value
                    })}>Add Purchase</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal >
    )
}

export default AddPurchaseModal;
