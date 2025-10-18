import React from 'react'
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap';   
import Table from 'react-bootstrap/Table';

function AddCardModal({ show, showHandler }) {
    const onSubmit = () => {
        // set show to false
        showHandler(false);
    }

    return (
        <Modal show={show} onHide={() => showHandler(false)}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Card</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Enter the details of the new card.</p>
                    <h2>Credit Form</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="amount">Card Name</label>
                            <input type="text" id="amount" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Card Company</label>
                            <input type="text" id="description" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Max Credit</label>
                            <input type="number" id="amount" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Current Balance</label>
                            <input type="number" id="amount" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Interest (optional)</label>
                            <input type="number" id="amount" className="form-control" />
                        </div>
                        <div className="form-group">
                            {/* 31 days scroller */}
                            <label htmlFor="statementBalanceDay">Statement Balance Day</label>
                            <input type="number" id="statementBalanceDay" className="form-control" />

                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Due Date</label>
                            <input type="number" id="amount" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Minimum Fee Payment (note)</label>
                            <input type="number" id="amount" className="form-control" />
                        </div>
                        <button type="submit" onClick={() => onSubmit(false)} className="btn btn-primary">Submit</button>
                    </form>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td colSpan={2}>Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    )
}

export default AddCardModal