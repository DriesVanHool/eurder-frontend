import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import ItemPage from "./components/ItemPage";
import ItemDetail from "./components/ItemDetail";
import CustomerPage from "./components/CustomerPage";
import CustomerDetail from "./components/CustomerDetail";
import Basket from "./components/Basket";

function App() {
    return (
        <>
            <Header/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <BrowserRouter>
                            <Routes>
                                <Route exact path="/" element={<Home/>}/>
                                <Route exact path="/items/:id?" element={<ItemPage/>}/>
                                <Route exact path="/items/add" element={<ItemDetail/>}/>
                                <Route exact path="/customers/:id?" element={<CustomerPage/>}/>
                                <Route exact path="/customers/add" element={<CustomerDetail/>}/>
                                <Route exact path="/basket" element={<Basket/>}/>
                                <Route path="*" element={<Navigate to="/"/>}/>
                            </Routes>
                        </BrowserRouter>
                    </div>
                </div>
            </div>
            <Outlet/>
        </>
    );
}

export default App;
