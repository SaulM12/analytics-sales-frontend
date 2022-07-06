import { getApiUrl } from "./apiConfig";
import axios from "axios";

export const generateSale = ({userMail}) => {
    const saleUrl = getApiUrl(`sales/create/${userMail}`)
    return axios.post(saleUrl, { withCredentials: true })
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