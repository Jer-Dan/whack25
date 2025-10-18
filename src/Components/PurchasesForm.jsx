import React from 'react'
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import AddPurchaseModal from './AddPurchaseModal';
import { Accordion } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useEffect } from 'react';

function PurchasesForm() {
    const [purchases, setPurchases] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // When clicking Add Purchase button, show the modal
    const addPurchase = () => {
        setShowModal(true);
    }
    const setShowModalhandler = (value) => {
        setShowModal(value);
    }
    const handlePurchaseAdding = (purchase) => {
        setPurchases(prev => {
            const updated = [...prev, purchase];
            localStorage.setItem("purchases", JSON.stringify(updated));
            console.log('saved purchases', updated);
            return updated;
        });
    }
    // read from local storage on component mount
    useEffect(() => {
        const storedPurchases = JSON.parse(localStorage.getItem("purchases"));
        if (storedPurchases) {
            setPurchases(storedPurchases);
        }
    }, []);


    return (
        <div>
            <h1>Purchases Form</h1>

            <Button variant="primary" onClick={addPurchase}>
                Add Purchase
            </Button>

            <AddPurchaseModal show={showModal} showHandler={setShowModalhandler} purchaseAddingHandler={handlePurchaseAdding} />

            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Purchases</Accordion.Header>
                        <Accordion.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Amount</th>
                                        <th>Card</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchases.map((purchase, index) => (
                                        <tr key={index}>
                                            <td>{purchase.amount}</td>
                                            <td>{purchase.method}</td>
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

export default PurchasesForm