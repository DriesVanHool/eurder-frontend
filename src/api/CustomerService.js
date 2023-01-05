import client from "./Client";

export default async function getCustomers(){
    return await client.get('customers')
}

export async function getCustomer(id){
    return await client.get(`customers/${id}`);
}

export async function addCustomer(customer) {
    return await client.post('customers', customer)
}

export async function updateCustomer(id, customer) {
    return await client.put(`customers/${id}`, customer)
}