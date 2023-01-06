import logo from '../assets/images/order.png'
import {Button, Nav} from "react-bootstrap";

function Header() {
    return (
        <Nav
            className="navbar navbar-expand-lg navbar-light bg-light"
            activeKey="/home"
        >
            <Nav.Item className="nav-item">
                <Nav.Link href="/" className="nav-link">
                        <img src={logo} width="100px" alt="logo"/>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-item">
                <Nav.Link href="/items" className="nav-link">
                        Items
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-item">
                <Nav.Link href="/customers" className="nav-link">
                        Customers
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-item">
                <Nav.Link href="/basket" className="nav-link">
                    <Button>Basket</Button>
                </Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default Header