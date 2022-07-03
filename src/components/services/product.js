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

export const getProductById = async (id) => {
    const productUrl = getApiUrl(`product/${id}`)
    const response = await axios.get(productUrl, { withCredentials: true })
    return response.data
}

export const getAllProducts = async () => {
    const productUrl = getApiUrl(`product/getAll`)
    const response = await axios.get(productUrl, { withCredentials: true });
    return response.data;
}

export const getProductsOrderByLessPrice = async () => {
    const productUrl = getApiUrl(`product/orderByPrice`)
    const response = await axios.get(productUrl, { withCredentials: true });
    return response.data;
}

export const getProductsByCategory = async (categoryName) => {
    const productUrl = getApiUrl(`product/getByCategory/${categoryName}`)
    const response = await axios.get(productUrl, { withCredentials: true });
    return response.data;

}

export const getRelatedProductsByCategory = async (props) => {
    const { category, id } = props;
    const productUrl = getApiUrl(`product/related/${category}/${id}`)
    const response = await axios.get(productUrl, { withCredentials: true })
    return response.data

}