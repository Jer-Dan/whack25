import React from 'react'
import { Modal, Button } from 'react-bootstrap';

const credit_providers = ["Experian", "Equifax", "TransUnion"];

function AddPersonModal({ show, onHide }) {
    // Get personal information from local storage if available
    const storedPersonalInfo = JSON.parse(localStorage.getItem("personalInfo")) || {};
    const handleClose = () => {
        // Save personal information to local storage
        const name = document.getElementById("name").value;
        const income = document.getElementById("income").value;
        const creditScoreProvider = document.getElementById("creditScoreProvider").value;
        const creditScore = document.getElementById("creditScore").value;

        const providerNumber = credit_providers.indexOf(creditScoreProvider);

        const personalInfo = {
            name,
            income,
            providerNumber,
            creditScore
        };

        localStorage.setItem("personalInfo", JSON.stringify(personalInfo));
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Personal Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Enter your personal information here.</p>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="income" className="form-label">Income (Yearly)</label>
            <input type="number" className="form-control" id="income" />
          </div>
          {/*drop down for credit score providers*/}
            <div className="mb-3">
              <label htmlFor="creditScoreProvider" className="form-label">Credit Score Provider</label>
              <select className="form-select" id="creditScoreProvider">
                <option value="">Select a provider</option>
                <option value="Experian">Experian</option>
                <option value="TransUnion">TransUnion</option>
                <option value="Equifax">Equifax</option>
              </select>

              {/* {credit score} */}
              <div className="mb-3">
                <label htmlFor="creditScore" className="form-label">Credit Score</label>
                <input type="number" className="form-control" id="creditScore" />
              </div>
            </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddPersonModal
