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