import { getApiUrl } from "./apiConfig";
import axios from "axios";

export const generateSale = ({ id, product }) => {
    const detailUrl = getApiUrl(`saleDetail/${id}`)
    axios.post(detailUrl, product, { withCredentials: true })
        .then(response => {
            console.log(response.data.message)
        })
        .catch(error => {
            console.log(error.response.data.message);
        })
}
export const addToCart=(props)=>{
    const{amountToAdd, productToAdd, setShowConfirm} = props
    const addToCartUrl = getApiUrl(`shoppingList`)
    const userDetailsUrl = getApiUrl('auth/userDetails')
    axios.get(userDetailsUrl, { withCredentials: true }).then(userDetails => {
        let cartObject={
            client:userDetails.data,
            product:productToAdd,
            amount:amountToAdd
        }
        axios.post(addToCartUrl,cartObject,{withCredentials: true}).then(() => {
            setShowConfirm(true)
            let number= parseInt(localStorage.getItem("number"))+1
            localStorage.setItem("number",number.toString())
            window.dispatchEvent( new Event('storage') )
            window.dispatchEvent( new Event('storage') )
        })
        .catch(error => {
            console.log(error.response.data.message);
        })
    })
}
export const getShoppingListCount=({ id })=>{
    const cartListCountUrl = getApiUrl(`count/${id}`)
    axios.get(cartListCountUrl,{withCredentials:true}).then((response)=>{
        localStorage.setItem("number",response.data.toString())
    })
}
export const getShoppingList=({setProductList,setUserName,setUserMail})=>{
    const userDetailsUrl = getApiUrl('auth/userDetails')
    axios.get(userDetailsUrl, { withCredentials: true }).then(userDetails => {
        const getListUrl = getApiUrl(`shoppingList/${userDetails.data.id}`)
        setUserName(userDetails.data.userName)
        setUserMail(userDetails.data.email)
        axios.get(getListUrl,{withCredentials: true}).then(response => {
            setProductList(response.data)
        })
        .catch(error => {
            console.log(error.response.data.message);
        })
    })
}
export const deleteShoppingItem=({itemId})=>{
    const deleteItemUrl = getApiUrl(`shoppingList/${itemId}`)
    return axios.delete(deleteItemUrl, { withCredentials: true })
}