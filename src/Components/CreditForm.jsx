import React from 'react'
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import AddCardModal from './AddCardModal';
import { Accordion } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useEffect } from 'react';

function CreditForm() {
    const [cards, setCards] = useState([]);
    const [showModal, setShowModal] = useState(false);
    // When clicking Add Credit Card button, show the modal
    const addCard = () => {
        setShowModal(true);
    }

    const setShowModalhandler = (value) => {
        setShowModal(value);
    }

    const handleCardAdding = (card) => {
        setCards(prev => {
            const updated = [...prev, card];
            localStorage.setItem("cards", JSON.stringify(updated));
            console.log('saved cards', updated);
            return updated;
        });
    }

    const handleCardDeleting = (name) => {
        setCards(prev => {
            const updated = prev.filter(card => card.name !== name);
            localStorage.setItem("cards", JSON.stringify(updated));
            return updated;
        });
    }

    const handleCardEditing = (name, updatedCard) => {
        setCards(prev => {
            const updated = prev.map(card => card.name === name ? updatedCard : card);
            localStorage.setItem("cards", JSON.stringify(updated));
            return updated;
        });
    }

    // read from local storage on component mount
    useEffect(() => {
        const storedCards = JSON.parse(localStorage.getItem("cards"));
        if (storedCards) {
            setCards(storedCards);
        }
    }, []);

    return (
        <div id="CreditFormSpotlight">
            <Button onClick={addCard} className="mb-3">
                Add Credit Card
            </Button>

            <Accordion>
                {cards.map((card, index) => (
                    <Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header>{card.name} - {card.company}</Accordion.Header>
                        <Accordion.Body>
                            <Card style={{ width: '18rem', overflowY: 'scroll' }}>
                                <Card.Body>
                                    <Card.Title>{card.name}</Card.Title>
                                    <Card.Text>
                                        Company: {card.company} <br />
                                        Max Credit: £{card.maxCredit} <br />
                                        Current Balance: £{card.currentBalance} <br />
                                        Statement Balance Day: {card.statementBalanceDay} <br />
                                        Due Date: {card.dueDate} <br />
                                        Minimum Fee Payment: £{card.minFeePayment} <br />
                                    </Card.Text>
                                    {/* <Button variant="primary">Edit</Button> */}
                                    <Button variant="primary" onClick={() => handleCardDeleting(card.name)}>Delete</Button>
                                </Card.Body>
                            </Card>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>

            {showModal ? <AddCardModal cardAddingHandler={handleCardAdding} show={showModal} showHandler={setShowModalhandler} /> : null}
        </div>
    )
}

export default CreditForm;
