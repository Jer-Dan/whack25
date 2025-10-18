import React from 'react'
import { useState } from 'react'
import { Button } from 'react-bootstrap';
import AddPersonModal from './AddPersonModal';

const credit_providers = ["Experian", "Equifax", "TransUnion"];

function PersonalForm() {
    // state to manage if personal info is already added
    const [infoAdded, setInfoAdded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [personalInfo, setPersonalInfo] = useState({});

    // Get personal info from local storage on component mount
    React.useEffect(() => {
        const storedInfo = JSON.parse(localStorage.getItem("personalInfo"));
        if (storedInfo) {
            setPersonalInfo(storedInfo);
            setInfoAdded(true);
        }
    }, []);

  return (
    <div>
        {/* // Hide the button if info is already added */}
        {!infoAdded && (
            <Button variant="primary" onClick={() => setShowModal(true)}>Add Personal Information</Button>
        )}
        {showModal && <AddPersonModal show={showModal} onHide={() => {
            setShowModal(false);
            forceUpdate();
          }}
        />}

        <div className="mt-3">
            <h3>Personal Information:</h3>
            <p><strong>Name:</strong> {personalInfo.name || 'N/A'}</p>
            <p><strong>Income (Yearly):</strong> {personalInfo.income || 'N/A'}</p>
            <p><strong>Credit Score Provider:</strong> {credit_providers[personalInfo.providerNumber] || 'N/A'}</p>
            <p><strong>Credit Score:</strong> {personalInfo.creditScore || 'N/A'}</p>
        </div>
    </div>
  )
}

export default PersonalForm
