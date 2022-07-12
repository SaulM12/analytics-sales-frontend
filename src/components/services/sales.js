import { getApiUrl } from "./apiConfig";
import axios from "axios";

export const generateSale = (userMail) => {
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

export const getSalesByClient = async () => {
    const saleUrl = getApiUrl(`sales/client`)
    const response = await axios.get(saleUrl, { withCredentials: true })
    return response.data
}

export const getTotalSalesByCategory = async () => {
    const saleUrl = getApiUrl(`sales/totalByCategory`)
    const response = await axios.get(saleUrl, { withCredentials: true })
    return response.data
}

export const getTotalSalesByMonth = async () => {
    const saleUrl = getApiUrl(`sales/totalByMonth`)
    const response = await axios.get(saleUrl, { withCredentials: true })
    console.log(response.data);
    return response.data
}

export const getMostSoldProducts = async () => {
    const saleUrl = getApiUrl(`sales/mostSoldProducts`)
    const response = await axios.get(saleUrl, { withCredentials: true })
    return response.data
}

export const getLeastSoldProducts = async () => {
    const saleUrl = getApiUrl(`sales/leastSoldProducts`)
    const response = await axios.get(saleUrl, { withCredentials: true })
    return response.data
}

export const getTotalSalesByMonthAndCategory = async () => {
    const saleUrl = getApiUrl(`sales/totalByMonthAndCategory`)
    const response = await axios.get(saleUrl, { withCredentials: true })
    return response.data
}