import {useEffect, useState} from "react";
import getCustomers from "../api/CustomerService";
import {Button, Col, Form, Row, Spinner, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

function CustomerTable() {
    const [customers, setCustomers] = useState([])
    const [filterText, setFilterText] = useState("")
    const title = "Customers"

    useEffect(updateCustomers, [])

    function updateCustomers() {
        getCustomers().then((result) => setCustomers(result.data))
    }

    const searchCustomers = customers.filter((customer) => customer.lastname.toLowerCase().startsWith(filterText))

    return (
        <>
            <div className="banner">
                <h1>{title}</h1>
                <Form id="searchInput">
                    <Row>
                        <Col>
                            <Link to="/customers/add">
                                <Button type="submit">Add customer</Button>
                            </Link>
                        </Col>
                        <Col>
                            <Form.Control
                                type="search"
                                placeholder="Filter by lastname"
                                className="me-2"
                                aria-label="Search"
                                value={filterText}
                                onChange={(e) => {
                                    setFilterText(e.target.value)
                                }}
                            />
                        </Col>
                    </Row>
                </Form>
            </div>
            {
                searchCustomers.length > 0 ? (
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {searchCustomers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.firstname}</td>
                                    <td>{customer.lastname}</td>
                                    <td className="bntColumn">
                                        <Link to={`/customers/${customer.id}`}>
                                            <Button variant="secondary" size="sm">View</Button>
                                        </Link>
                                        <Link to={`/customers/${customer.id}`}  state={{ editMode: true }}>
                                            <Button variant="info" size="sm">Edit</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>

                    ) :
                    <div className="loader d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
            }
        </>
    )
}

export default CustomerTable