import { getApiUrl } from "./apiConfig";
import axios from "axios";

export const generateSale = ({ product }) => {
    const saleUrl = getApiUrl('sales/create')
    axios.post(saleUrl, product, { withCredentials: true })
        .then(response => {
            console.log(response.data.message)
        })
        .catch(error => {
            console.log(error.response.data.message);
        })
}

export const getAllSales = async () => {
    try {
        const saleUrl = getApiUrl('sales/getAll')
        const response = await axios.get(saleUrl, { withCredentials: true });
        return response.data
    } catch (error) {
        console.log(error.response.data.message);
    }

}

export const getSalesByClientId = async (clientId) => {
    try {
        const saleUrl = getApiUrl(`sales/client/${clientId}`)
        const response = await axios.get(saleUrl, { withCredentials: true })
        return response.data
    } catch (error) {
        console.log(error.response.data.message);
    }
}