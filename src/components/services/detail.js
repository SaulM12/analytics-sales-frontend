import { getApiUrl } from "./apiConfig";
import axios from "axios";

export const generateSale = ({ id }) => {
    const detailUrl = getApiUrl(`saleDetail/${id}`)
    axios.post(saleUrl, product, { withCredentials: true })
        .then(response => {
            console.log(response.data.message)
        })
        .catch(error => {
            console.log(error.response.data.message);
        })
}