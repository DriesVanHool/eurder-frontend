import {useEffect, useState} from "react";
import {getItems} from "../api/ItemService";
import paceholder from '../assets/images/placeholder.png'
import {Badge, Button, Card, Col, Form, Row, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";

function ItemGallery() {
    const title = "Items";
    const [items, setItems] = useState([])
    const [filterText, setFilterText] = useState("");

    const searchItems = items.filter((item) => item.name.toLowerCase().includes(filterText))

    useEffect(updateItems, [])

    function updateItems() {
        getItems().then((result) => setItems(result.data))
    }

    function urgencyIndicator(urgency) {
        let urgencyLvl = urgency.toLowerCase().replace("stock_", "")
        let urgencyBadge;

        switch (urgencyLvl) {
            case "low":
                urgencyBadge = "danger"
                break;
            case "medium":
                urgencyBadge = "warning"
                break;
            default:
                urgencyBadge = "success"
        }

        return (
            <Badge className="label" bg={urgencyBadge}>{urgencyLvl}</Badge>
        )

    }

    return (
        <>
            <div className="banner">
                <h1>{title}</h1>
                <Form id="searchInput">
                    <Row>
                        <Col>
                            <Link to="/items/add">
                                <Button type="submit">Add item</Button>
                            </Link>
                        </Col>
                        <Col>
                            <Form.Control
                                type="search"
                                placeholder="Filter by name"
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
                searchItems.length > 0 ? (
                        <div>
                            <Row xs={1} md={3} className="g-4">
                                {searchItems.map((item) => (
                                    <Link to={`/items/${item.id}`} key={item.id}>
                                        <Col>
                                            <Card className="item">
                                                <Card.Img variant="top" src={paceholder}/>
                                                <Card.Body>
                                                    <Card.Title>{item.name}</Card.Title>
                                                    <Card.Text>
                                                        Price: {item.price}
                                                        {urgencyIndicator(item.stockUrgency)}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Link>
                                ))}
                            </Row>
                        </div>
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

export default ItemGallery