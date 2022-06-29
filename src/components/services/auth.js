import { getApiUrl } from "./apiConfig";
import axios from 'axios';

export const submitLogin = (props) => {
    const { loginData, setWrongCredentials, navigate } = props
    const loginUrl = getApiUrl('auth/login')
    axios.post(loginUrl, loginData, { withCredentials: true })
        .then(response => {
            console.log(response.data.message)
            navigate('/store', { replace: true })
        })
        .catch(error => {
            setWrongCredentials({ wrongData: true, infoText: error.response.data.message })
        })

}

export const submitRegister = (props) => {
    const { registerData, setWrongData } = props;
    const registerUrl = getApiUrl('auth/register')
    axios.post(registerUrl, registerData).then(response => {
        setWrongData({ status: false, infoText: response.data.message })
    }).catch(error => {
        setWrongData({ status: true, infoText: error.response.data.message })
    })
}