import {useEffect, useState} from "react";
import {getBasketItems, resetItemBasket, updateItemsBasket} from "../services/BasketService";
import {Alert, Button, Form, Table, Modal} from "react-bootstrap";
import placeOrder from "../api/OrderService";
import {Link} from "react-router-dom";
import getCustomers from "../api/CustomerService";

function Basket(){
    const title = "Basket";
    const [items, setItems] = useState(getBasketItems)
    const [validated, setValidated] = useState(false)
    const [orderPlaced, setOrderPlaced] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [customerId, setCustomerId] = useState("")

    useEffect(updateItems, [])

    function updateItems(){
        setItems(getBasketItems)
        getUserId()
    }

    //Om random id op te vangen
    function getUserId(){
        getCustomers().then(result=> setCustomerId(result.data[0].id))
    }

    const handleChange = (item, e) => {
        item.amount = e.target.value
        updateItemsBasket(items)
        updateItems()
    }

    const removeItem = (item) => {
        const index = items.indexOf(item);
        if (index > -1) {
            items.splice(index, 1);
        }
        updateItemsBasket(items)
        updateItems()
    }

    function makeOrderList(list){
        const orderList = []
        list.forEach(e=>{
            orderList.push({
                itemId: e.id,
                orderedAmount: e.amount
            })
        })
        return orderList
    }

    const handleValidation = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();
            placeOrder({
                customerId: customerId,
                itemGroups: makeOrderList(items)
            }).then((result)=> setOrderPlaced(true)).catch((error) => {
                setErrorMessage(error.response.data.message)
                setOrderPlaced(false)
            })
        }
        setValidated(true);
    };

    function calculateTotalPrice(){
        let total = 0;
        items.forEach(e=>{
            total+=e.amount*e.price
        })
        return total.toFixed(2)
    }

    return(
        <>
            <div className="banner">
                <h1>{title}</h1>
            </div>
            {
                errorMessage.length > 0 ? (
                    <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
                        <Alert.Heading>Incorrect input</Alert.Heading>
                        <p>{errorMessage}</p>
                    </Alert>
                ) : null
            }
            {
                items.length > 0 ? (
                    <Form noValidate validated={validated} onSubmit={handleValidation}>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Product</th>
                                <th width='20%'>Amount</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>
                                        <Form.Control id={item.id} type="number" name="amount" value={item.amount}
                                                      onChange={(e) => handleChange(item, e)}
                                                      required min="0"/>
                                        <Form.Control.Feedback type="invalid">
                                            amount is invalid.
                                        </Form.Control.Feedback>
                                    </td>
                                    <td>{item.price}</td>
                                    <td className="bntColumn">
                                            <Button size="sm" onClick={()=>removeItem(item)}>X</Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        <Button type="submit" className="formBtn">Place order</Button>
                        <label className="label" >Total: {calculateTotalPrice()}</label>
                    </Form>
                    ) :
                    <Alert variant="danger">
                        <p>No items in basket</p>
                    </Alert>
            }
            {
                orderPlaced && errorMessage===""? (
                    <div
                        className="modal show"
                        style={{ display: 'block', position: 'initial' }}
                    >
                        <Modal.Dialog>
                            <Modal.Header>
                                <Modal.Title>Order placed</Modal.Title>
                            </Modal.Header>

                            <Modal.Body className="modalOrder">
                                <p>Your order has been succcessfully placed.</p>
                                <p>Thank you</p>
                            </Modal.Body>
                            <Modal.Footer className="modalOrder">
                                <Link to="/items" onClick={()=>resetItemBasket()}>
                                    <Button variant="secondary">Close</Button>
                                </Link>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                ):null
            }
        </>
    )
}

export default Basket