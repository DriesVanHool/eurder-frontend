export function addToBasket(selectedItem) {
    const basketItems = JSON.parse(sessionStorage.getItem("basketItems"));
    const item = {
        'id': selectedItem.id,
        'name': selectedItem.name,
        'amount': 1,
        'price': selectedItem.price
    }
    let inBasket =false

    if (basketItems === null) {
        sessionStorage.setItem("basketItems", JSON.stringify([item]));
        return "Item added";
    } else {
        basketItems.forEach(e=>{
            e.id===selectedItem.id ? inBasket=true : inBasket=false;
        })

        if (!inBasket){
            sessionStorage.setItem("basketItems", JSON.stringify([...basketItems, item]));
            return "Item added";
        }else{
            return "Item allready in basket";
        }
    }
}

export function getBasketItems(){
    const basketItems = JSON.parse(sessionStorage.getItem("basketItems"));
    if (basketItems === null) {
        return []
    } else {
        return basketItems
    }
}

export function updateItemsBasket(items){
    sessionStorage.setItem("basketItems", JSON.stringify(items));
}

export function resetItemBasket(){
    sessionStorage.setItem("basketItems", []);
}