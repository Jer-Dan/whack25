import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function ExpandedPaymentModal({ show, showHandler }) {
  // get all payment details from local storage
  const storedPayments = JSON.parse(localStorage.getItem('payments')) || []

  return (
//   Full screen modal    
    <div>
      <Modal show={show} onHide={() => showHandler(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {storedPayments.length > 0 ? (
                <ul>
                    {storedPayments.map((payment, index) => (
                        <li key={index}>
                            £{payment.amount} - {payment.method}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No payment records found.</p>
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

export default ExpandedPaymentModal
