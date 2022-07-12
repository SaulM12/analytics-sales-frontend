import { getApiUrl } from "./apiConfig";
import axios from "axios";


export const getDetailBySaleId = async (saleId) => {
    const detailSaleUrl = getApiUrl(`saleDetail/${saleId}`)
    const response = await axios.get(detailSaleUrl, { withCredentials: true })
    console.log(response.data);
    return response.data
}

export const addToCart = (props) => {
    const { amountToAdd, productToAdd, setShowConfirm } = props
    const addToCartUrl = getApiUrl(`shoppingList`)
    const userDetailsUrl = getApiUrl('auth/userDetails')
    axios.get(userDetailsUrl, { withCredentials: true }).then(userDetails => {
        let cartObject = {
            client: userDetails.data,
            product: productToAdd,
            amount: amountToAdd
        }
        axios.post(addToCartUrl, cartObject, { withCredentials: true }).then(() => {
            setShowConfirm(true)
            let number = parseInt(localStorage.getItem("number")) + 1
            localStorage.setItem("number", number.toString())
            window.dispatchEvent(new Event('storage'))
            window.dispatchEvent(new Event('storage'))
        })
            .catch(error => {
                console.log(error.response.data.message);
            })
    })
}
export const getShoppingListCount = ({ id }) => {
    const cartListCountUrl = getApiUrl(`count/${id}`)
    axios.get(cartListCountUrl, { withCredentials: true }).then((response) => {
        localStorage.setItem("number", response.data.toString())
    })
}
export const getShoppingList = ({ setProductList, setUserData }) => {
    const userDetailsUrl = getApiUrl('auth/userDetails')
    axios.get(userDetailsUrl, { withCredentials: true }).then(userDetails => {
        const getListUrl = getApiUrl(`shoppingList/${userDetails.data.id}`)
        setUserData({ name: userDetails.data.userName, email: userDetails.data.email })
        axios.get(getListUrl, { withCredentials: true }).then(response => {
            setProductList(response.data)
        })
            .catch(error => {
                console.log(error.response.data.message);
            })
    })
}
export const deleteShoppingItem = ({ itemId }) => {
    const deleteItemUrl = getApiUrl(`shoppingList/${itemId}`)
    return axios.delete(deleteItemUrl, { withCredentials: true })
}