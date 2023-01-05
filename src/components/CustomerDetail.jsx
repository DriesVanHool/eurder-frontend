import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import {Country} from "../models/Country";
import {setCustomerData} from "../models/CustomerComplete";
import {addCustomer, updateCustomer} from "../api/CustomerService";

function CustomerDetail({selectedCustomer}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [errorMessage, setErrorMessage] = useState("");
    const [validated, setValidated] = useState(false);
    const [editMode, setEditMode] = useState(!selectedCustomer || location.state?.editMode);

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
    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === "complete") {
            formValue.domain = value.substring(value.indexOf('@') + 1)
            formValue.localPart = value.substring(0, value.indexOf('@'))
        }
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
        const customer = setCustomerData({...formValue})
        if (!selectedCustomer) {
            addCustomer(customer)
                .then(setEditMode(false))
                .then((result) => navigate(`/customers/${result.data.id}`, {replace: true}), [navigate])
                .catch((error) => setErrorMessage(error.response.data.message))
        } else {
            updateCustomer(selectedCustomer.id, customer)
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
            {
                errorMessage.length > 0 ? (
                    <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
                        <Alert.Heading>Incorrect input</Alert.Heading>
                        <p>{errorMessage}</p>
                    </Alert>
                ) : null
            }
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
                        <Form.Control type="email" name="complete"
                                      value={formValue.complete} onChange={handleChange}
                                      required/>
                        <Form.Control.Feedback type="invalid">
                            Email adress incorrect.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                        <Col className="col-2">
                            <Form.Group className="mb-3">
                                <Form.Label>Phonenumber</Form.Label>
                                <Form.Control name="countryCallingCode" value={formValue.countryCallingCode}
                                              onChange={handleChange}
                                              required/>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a countrycode.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>&nbsp;</Form.Label>
                                <Form.Control name="number" value={formValue.number}
                                              onChange={handleChange}
                                              required/>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a number.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Street</Form.Label>
                                <Form.Control name="streetName" value={formValue.streetName}
                                              onChange={handleChange}
                                              required/>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a street.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col className="col-2">
                            <Form.Group className="mb-3">
                                <Form.Label>Number</Form.Label>
                                <Form.Control name="houseNumber" value={formValue.houseNumber}
                                              onChange={handleChange}
                                              required/>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a housenumber.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="col-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Postalcode</Form.Label>
                                <Form.Control name="postalCode" value={formValue.postalCode}
                                              onChange={handleChange}
                                              required/>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a postalcode.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Country</Form.Label>
                                <Form.Select name="country" onChange={handleChange}
                                             value={formValue.country} required>
                                    <option value="">-</option>
                                    {
                                        Object.values(Country).map((country) => (
                                            <option key={country.key}
                                                    value={country}>{country}</option>
                                        ))
                                    }
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a country.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
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