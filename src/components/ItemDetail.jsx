import {useState} from "react";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {addItem, updateItem} from "../api/ItemService";
import {addToBasket} from "../services/BasketService";

function ItemDetail({selectedItem}) {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")
    const [addMessage, setAddMessage] = useState("")
    const [validated, setValidated] = useState(false);
    const [descriptionCount, setDescriptionCount] = useState(selectedItem ? selectedItem.description.length : 0);
    const [editMode, setEditMode] = useState(!selectedItem);
    const maxCount = 255;

    const defaultFormFields = selectedItem ? {
        name: selectedItem.name,
        description: selectedItem.description,
        price: selectedItem.price,
        amountOfStock: selectedItem.amountOfStock,
    } : {
        name: '',
        description: '',
        price: '',
        amountOfStock: ''
    }

    const [formValue, setFormValue] = useState(defaultFormFields)

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === "description") {
            setDescriptionCount(value.length)
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
        if (!selectedItem) {
            addItem({...formValue})
                .then(setEditMode(false))
                .then((result) => navigate(`/items/${result.data.id}`, {replace: true}), [navigate])
                .catch((error) => setErrorMessage(error.response.data.message))
        } else {
            updateItem(selectedItem.id, {...formValue})
                .then(setEditMode(false))
                .then((result) => navigate(`/items/${result.data.id}`, {replace: true}), [navigate])
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
                <h1>Item</h1>
                {selectedItem ? (
                    <span className="label">{selectedItem.id}</span>) : null}
            </div>
            {
                addMessage.length > 0 ? (
                    <Alert variant={addMessage==="Item added"? "success":"danger"} onClose={() => setAddMessage("")} dismissible>
                        <p>{addMessage}</p>
                    </Alert>
                ) : null
            }
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
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="nameInput">Name</Form.Label>
                        <Form.Control id="nameInput" name="name" value={formValue.name} onChange={handleChange}
                                      required/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="descriptionInput">Description</Form.Label>
                        <Form.Control id="descriptionInput" as="textarea" name="description" maxLength={maxCount}
                                      rows={5}
                                      value={formValue.description}
                                      onChange={handleChange} required/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a description.
                        </Form.Control.Feedback>
                        <p className="label">{descriptionCount}/{maxCount}</p>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Row className="formHalfRow">
                            <Col>
                                <Form.Label htmlFor="priceInput">Price</Form.Label>
                                <Form.Control type="number" id="priceInput" name="price" value={formValue.price}
                                              onChange={handleChange}
                                              required min="0"/>
                                <Form.Control.Feedback type="invalid">
                                    Price is invalid.
                                </Form.Control.Feedback>
                            </Col>
                            <Col>
                                <Form.Label htmlFor="stockAmount">Amount of stock</Form.Label>
                                <Form.Control type="number" id="stockAmount" name="amountOfStock"
                                              value={formValue.amountOfStock}
                                              onChange={handleChange}
                                              required min="0"/>
                                <Form.Control.Feedback type="invalid">
                                    Amount is invalid.
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                    </Form.Group>
                </fieldset>
                {
                    selectedItem && editMode ? (
                        <Button className="btn-secondary formBtn" onClick={(e) => toggleToEdit(e)}>Cancel</Button>
                    ) : <Link to="/items">
                        <Button type="submit" className="btn-secondary formBtn">Back</Button>
                    </Link>
                }
                {
                    editMode ? (
                        <Button type="submit" className="formBtn">Confirm</Button>
                    ) : <>
                        <Button className="formBtn" onClick={(e) => toggleToEdit(e)}>Edit</Button>
                        <Button className="btn-success formBtn addBtn" onClick={()=>setAddMessage(addToBasket(selectedItem))}>Add to basket</Button>
                    </>
                }
            </Form>
        </>
    )
}

export default ItemDetail