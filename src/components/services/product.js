import { getApiUrl } from "./apiConfig";
import axios from "axios";

export const createProduct = ({ product }) => {
    const productUrl = getApiUrl('product/create')
    axios.post(productUrl, product, { withCredentials: true })
        .then(response => {
            console.log(response.data.message)
        })
        .catch(error => {
            console.log(error.response.data.message);
        })
}

export const updateProduct = ({ product, id }) => {
    const productUrl = getApiUrl(`product/update/${id}`)
    axios.put(productUrl, product, { withCredentials: true })
        .then(response => {
            console.log(response.data.message)
        })
        .catch(error => {
            console.log(error.response.data.message);
        })
}

export const getProuctById = ({ productId }) => {
    const productUrl = getApiUrl(`product/${productId}`)
    axios.get(productUrl, { withCredentials: true })
        .then(response => {
            console.log(response.data.message)
        })
        .catch(error => {
            console.log(error.response.data.message);
        })
}