import client from "./Client";

export async function getItems() {
    return await client.get("items")
}

export async function getItem(id) {
    return await client.get(`items/${id}`)
}

export async function addItem(item) {
    return await client.post('items', item)
}

export async function updateItem(id, item) {
    return await client.put(`items/${id}`, item)
}