import client from "./Client";

export default async function placeOrder(order){
    return await client.post('orders', order)
}