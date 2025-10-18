import React from 'react'
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import AddCardModal from './AddCardModal';

function CreditForm() {
    const [cards, setCards] = useState([]);
    const [showModal, setShowModal] = useState(false);
    // When lcicking Add Credit Card button, show the modal
    const addCard = () => {
        setShowModal(true);
    }

    const setShowModalhandler = (value) => {
        setShowModal(value);
    }

    return (
        <div>
            <Button onClick={addCard} className="mb-3">
                Add Credit Card
            </Button>

            {showModal ? <AddCardModal show={showModal} showHandler={setShowModalhandler} /> : null}
        </div>
    )
}

export default CreditForm;