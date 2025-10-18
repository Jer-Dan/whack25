import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function ExpandedPurchaseModal({ show, showHandler }) {
    const storedPurchases = JSON.parse(localStorage.getItem('purchases')) || []

    return (
        <div>

            <Modal show={show} onHide={() => showHandler(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Purchase Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {storedPurchases.length > 0 ? (
                        <ul>
                            {storedPurchases.map((p, i) => (
                                <li key={i}>{p.amount} - {p.method}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No purchase records found.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => showHandler(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ExpandedPurchaseModal
