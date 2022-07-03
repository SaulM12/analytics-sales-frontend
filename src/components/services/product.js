import { getApiUrl } from "./apiConfig";
import axios from "axios";

export const createProduct = (props) => {
    const { product, setWrongProduct, setProduct, setProductFeedback } = props;
    const productUrl = getApiUrl('product/create')
    axios.post(productUrl, product, { withCredentials: true })
        .then(response => {
            setWrongProduct({ status: false, infoText: response.data.message })
            setProduct({ name: "", price: 0, description: "", category: "", image: "" })
            setProductFeedback(true)
        })
        .catch(error => {
            setWrongProduct({ status: true, infoText: error.response.data.message })
            setProductFeedback(true)
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