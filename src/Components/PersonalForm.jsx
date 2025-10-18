import React from 'react'
import { useState } from 'react'
import { Button } from 'react-bootstrap';
import AddPersonModal from './AddPersonModal';

function PersonalForm() {
    const [showModal, setShowModal] = useState(false);
    const [personalInfo, setPersonalInfo] = useState({});

    // Get personal info from local storage on component mount
    React.useEffect(() => {
        const storedInfo = JSON.parse(localStorage.getItem("personalInfo"));
        if (storedInfo) {
            setPersonalInfo(storedInfo);
        }
    }, []);

  return (
    <div>
        <Button variant="primary" onClick={() => setShowModal(true)}>Add Personal Information</Button>
        {showModal && <AddPersonModal show={showModal} onHide={() => setShowModal(false)} />}

        <div className="mt-3">
            <h3>Personal Information:</h3>
            <p><strong>Name:</strong> {personalInfo.name || 'N/A'}</p>
            <p><strong>Income (Yearly):</strong> {personalInfo.income || 'N/A'}</p>
            <p><strong>Credit Score Provider:</strong> {personalInfo.creditScoreProvider || 'N/A'}</p>
            <p><strong>Credit Score:</strong> {personalInfo.creditScore || 'N/A'}</p>
        </div>
    </div>
  )
}

export default PersonalForm