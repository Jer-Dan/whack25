import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import AddPurchaseModal from './AddPurchaseModal';
import ExpandedPurchaseModal from './ExpandedPurchaseModal';
import { Accordion } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useEffect } from 'react';

function PurchasesForm() {
    const [purchases, setPurchases] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showExpanded, setShowExpanded] = useState(false);

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
        <div id="PurchasesFormSpotlight">
            <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Record of your purchases made using credit cards</Tooltip>}
            >
                <h1>Purchases Form</h1>
            </OverlayTrigger>

            <Button variant="primary" onClick={addPurchase}>
                Add Purchase
            </Button>

                {/* Aligned to the right */}
            <Button variant="secondary" style={{ float: 'right' }} onClick={() => setShowExpanded(true)}>
                View History
            </Button>

            <ExpandedPurchaseModal show={showExpanded} showHandler={setShowExpanded} />

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
                                    {/* Map through the 3 most recent purchases */}
                                    {purchases.slice(-3).map((purchase, index) => (
                                        <tr key={index}>
                                            <td>£{purchase.amount}</td>
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
