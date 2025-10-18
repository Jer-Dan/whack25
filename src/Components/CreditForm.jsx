import React from 'react'
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import AddCardModal from './AddCardModal';
import { Accordion } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function CreditForm() {
    const [cards, setCards] = useState([]);
    const [showModal, setShowModal] = useState(false);
    // When lcicking Add Credit Card button, show the modal
    const addCard = () => {
        setShowModal(true);
    }

    // save to local storage
    const saveToLocalStorage = () => {
        localStorage.setItem("cards", JSON.stringify(cards));
    }

    const setShowModalhandler = (value) => {
        setShowModal(value);
    }

    const handleCardAdding = (card) => {
        setCards([...cards, card]);
        saveToLocalStorage();
        console.log(cards);
    }

    // read from local storage on component mount
    React.useEffect(() => {
        const storedCards = JSON.parse(localStorage.getItem("cards"));
        if (storedCards) {
            setCards(storedCards);
        }
    }, []);

    return (
        <div>
            <Button onClick={addCard} className="mb-3">
                Add Credit Card
            </Button>

            <Accordion>
                {cards.map((card, index) => (
                    <Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header>{card.name} - {card.company}</Accordion.Header>
                        <Accordion.Body>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>{card.name}</Card.Title>
                                    <Card.Text>
                                        Company: {card.company} <br />
                                        Max Credit: {card.maxCredit} <br />
                                        Current Balance: {card.currentBalance} <br />
                                        Statement Balance Day: {card.statementBalanceDay} <br />
                                        Due Date: {card.dueDate} <br />
                                        Minimum Fee Payment: {card.minFeePayment} <br />
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
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