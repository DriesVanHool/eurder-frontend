import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import CustomerDetail from "./CustomerDetail";
import CustomerTable from "./CustomerTable";
import {getCustomer} from "../api/CustomerService";

function CustomerPage() {
    const { id, add } = useParams()
    const [selectedCustomer, setCustomer] = useState(null)
    useEffect(updateCustomer, [id])

    function updateCustomer() {
        setCustomer(null)
        if(id){
            getCustomer(id).then((result) => setCustomer(result.data))
        }
    }
    return (
        <>
            {selectedCustomer || add ? (
                <CustomerDetail selectedCustomer={selectedCustomer}/>
            ): (
                <CustomerTable/>
            )}
        </>
    )
}

export default CustomerPage