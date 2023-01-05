import client from "./Client";

export default async function getCustomers(){
    return await client.get('customers')
}

export async function getCustomer(id){
    return await client.get(`customers/${id}`);
}