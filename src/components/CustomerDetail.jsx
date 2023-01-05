import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {addItem, updateItem} from "../api/ItemService";

function CustomerDetail({selectedCustomer}) {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")
    const [validated, setValidated] = useState(false);
    const [editMode, setEditMode] = useState(!selectedCustomer);

    const defaultFormFields = selectedCustomer ? {
        firstname: selectedCustomer.firstname,
        lastname: selectedCustomer.lastname,
        localPart: selectedCustomer.email.localPart,
        domain: selectedCustomer.email.domain,
        complete: selectedCustomer.email.complete,
        streetName: selectedCustomer.address.streetName,
        houseNumber: selectedCustomer.address.houseNumber,
        postalCode: selectedCustomer.address.postalCode,
        country: selectedCustomer.address.country,
        number: selectedCustomer.phoneNumber.number,
        countryCallingCode: selectedCustomer.phoneNumber.countryCallingCode
    } : {
        firstname: '',
        lastname: '',
        localPart: '',
        domain: '',
        complete: '',
        streetName: '',
        houseNumber: '',
        postalCode: '',
        country: '',
        number: '',
        countryCallingCode: ''
    }

    const [formValue, setFormValue] = useState(defaultFormFields)
    useEffect(() => console.log(formValue), [formValue])
    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name)
        setFormValue(
            {
                ...formValue,
                [name]: value
            }
        )
    }

    const handleValidation = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            handleSubmit(e)
        }

        setValidated(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!selectedCustomer) {
            addItem({...formValue})
                .then(setEditMode(false))
                .then((result) => navigate(`/customers/${result.data.id}`, {replace: true}), [navigate])
                .catch((error) => setErrorMessage(error.response.data.message))
        } else {
            updateItem(selectedCustomer.id, {...formValue})
                .then(setEditMode(false))
                .then((result) => navigate(`/customers/${result.data.id}`, {replace: true}), [navigate])
                .catch((error) => setErrorMessage(error.response.data.message))
        }

    }

    const toggleToEdit = (e) => {
        e.preventDefault()
        editMode ? setEditMode(false) : setEditMode(true);
    }

    return (
        <>
            <div className="banner">
                <h1>Customer</h1>
                {selectedCustomer ? (
                    <span className="label">{selectedCustomer.id}</span>) : null}
            </div>
            <Form noValidate validated={validated} onSubmit={handleValidation}>
                <fieldset disabled={!editMode}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="firstnameInput">Firstname</Form.Label>
                                <Form.Control id="firstnameInput" name="firstname" value={formValue.firstname}
                                              onChange={handleChange}
                                              required/>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a firstname.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="lastnameInput">Firstname</Form.Label>
                                <Form.Control id="lastnameInput" name="lastname" value={formValue.lastname}
                                              onChange={handleChange}
                                              required/>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a lastname.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="complete" placeholder="Enter email"
                                      value={formValue.complete} onChange={handleChange}
                                      required/>
                        <Form.Control.Feedback type="invalid">
                            Email adress incorrect.
                        </Form.Control.Feedback>
                    </Form.Group>
                </fieldset>
                {
                    selectedCustomer && editMode ? (
                        <Button className="btn-secondary formBtn" onClick={(e) => toggleToEdit(e)}>Cancel</Button>
                    ) : <Link to="/customers">
                        <Button type="submit" className="btn-secondary formBtn">Back</Button>
                    </Link>
                }
                {
                    editMode ? (
                        <Button type="submit" className="formBtn">Confirm</Button>
                    ) : <Button className="formBtn" onClick={(e) => toggleToEdit(e)}>Edit</Button>
                }
            </Form>

        </>
    )
}

export default CustomerDetail