import { getApiUrl } from "./apiConfig";
import axios from "axios";

export const createProduct = ({product}) => {
    const productUrl = getApiUrl('product/create')
    return axios.post(productUrl, product, { withCredentials: true })
        
}

export const updateProduct = (props) => {
    const { product, productId } = props;
    const productUrl = getApiUrl(`product/update/${productId}`)
    return axios.put(productUrl, product, { withCredentials: true })
        
}

export const getProductById = async (id) => {
    const productUrl = getApiUrl(`product/${id}`)
    const response = await axios.get(productUrl, { withCredentials: true })
    return response.data
}

export const getAllProducts = ({ setProductList }) => {
    const productUrl = getApiUrl(`product/getAll`)
    axios.get(productUrl, { withCredentials: true }).then(response => {
        setProductList(response.data)
    }).catch(() => {
        console.log("err");
    })
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

export const uploadCsvFile = async (file) => {
    try {
        const productUrl = getApiUrl(`product/uploadCsv`)
        const response = await axios.post(productUrl, file, { withCredentials: true })
        return response
    } catch (error) {
        return error.response
    }
}