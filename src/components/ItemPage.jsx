import ItemDetail from "./ItemDetail";
import ItemGallery from "./ItemGallery";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getItem} from "../api/ItemService";

function ItemPage() {
    const { id, add } = useParams()
    const [selectedItem, setItem] = useState(null)
    useEffect(updateItem, [id])

    function updateItem() {
        setItem(null)
        if(id){
            getItem(id).then((result) => setItem(result.data))
        }
    }
    return (
        <>
            {selectedItem || add ? (
                <ItemDetail selectedItem={selectedItem}/>
            ): (
            <ItemGallery/>
            )}
        </>
    )
}

export default ItemPage