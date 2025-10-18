import React from 'react'
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import AddPaymentModal from './AddPaymentModal';
import { Accordion } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useEffect } from 'react';

function PaymentsForm() {
    const [payments, setPayments] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // When clicking Add Payment button, show the modal
    const addPayment = () => {
        setShowModal(true);
    }
    const setShowModalhandler = (value) => {
        setShowModal(value);
    }
    const handlePaymentAdding = (payment) => {
        setPayments(prev => {
            const updated = [...prev, payment];
            localStorage.setItem("payments", JSON.stringify(updated));
            console.log('saved payments', updated);
            return updated;
        });
    }
    // read from local storage on component mount
    useEffect(() => {
        const storedPayments = JSON.parse(localStorage.getItem("payments"));
        if (storedPayments) {
            setPayments(storedPayments);
        }
    }, []);


    return (
        <div>
            <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Paying off your credit (debt)</Tooltip>}
            >
                <h1>Payments Form</h1>
            </OverlayTrigger>

            <Button variant="primary" onClick={addPayment}>
                Add Payment
            </Button>

            <AddPaymentModal show={showModal} showHandler={setShowModalhandler} paymentAddingHandler={handlePaymentAdding} />

            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Payments</Accordion.Header>
                        <Accordion.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Amount</th>
                                        <th>Card</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map((payment, index) => (
                                        <tr key={index}>
                                            <td>{payment.amount}</td>
                                            <td>{payment.method}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>
                </Card>
            </Accordion>

        </div>
    )
}

export default PaymentsForm